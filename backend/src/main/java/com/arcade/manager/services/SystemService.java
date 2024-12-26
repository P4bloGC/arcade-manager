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

    public List<System> getSystemsFromCfgFiles(String attractPath) throws IOException {
        List<System> systemList = new ArrayList<>();
        String emulatorsPath = attractPath + "/emulators";

        try (Stream<Path> cfgFiles = Files.walk(Paths.get(emulatorsPath))
                .filter(path -> Files.isRegularFile(path) && path.toString().endsWith(".cfg"))) {

            cfgFiles.forEach(path -> {
                try {
                    // Read the content of the .cfg file
                    List<String> content = Files.readAllLines(path);

                    // Build a string containing the content of the file
                    StringBuilder contentBuilder = new StringBuilder();
                    content.forEach(line -> contentBuilder.append(line).append("\n"));
                    String contentString = contentBuilder.toString();

                    // Extract data and create a new System object
                    System system = new System();
                    system.setCfgPath(path.toString());
                    system.setSystemName(extractValue(contentString, "system"));
                    system.setExecutablePath(extractValue(contentString, "executable"));
                    system.setWorkPath(extractValue(contentString, "workdir"));
                    system.setRomPath(extractValue(contentString, "rompath"));
                    system.setRomExt(extractValue(contentString, "romext"));

                    // Extract artwork paths
                    Map<String, String> artworkPaths = extractArtworkPaths(contentString);
                    system.setFlyerPath(artworkPaths.getOrDefault("flyer", ""));
                    system.setMarqueePath(artworkPaths.getOrDefault("marquee", ""));
                    system.setLogoPath(artworkPaths.getOrDefault("wheel", ""));
                    system.setVideoPath(artworkPaths.getOrDefault("snap", ""));

                    this.insertSystem(system);

                    // Add the system to the list
                    systemList.add(system);
                } catch (IOException e) {
                    log.error("Error reading file " + path + ": " + e.getMessage());
                }
            });
        } catch (Exception e) {
            log.error("Error reading directory: " + e.getMessage());
            throw e;
        }

        return systemList;
    }


    private String extractValue(String content, String searchValue) {
        String[] lines = content.split("\n");
        for (String line : lines) {
            if (line.startsWith(searchValue)) {
                return line.substring(searchValue.length()).trim();
            }
        }
        return "";
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
