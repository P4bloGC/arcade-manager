package com.arcade.manager.services;

import com.arcade.manager.mappers.SystemMapper;
import com.arcade.manager.models.System;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@Service
@Log4j
public class SystemService {
    private final SystemMapper systemMapper;

    @Autowired
    public SystemService(SystemMapper systemMapper){
        this.systemMapper = systemMapper;
    }

    public List<Map<String, String>> showCfgFiles(String attractPath) throws IOException {
        List<Map<String, String>> cfgFilesContent = new ArrayList<>();
        String emulatorsPath = attractPath + "/emulators";

        try (Stream<Path> cfgFiles = Files.walk(Paths.get(emulatorsPath))
                .filter(path -> Files.isRegularFile(path) && path.toString().endsWith(".cfg"))) {

            cfgFiles.forEach(path -> {
                try {
                    // Lee el contenido del archivo .cfg
                    List<String> content = Files.readAllLines(path);

                    // Crea un mapa para almacenar la ruta y el contenido
                    Map<String, String> fileData = new HashMap<>();
                    fileData.put("cfgPath", path.toString());

                    // Junta el contenido del archivo en una cadena de texto
                    StringBuilder contentBuilder = new StringBuilder();
                    content.forEach(line -> contentBuilder.append(line).append("\n"));
                    String contentString = contentBuilder.toString();
                    //fileData.put("content", contentString);

                    fileData.put("system", extractValue(contentString, "system"));
                    fileData.put("executable", extractValue(contentString, "executable"));
                    fileData.put("workdir", extractValue(contentString, "workdir"));
                    fileData.put("rompath", extractValue(contentString, "rompath"));
                    fileData.put("romext", extractValue(contentString, "romext"));

                    // Extrae las rutas de todos los artworks
                    Map<String, String> artworkPaths = extractArtworkPaths(contentString);
                    artworkPaths.forEach(fileData::put);

                    // Agrega el mapa a la lista
                    cfgFilesContent.add(fileData);
                } catch (IOException e) {
                    log.error("Error al leer el archivo " + path + ": " + e.getMessage());
                }
            });
        } catch (Exception e) {
            log.error("Error al leer el directorio: " + e.getMessage());
            throw e;
        }

        return cfgFilesContent;
    }

    private String extractValue(String content, String searchValue) {
        String[] lines = content.split("\n");
        for (String line : lines) {
            if (line.startsWith(searchValue)) {
                return line.substring(searchValue.length()).trim();
            }
        }
        return ""; // Retorna una cadena vacía si no se encuentra "system"
    }

    private Map<String, String> extractArtworkPaths(String content) {
        Map<String, String> artworkPaths = new HashMap<>();
        String[] lines = content.split("\n");

        for (String line : lines) {
            if (line.trim().startsWith("artwork")) {
                String[] parts = line.trim().split("\\s+");
                if (parts.length > 2) {
                    String artworkType = parts[1]; // Tipo de artwork (flyer, marquee, snap, wheel, etc.)
                    String path = parts[2];        // Ruta del artwork
                    artworkPaths.put(artworkType, path); // Añade el tipo de artwork y su ruta al mapa
                }
            }
        }
        return artworkPaths;
    }

    public System getSystemById(Integer id){
        try{
            return systemMapper.getSystemById(id);
        }catch(Exception e){
            log.error("Ha ocurrido un error al obtener el sistema por ID: " + e.getMessage());
            throw  e;
        }
    }

    public void insertSystem(System system){
        try{
            systemMapper.insertSystem(system);
        } catch (Exception e){
            log.error("Ha ocurrido un error al insertar el sistema: " + e.getMessage());
            throw e;
        }
    }

    public void updateSystem(System system){
        try{
            systemMapper.updateSystem(system);
        }catch(Exception e){
            log.error("Ha ocurrido un error al actualizar el sistema: " + e.getMessage());
            throw  e;
        }
    }

    public void deleteSystem(Integer id){
        try{
            systemMapper.deleteSystem(id);
        }catch(Exception e){
            log.error("Ha ocurrido un error al eliminar el sistema: " + e.getMessage());
        }
    }


}
