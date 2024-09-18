package com.arcade.manager.controllers;

import com.arcade.manager.classes.Capture;
import com.arcade.manager.services.WindowsRecorderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/screen-recorder")
@Tag(name = "ScreenRecorder Controller", description = "Operaciones Relacionadas a la captura de escritorio en video")
public class ScreenRecorderController {

    @Autowired
    private WindowsRecorderService windowsRecorderService;

    @GetMapping("/start/{fps}/{resolution}")
    @Operation(summary = "Comienza el proceso de grabación del escritorio")
    public String startRecording(@PathVariable String fps, @PathVariable String resolution) throws IOException {
        windowsRecorderService.startRecording(fps, resolution);
        return "Recording started";
    }

    @GetMapping("/stop")
    @Operation(summary = "Detiene el proceso de grabación del escritorio")
    public String stopRecording() throws InterruptedException, IOException {
        windowsRecorderService.stopRecording();
        return "Recording stopped";
    }

    @GetMapping("/list")
    @Operation(summary = "Obtiene listado de grabaciones")
    public List<Capture> getRecordList(){
        return windowsRecorderService.getCaptureList();
    }
}







