package com.arcade.manager.services;

import com.arcade.manager.classes.GameDetail;
import com.arcade.manager.mappers.DocumentMapper;
import com.arcade.manager.mappers.SystemMapper;
import com.arcade.manager.models.Document;
import com.arcade.manager.models.System;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Log4j
public class ManagerService {
    private final String tempDir = Paths.get("").toAbsolutePath().getParent().toString() + "/temp";
    private final String absolutePath = Paths.get("").toAbsolutePath().getParent().toString();
    private final static String socketDestination = "/topic/logs";
    private final ObjectMapper objectMapper;
    private final SystemMapper systemMapper;
    private final DocumentMapper documentMapper;
    private final TelegramService telegramService;
    private final ZipService zipService;
    private final SimpMessagingTemplate template;
    private final FileService fileService;

    @Autowired
    public ManagerService(ObjectMapper objectMapper, SystemMapper systemMapper, DocumentMapper documentMapper, TelegramService telegramService, ZipService zipService,
    SimpMessagingTemplate template, FileService fileService) {
        this.objectMapper = objectMapper;
        this.systemMapper = systemMapper;
        this.documentMapper = documentMapper;
        this.telegramService = telegramService;
        this.zipService = zipService;
        this.template = template;
        this.fileService = fileService;
    }

    public void downloadMultimedia(Integer idSystem, List<String> multimediaTypes) throws Exception {
        try {
            System system = this.systemMapper.getSystemById(idSystem);
            for (String type : multimediaTypes) {
                List<Document> documents = this.documentMapper.getDocumentByType(idSystem, type);
                for (Document document : documents) {
                    telegramService.processTelegramDocument(document, idSystem, tempDir);
                }
                zipService.processZipFiles(tempDir);
                fileService.deleteFilesInDirectory(tempDir);
                fileService.moveFiles(tempDir, system.getWorkPath());
                String message = "Descarga de " + type + " completada!!";
                log.info(message);
                this.template.convertAndSend(socketDestination, message);
            }
        }catch (Exception e){
            log.error("Error al descargar archivos: " + e.getMessage());
            throw e;
        }
    }

    public List<System> getAllSystems(){
        try {
            log.info("Obteniendo listado de sistemas");
            return systemMapper.getAllSystems();
        } catch (Exception e) {
            log.error("Error al obtener listado de sistemas: " + e.getMessage());
            throw e;
        }
    }

    public List<GameDetail> getSystemGameList(Integer idSystem){
        try {
            System system = systemMapper.getSystemById(idSystem);
            String romPath = system.getRomPath();
            List<String> fileList = fileService.getFileListInDirectory(romPath);
            List<GameDetail> gameDetailList = new ArrayList<>();java.lang.System.out.println(romPath);

            for (String filePath : fileList) {
                Path path = Paths.get(filePath);
                String fileSize = fileService.getFileSize(path.toString());
                String fileNameWithExtension = path.getFileName().toString();
                String fileNameWithoutExtension = fileService.removeFileExtension(fileNameWithExtension);
                String videoPath = absolutePath + system.getVideoPath() + "/" + fileNameWithoutExtension + ".mp4";
                String logoPath = absolutePath + system.getLogoPath() + "/" + fileNameWithoutExtension + ".png";
                Map<String, String> xmlData = getXmlData(absolutePath + romPath + "/gamelist.xml", "./" + fileNameWithExtension);

                if (!Files.exists(Paths.get(videoPath))) {
                    videoPath = null;
                }
                if (!Files.exists(Paths.get(logoPath))) {
                    logoPath = null;
                }

                GameDetail gameDetail = new GameDetail();
                gameDetail.setRomName(fileNameWithExtension);
                gameDetail.setRomPath(filePath);
                gameDetail.setVideoPath(videoPath);
                gameDetail.setLogoPath(logoPath);
                gameDetail.setGameName(xmlData.get("name"));
                gameDetail.setDesc(xmlData.get("desc"));
                gameDetail.setRomSize(fileSize);
                gameDetailList.add(gameDetail);
            }
            return gameDetailList;
        } catch (Exception e) {
            log.error("Error inesperado al procesar el sistema con ID: " + idSystem, e);
            throw e;
        }
    }

    public List<Document> test() throws IOException {
        String type = "logos";
        String system = "naomi";
        String path = Paths.get(type, system + ".json").toString();
        String message = "Obteniendo TelegramDocument: " + path;
        log.info(message);
        try (InputStream inputStream = new ClassPathResource(path).getInputStream()) {
            List<Document> documents = objectMapper.readValue(inputStream, new TypeReference<List<Document>>() {});

            for(Document document : documents){
                document.setIdSystem(4);
                document.setType(type);
                this.documentMapper.insertDocument(document);
            }

            return documents;
        } catch (IOException e) {
            message = "Error al obtener la clase TelegramDocument: " + e.getMessage();
            log.error(message, e);
            throw e;
        }
    }

    public void uploadFiles(){

    }

    public Map<String, String> getXmlData(String xmlDir, String path) {
        Map<String, String> game = new HashMap<>();

        try {
            File xmlFile = new File(xmlDir);
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            org.w3c.dom.Document doc = dBuilder.parse(xmlFile);
            doc.getDocumentElement().normalize();

            // Leer los juegos
            NodeList gameList = doc.getElementsByTagName("game");
            for (int i = 0; i < gameList.getLength(); i++) {
                Node gameNode = gameList.item(i);
                if (gameNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element gameElement = (Element) gameNode;
                    String gamePath = gameElement.getElementsByTagName("path").item(0).getTextContent();
                    if (gamePath.equals(path)) {
                        game.put("id", gameElement.getAttribute("id"));
                        game.put("source", gameElement.getAttribute("source"));
                        game.put("path", gamePath);
                        game.put("name", gameElement.getElementsByTagName("name").item(0).getTextContent());
                        game.put("desc", gameElement.getElementsByTagName("desc").item(0).getTextContent());
                        game.put("rating", gameElement.getElementsByTagName("rating").item(0).getTextContent());
                        game.put("releasedate", gameElement.getElementsByTagName("releasedate").item(0).getTextContent());
                        game.put("developer", gameElement.getElementsByTagName("developer").item(0).getTextContent());
                        game.put("publisher", gameElement.getElementsByTagName("publisher").item(0).getTextContent());
                        game.put("genre", gameElement.getElementsByTagName("genre").item(0).getTextContent());
                        game.put("players", gameElement.getElementsByTagName("players").item(0).getTextContent());
                        game.put("hash", gameElement.getElementsByTagName("hash").item(0).getTextContent());
                        game.put("image", gameElement.getElementsByTagName("image").item(0).getTextContent());
                        game.put("genreid", gameElement.getElementsByTagName("genreid").item(0).getTextContent());
                        break;
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return game;
    }


}
