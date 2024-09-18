package com.arcade.manager.services;

import com.arcade.manager.classes.TelegramConfig;
import com.arcade.manager.classes.TelegramDocument;
import com.arcade.manager.classes.TelegramResponse;
import com.arcade.manager.classes.TelegramUpdate;
import com.arcade.manager.models.Document;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;

import org.springframework.core.env.Environment;

@Service
@Log4j
public class TelegramService {

    private final Environment env;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final ZipService zipService;
    private final SimpMessagingTemplate template;
    private final String tempDir = Paths.get("").toAbsolutePath().getParent().toString() + "/temp";

    @Value("${telegram.atomiswave.token}")
    private String atomiswaveToken;

    @Value("${telegram.naomi.token}")
    private String naomiToken;

    @Value("${telegram.model2.token}")
    private String model2Token;

    @Value("${telegram.model3.token}")
    private String model3Token;

    public TelegramService(RestTemplate restTemplate, ObjectMapper objectMapper, ZipService zipService, Environment env, SimpMessagingTemplate template) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
        this.zipService = zipService;
        this.env = env;
        this.template = template;
    }

    public void processTelegramDocument(Document document, Integer idSystem, String tempDir) throws Exception {
        String fileUrl = this.getTemporalUrl(document, getTelegramToken(idSystem));
        document.setFileUrl(fileUrl);
        this.downloadTelegramDocument(tempDir, document);
    }



    public String getTelegramToken(Integer system) {
        String token = null;

        switch (system) {
            case 1:
                token = atomiswaveToken;
                break;
            case 4:
                token = naomiToken;
                break;
            case 2:
                token = model2Token;
                break;
            case 3:
                token = model3Token;
                break;
            default:
                break;
        }
        return token;
    }
    public TelegramConfig getTelegramConfig(String system) throws IOException {
        String pathConfig = system + ".json";
        String message = "Obteniendo configuración: " + pathConfig;
        this.template.convertAndSend("/topic/logs", message);
        log.info(message);
        try {
            ClassPathResource resource = new ClassPathResource(pathConfig);
            return objectMapper.readValue(resource.getInputStream(), TelegramConfig.class);
        } catch (IOException e) {
            message = "Error al obtener configuración de telegram: " + e.getMessage();
            log.error(message, e);
            this.template.convertAndSend("/topic/logs", message);
            throw e;
        }
    }

    public List<TelegramDocument> getTelegramDocument(String system, String type) throws IOException {
        String path = Paths.get(type, system + ".json").toString();
        String message = "Obteniendo TelegramDocument: " + path;
        log.info(message);
        this.template.convertAndSend("/topic/logs", message);
        try (InputStream inputStream = new ClassPathResource(path).getInputStream()) {
            return objectMapper.readValue(inputStream, new TypeReference<List<TelegramDocument>>() {});
        } catch (IOException e) {
            message = "Error al obtener la clase TelegramDocument: " + e.getMessage();
            log.error(message, e);
            this.template.convertAndSend("/topic/logs", message);
            throw e;
        }
    }

    public List<TelegramDocument> generateTelegramDocument(String token) throws JsonProcessingException {
        List<TelegramDocument> allDocuments = new ArrayList<>();
        Integer offset = -1;

        try {
            while (true) {
                String url = "https://api.telegram.org/bot" + token + "/getUpdates" + "?offset=" + (offset != null ? offset + 1 : "");
                ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
                TelegramResponse telegramResponse = objectMapper.readValue(response.getBody(), TelegramResponse.class);

                for (TelegramUpdate update : telegramResponse.getResult()) {
                    if (update.getMessage() != null && update.getMessage().getDocument() != null) {
                        String message = "Agregando: " + update;
                        log.info(message);
                        this.template.convertAndSend("/topic/logs", message);
                        allDocuments.add(update.getMessage().getDocument());
                    }
                }

                if (!telegramResponse.getResult().isEmpty()) {
                    offset = Math.toIntExact(telegramResponse.getResult().get(telegramResponse.getResult().size() - 1).getUpdateId());
                } else {
                    break;
                }
            }
        } catch (Exception e) {
            String message = "Error al generar documentos: " + e.getMessage();
            log.error(message, e);
            this.template.convertAndSend("/topic/logs", message);
            throw e;
        }

        return allDocuments;
    }

    private void saveDocumentsAsJson(List<TelegramDocument> documents, String system, String type) throws IOException {
        String json = objectMapper.writeValueAsString(documents);
        Path directoryPath = Paths.get("src", "main", "resources", type);
        Files.createDirectories(directoryPath);
        Path filePath = directoryPath.resolve(system + ".json");
        Files.write(filePath, json.getBytes(), StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
    }

    public String getTemporalUrl(Document telegramDocument, String token) throws IOException, InterruptedException {
            try {
                String fileId = telegramDocument.getFileId();
                String url = "https://api.telegram.org/bot" + token + "/getFile?file_id=" + fileId;
                String response = restTemplate.getForObject(url, String.class);
                JsonNode root = objectMapper.readTree(response);
                String filePath = root.path("result").path("file_path").asText();

                // Generar enlace temporal para el archivo
                String fileUrl = "https://api.telegram.org/file/bot" + token + "/" + filePath;
                return fileUrl;
        } catch (Exception e) {
            String message = "Error al generar el enlace temporal: " + e.getMessage();
            log.error(message, e);
            this.template.convertAndSend("/topic/logs", message);
            throw e;
        }
    }

    public void downloadTelegramDocument(String downloadDirectory, Document telegramDocument) throws IOException, InterruptedException {
        String fileName = telegramDocument.getFileName();
        String downloadUrl = telegramDocument.getFileUrl();
        String message = "Descargando: " + fileName;
        log.info(message);
        this.template.convertAndSend("/topic/logs", message);

        try {
            downloadFile(downloadUrl, downloadDirectory, fileName);
        } catch (IOException | InterruptedException e) {
            message = "Error al descargar el archivo: " + e.getMessage();
            log.error(message, e);
            this.template.convertAndSend("/topic/logs", message);
            throw e;
        }
    }

    private void downloadFile(String downloadUrl, String downloadDirectory, String fileName) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(downloadUrl))
                .GET()
                .build();

        HttpResponse<Path> response = client.send(request, HttpResponse.BodyHandlers.ofFile(Paths.get(downloadDirectory, fileName)));

        if (response.statusCode() != 200) {
            String message = "Error en la conexión HTTP: " + response.statusCode();
            log.error(message);
            this.template.convertAndSend("/topic/logs", message);
            throw new IOException("Failed to download file: " + response.statusCode());
        }
    }

    public void deleteFilesInDirectory(String dir) throws IOException {
        Path directoryPath = Paths.get(dir);
        if (!Files.exists(directoryPath) || !Files.isDirectory(directoryPath)) {
            String message = "El directorio no existe o no es un directorio: " + dir;
            log.debug(message);
            this.template.convertAndSend("/topic/logs", message);
            return;
        }

        try (DirectoryStream<Path> stream = Files.newDirectoryStream(directoryPath)) {
            for (Path entry : stream) {
                deleteFileIfRegular(entry);
            }
        } catch (Exception e) {
            String message = "Error al leer el directorio: " + dir;
            log.error(message, e);
            this.template.convertAndSend("/topic/logs", message);
            throw e;
        }
    }

    private void deleteFileIfRegular(Path entry) throws IOException {
        try {
            if (Files.isRegularFile(entry)) {
                String message = "Eliminando archivo temporal: " + entry;
                log.info(message);
                this.template.convertAndSend("/topic/logs", message);
                Files.delete(entry);
            }
        } catch (Exception e) {
            String message = "No se pudo eliminar el archivo: " + entry.toAbsolutePath();
            log.debug(message, e);
            this.template.convertAndSend("/topic/logs", message);
            throw e;
        }
    }

    public void moveFiles(String tempDir, String system) throws IOException {
        Path sourceDir = Paths.get(tempDir);
        Path targetDir = Paths.get("").toAbsolutePath().getParent().resolve("systems").resolve(system);

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
                this.template.convertAndSend("/topic/logs", message);
            }
        } catch (Exception e) {
            String message = "Error al mover archivo: " + e.getMessage();
            log.error(message, e);
            this.template.convertAndSend("/topic/logs", message);
            throw e;
        }
    }

}




