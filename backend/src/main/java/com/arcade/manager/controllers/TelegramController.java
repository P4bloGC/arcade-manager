package com.arcade.manager.controllers;

import com.arcade.manager.classes.GameDetail;
import com.arcade.manager.models.Document;
import com.arcade.manager.models.System;
import com.arcade.manager.services.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@RestController
@Tag(name = "Telegram Controller", description = "Operaciones Relacionadas a la Api de Telegram")
public class TelegramController {

    private final TelegramService telegramService;
    private final ZipService zipService;
    private final ManagerService managerService;
    private final FileService fileService;
    private final SystemService systemService;

    public TelegramController(TelegramService telegramService, ZipService zipService, ManagerService managerService, FileService fileService, SystemService systemService) {
        this.telegramService = telegramService;
        this.zipService = zipService;
        this.managerService = managerService;
        this.fileService = fileService;
        this.systemService = systemService;
    }

    @GetMapping("/test")
    public ResponseEntity<List<Document>> test() throws IOException {
        return ResponseEntity.ok(managerService.test());
    }

    @PostMapping(value = "/init")
    public List<Map<String, String>> initSystems(@RequestParam("attractPath") String attractPath) throws IOException {
        return ResponseEntity.ok(systemService.showCfgFiles(attractPath)).getBody();
    }

    @GetMapping("/manager/getSystemGameList/{idSystem}")
    public ResponseEntity<List<GameDetail>> getSystemGameList(@PathVariable Integer idSystem) throws IOException {
        return ResponseEntity.ok(managerService.getSystemGameList(idSystem));
    }

    @PostMapping(value = "/manager/uploadFile")
    @Operation(summary = "Subir un archivo")
    public void uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("idSystem") Integer idSystem, @RequestParam("romName") String romName, @RequestParam("type") String type) throws IOException {
        fileService.uploadFile(file, idSystem, romName, type);
    }

    @PostMapping(value = "/manager/uploadMultipleFiles")
    @Operation(summary = "Subir multiples archivos")
    public void uploadMultipleFiles(@RequestParam("files") MultipartFile[] files, @RequestParam("idSystem") Integer idSystem, @RequestParam("romName") String romName, @RequestParam("type") String type) throws IOException {
        for(MultipartFile file : files){
            fileService.uploadFile(file, idSystem, romName, type);
        }
    }

    @PostMapping(value = "/manager/deleteFile")
    @Operation(summary = "Eliminar un archivo")
    public ResponseEntity<Object> deleteFile(@RequestBody Map<String, Object> request) throws IOException {
        Path filePath = Paths.get(request.get("filePath").toString());
        fileService.deleteFileIfRegular(filePath);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/manager/serve", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Visualizar multimedia")
    public ResponseEntity<Resource> serveFile(@RequestBody Map<String, String> request) {
        String path = request.get("path");
        return fileService.serveFile(path);
    }

    @PostMapping(value = "/manager/download", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Descarga archivos multimedia")
    public ResponseEntity<String> downloadMultimedia(@RequestBody Map<String, Object> request) throws Exception {
        Integer idSystem = (Integer) request.get("idSystem");
        List<String> multimediaTypes = (List<String>) request.get("multimediaTypes");
        managerService.downloadMultimedia(idSystem, multimediaTypes);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/manager/getAllSystems")
    @Operation(summary = "Obtener listado de Sistemas")
    public ResponseEntity<List<System>> getAllSystems() throws IOException {
        return ResponseEntity.ok(managerService.getAllSystems());
    }
    /*

    @GetMapping("/download/{system}/{type}")
    @Operation(summary = "Obtener archivos desde bot telegram")
    public ResponseEntity<List<TelegramDocument>> getDocuments(@PathVariable String system, @PathVariable String type) throws Exception {
        return ResponseEntity.ok(telegramService.processDocuments(system, type));
    }



    @GetMapping("generate/json/{system}/{type}")
    public ResponseEntity<List<TelegramDocument>> generateTelegramDocumentJson(@PathVariable String system, @PathVariable String type) throws IOException {
        return ResponseEntity.ok(telegramService.processJson(system, type));
    }

     */

    @GetMapping("split/{zipName}")
    public void splitDocument(@PathVariable String zipName) throws IOException {
        String zipDir = Paths.get("").toAbsolutePath().getParent().toString() + "/temp/" + zipName + ".zip";
        String outDir = Paths.get("").toAbsolutePath().getParent().toString() + "/temp/split";
        zipService.splitZipFile(zipDir, outDir);
    }
}
