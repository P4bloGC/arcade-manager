package com.arcade.manager.services;

import com.arcade.manager.mappers.SystemMapper;
import com.arcade.manager.models.System;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Log4j
public class FileService {
    private final String socketDestination = "/topic/logs";
    private final String absolutePath = Paths.get("").toAbsolutePath().getParent().toString();
    private final SimpMessagingTemplate template;
    private final SystemMapper systemMapper;

    @Autowired
    public FileService(SimpMessagingTemplate template, SystemMapper systemMapper) {
        this.template = template;
        this.systemMapper = systemMapper;
    }

    public String readTxtFile(Integer idSystem) throws IOException {
        try{
            System system = systemMapper.getSystemById(idSystem);
            return new String(Files.readAllBytes(Paths.get(system.getCfgPath())));
        }catch(Exception e){
            log.error("Error al leer el archivo txt: " + e.getMessage());
            throw  e;
        }
    }

    public void uploadFile(MultipartFile file, Integer idSystem, String romName, String type) throws IOException {
        try {
            String uploadDir = this.getUploadDir(type, idSystem);
            String fileName;

            // Verificar si romName es vacío o nulo
            if (romName == null || romName.isEmpty()) {
                fileName = file.getOriginalFilename(); // Usar el nombre original del archivo
            } else {
                fileName = this.renameFile(romName, type); // Usar el nombre renombrado
            }

            Path uploadPath = Paths.get(absolutePath + uploadDir);

            // Verificar si el directorio existe, si no, crearlo
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
                log.info("Directorio creado: " + uploadPath.toString());
            }

            Path filePath = uploadPath.resolve(fileName);
            file.transferTo(filePath.toFile());
            log.info("Archivo subido exitosamente en: " + filePath.toString());
        } catch (NoSuchFileException e) {
            log.error("La ruta especificada no existe: " + e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Error al subir el archivo: " + e.getMessage());
            throw e;
        }
    }

    public String getUploadDir(String type, Integer idSystem){
        System system = systemMapper.getSystemById(idSystem);
        String uploadDir = null;

        switch (type) {
            case "video":
                uploadDir = system.getVideoPath();
                break;
            case "rom":
                uploadDir = system.getRomPath();
                break;
            case "logo":
                uploadDir = system.getLogoPath();
                break;
            default:
                break;
        }
        return uploadDir;
    }

    public String renameFile(String fileName, String type){
        String newFilename = this.removeFileExtension(fileName);

        switch (type){
            case "logo":
                newFilename = newFilename + ".png";
                break;
            case "video":
                newFilename = newFilename + ".mp4";
                break;
            case "roms":
                newFilename = fileName;
                break;
            default:
                break;
        }
        return newFilename;
    }

    public void deleteFilesInDirectory(String dir) throws IOException {
        Path directoryPath = Paths.get(dir);
        if (!Files.exists(directoryPath) || !Files.isDirectory(directoryPath)) {
            String message = "El directorio no existe o no es un directorio: " + dir;
            log.debug(message);
            this.template.convertAndSend(socketDestination, message);
            return;
        }
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(directoryPath)) {
            for (Path entry : stream) {
                deleteFileIfRegular(entry);
            }
        } catch (Exception e) {
            String message = "Error al leer el directorio: " + dir;
            log.error(message, e);
            this.template.convertAndSend(socketDestination, message);
            throw e;
        }
    }

    public void deleteFileIfRegular(Path entry) throws IOException {
        try {
            if (Files.isRegularFile(entry)) {
                String message = "Eliminando archivo temporal: " + entry;
                log.info(message);
                this.template.convertAndSend(socketDestination, message);
                Files.delete(entry);
            }
        } catch (Exception e) {
            String message = "No se pudo eliminar el archivo: " + entry.toAbsolutePath();
            log.debug(message, e);
            this.template.convertAndSend(socketDestination, message);
            throw e;
        }
    }

    public void moveFiles(String source, String target) throws IOException {
        Path sourceDir = Paths.get(source);
        Path targetDir = Paths.get(Paths.get("").toAbsolutePath().getParent().toString() + target);

        // Crear el directorio de destino si no existe
        if (!Files.exists(targetDir)) {
            Files.createDirectories(targetDir);
        }

        try (DirectoryStream<Path> stream = Files.newDirectoryStream(sourceDir)) {
            for (Path file: stream) {
                Path targetFile = targetDir.resolve(file.getFileName());
                Files.move(file, targetFile, StandardCopyOption.REPLACE_EXISTING);
                String message = "Moviendo archivo a " + targetFile;
                log.info(message);
                this.template.convertAndSend(socketDestination, message);
            }
        } catch (Exception e) {
            String message = "Error al mover archivo: " + e.getMessage();
            log.error(message, e);
            this.template.convertAndSend(socketDestination, message);
            throw e;
        }
    }

    public List<String> getFileListInDirectory(String dir) {
        List<String> fileList;
        try (Stream<Path> paths = Files.walk(Paths.get(absolutePath + dir))) {
            fileList = paths.filter(Files::isRegularFile)
                    .filter(path -> !path.toString().toLowerCase().endsWith(".xml")) // Ignorar archivos XML
                    .map(Path::toString)
                    .sorted() // Ordenar alfabéticamente
                    .collect(Collectors.toList());
        } catch (IOException e) {
            e.printStackTrace();
            fileList = List.of();
        }
        return fileList;
    }


    public String removeFileExtension(String fileName) {
        int lastIndexOfDot = fileName.lastIndexOf('.');
        if (lastIndexOfDot == -1) {
            return fileName; // No hay extensión
        }
        return fileName.substring(0, lastIndexOfDot);
    }

    public ResponseEntity<Resource> serveFile(String path) {
        try {
            Path filePath = Paths.get(path);
            File file = filePath.toFile();
            if (!file.exists()) {
                return ResponseEntity.notFound().build();
            }
            Resource resource = new FileSystemResource(file);
            HttpHeaders headers = new HttpHeaders();
            String mimeType = getMimeType(filePath);
            headers.add(HttpHeaders.CONTENT_TYPE, mimeType);
            return new ResponseEntity<>(resource, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private String getMimeType(Path filePath) {
        String mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE; // Default binary type
        try {
            mimeType = Files.probeContentType(filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return mimeType != null ? mimeType : MediaType.APPLICATION_OCTET_STREAM_VALUE;
    }

    public String getFileSize(String filePath) {
        Path path = Paths.get(filePath);
        try {
            long bytes = Files.size(path);
            double megabytes = bytes / (1024.0 * 1024.0);
            return String.format("%.2f MB", megabytes);
        } catch (IOException e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }



}
