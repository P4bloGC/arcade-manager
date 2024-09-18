package com.arcade.manager.services;

import com.arcade.manager.classes.Capture;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;


@Service
@Log4j
public class WindowsRecorderService {

    private final String outputDir = Paths.get("").toAbsolutePath().getParent().toString() + "/gameplays";

    private Process process;
    private final static String socketDestination = "/topic/logs";
    private final SimpMessagingTemplate template;
    private final FileService fileService;

    @Autowired
    public WindowsRecorderService(SimpMessagingTemplate template, FileService fileService){
        this.template = template;
        this.fileService = fileService;
    }

    public void startRecording(String fps, String resolution) throws IOException {
        String logMessage = "Comenzando grabación..";
        log.info(logMessage);
        this.template.convertAndSend(socketDestination, logMessage);
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        String outputFile = String.format("record_%s.mkv", timestamp);
        String outputPath = String.format("%s/%s", outputDir, outputFile);

        String[] command = {
                "ffmpeg",
                "-f", "gdigrab",
                "-framerate", fps,
                "-i", "desktop",
                "-f", "dshow",
                "-i", "audio=\"" + this.getAudioDevice() + "\"",
                "-vf", "scale=" + resolution,  // Reescala el video a la resolución deseada
                "-c:v", "libx264",           // Códec de video
                "-preset", "veryfast",       // Ajuste para velocidad de codificación
                "-crf", "23",                // Calidad de video (más bajo es mejor)
                "-c:a", "aac",               // Códec de audio
                "-b:a", "192k",              // Bitrate del audio
                "-movflags", "+faststart",   // Optimiza para reproducción progresiva
                "-pix_fmt", "yuv420p",       // Formato de píxeles
                outputPath
        };

        try {
            ProcessBuilder builder = new ProcessBuilder(command);
            builder.redirectErrorStream(true);
            process = builder.start();

            // Leer la salida del proceso (opcional)
            logMessage = "Leyendo la salida del proceso..";
            log.info(logMessage);
            this.template.convertAndSend(socketDestination, logMessage);
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            new Thread(() -> {
                String line;
                try {
                    while ((line = reader.readLine()) != null) {
                        System.out.println(line);
                        this.template.convertAndSend(socketDestination, line);
                    }
                } catch (Exception e) {
                    log.error("Ha ocurrido un error al grabar: " + e.getMessage());
                    try {
                        throw e;
                    } catch (IOException ex) {
                        throw new RuntimeException(ex);
                    }
                }
            }).start();
        } catch (Exception e) {
            logMessage = "Ha ocurrido un error al grabar: " + e.getMessage();
            log.error(logMessage);
            this.template.convertAndSend(socketDestination, logMessage);
            throw e;
        }
    }

    public void stopRecording() throws InterruptedException {
        if (process != null) {
            try {
                process.destroy();
                process.waitFor();
                String logMessage = "Proceso de grabado finalizado exitosamente.";
                log.info(logMessage);
                this.template.convertAndSend(socketDestination, logMessage);

                // Convertir el archivo MKV a MP4
               // convertMKVtoMP4();
            } catch (Exception e) {
                Thread.currentThread().interrupt();
                String logMessage = "Ha ocurrido un error al finalizar el proceso de grabación: " + e.getMessage();
                log.error(logMessage);
                this.template.convertAndSend(socketDestination, logMessage);
                throw e;
            }
        }
    }

    private void convertMKVtoMP4() throws IOException {
        // Ruta del archivo MKV y del archivo MP4
        String inputPath = String.format("%s/%s.mkv", outputDir, "outputFileName"); // Cambia "outputFileName" si es necesario
        String outputPath = String.format("%s/%s.mp4", outputDir, "outputFileName"); // Cambia "outputFileName" si es necesario

        // Comando para convertir MKV a MP4
        String[] command = {
                "ffmpeg",
                "-i", inputPath,
                "-c:v", "libx264",   // Códec de video
                "-preset", "medium", // Ajusta la calidad del códec
                "-crf", "23",        // Controla la calidad del video
                "-c:a", "aac",       // Códec de audio
                "-b:a", "192k",      // Bitrate del audio
                "-strict", "experimental",
                "-movflags", "+faststart", // Mejora la compatibilidad con streaming
                outputPath
        };

        try {
            ProcessBuilder builder = new ProcessBuilder(command);
            builder.redirectErrorStream(true);
            Process process = builder.start();

            // Leer la salida del proceso (opcional)
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            new Thread(() -> {
                String line;
                try {
                    while ((line = reader.readLine()) != null) {
                        System.out.println(line);
                    }
                } catch (Exception e) {
                    log.error("Ha ocurrido un error al convertir el archivo MKV a MP4: " + e.getMessage());
                }
            }).start();
        } catch (Exception e) {
            log.error("Ha ocurrido un error al convertir el archivo MKV a MP4: " + e.getMessage());
            throw e;
        }
    }


    public String getAudioDevice() {
        String command = "ffmpeg -list_devices true -f dshow -i dummy";
        String audioDevice = null;
        String logMessage = "Obteniendo dispositivo de audio..";
        log.info(logMessage);
        this.template.convertAndSend(socketDestination, logMessage);

        try {
            ProcessBuilder builder = new ProcessBuilder("cmd.exe", "/c", command);
            builder.redirectErrorStream(true);
            Process process = builder.start();

            // Leer la salida del proceso
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line); // Para debug

                // Buscar el nombre alternativo del dispositivo de audio
                if (line.contains("DirectShow audio devices")) {
                    while ((line = reader.readLine()) != null && !line.trim().isEmpty()) {
                        // Si encuentras el nombre alternativo, lo puedes extraer
                        if (line.contains("Alternative name")) {
                            audioDevice = line.split("Alternative name")[1].trim().replace("\"", "");
                            break;
                        }
                    }
                    break;
                }
            }
            process.waitFor();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
        logMessage = "Dispositivo de audio encontrado: " + audioDevice;
        log.info(logMessage);
        this.template.convertAndSend(socketDestination, logMessage);
        return audioDevice;
    }

    public List<Capture> getCaptureList(){
        try {
            List<String> fileList = fileService.getFileListInDirectory("/gameplays/");
            List<Capture> captureList = new ArrayList<>();
            for (String filePath : fileList) {
                Capture capture = new Capture();
                Path fileName = Paths.get(filePath).getFileName();
                capture.setPath(filePath);
                capture.setFileSize(fileService.getFileSize(filePath));
                capture.setFileName(fileName.toString());
                captureList.add(capture);
            }
            return captureList;
        }catch (Exception e){
            log.error("Error al obtener listado de captures: " + e.getMessage());
            throw e;
        }
    }

}

