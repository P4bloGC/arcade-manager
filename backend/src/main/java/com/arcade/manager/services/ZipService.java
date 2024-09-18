package com.arcade.manager.services;

import lombok.extern.log4j.Log4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.Arrays;
import java.util.Comparator;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Service
@Log4j
public class ZipService {
    private static final int PART_SIZE = 20 * 1024 * 1024; // 20 MB
    private final SimpMessagingTemplate template;

    public ZipService(SimpMessagingTemplate template) {
        this.template = template;
    }

    public void processZipFiles(String tempDir) throws Exception {
        mergeZipParts(tempDir);
        unZipDocument(tempDir);
    }

    public void mergeZipParts(String tempDir) throws IOException {
        try {
            File dir = new File(tempDir);
            File combinedFile = new File(tempDir + "/merged.zip");
            String[] filesArray = this.sortArray(dir);
            FileOutputStream fos = new FileOutputStream(combinedFile);
            BufferedOutputStream bos = new BufferedOutputStream(fos);

            for (String fname : filesArray) {
                String message = "Combinando archivo: " + fname;
                log.info(message);
                this.template.convertAndSend("/topic/logs", message);
                File partFile = new File(dir, fname);
                FileInputStream fis = new FileInputStream(partFile);
                BufferedInputStream bis = new BufferedInputStream(fis);
                byte[] buffer = new byte[4096];
                int length;

                while ((length = bis.read(buffer)) > 0) {
                    bos.write(buffer, 0, length);
                }
                bis.close();
                fis.close();
            }

            bos.close();
            fos.close();
            String message = "Archivo combinado creado en: " + combinedFile.getAbsolutePath();
            log.info(message);
            this.template.convertAndSend("/topic/logs", message);
        } catch (Exception e) {
            String message = "Ha ocurrido un error al combinar los zip: " + e.getMessage();
            log.debug(message);
            this.template.convertAndSend("/topic/logs", message);
            throw e;
        }
    }

    public String[] sortArray(File dir) throws IOException {
        // Obtener y ordenar los nombres de los archivos
        String[] filesArray = dir.list((d, name) -> name.matches(".+\\.zip\\.z\\d+"));
        if (filesArray == null) {
            throw new IOException("No files found in the directory");
        }

        // Ordenar archivos numéricamente
        Arrays.sort(filesArray, new Comparator<String>() {
            @Override
            public int compare(String o1, String o2) {
                // Extraer el número después de ".zip.z" y comparar
                int num1 = extractNumber(o1);
                int num2 = extractNumber(o2);
                return Integer.compare(num1, num2);
            }

            private int extractNumber(String s) {
                String numberStr = s.replaceAll(".+\\.zip\\.z", "");
                return Integer.parseInt(numberStr);
            }
        });

        return filesArray;
    }

    public void unZipDocument(String dir) throws Exception {
        try {
            File zipFile = new File(dir, "merged.zip");
            File destDir = new File(dir);

            if (!destDir.exists()) {
                destDir.mkdirs();
            }

            try (ZipInputStream zipInputStream = new ZipInputStream(new FileInputStream(zipFile))) {
                ZipEntry zipEntry = zipInputStream.getNextEntry();
                while (zipEntry != null) {
                    processZipEntry(zipInputStream, zipEntry, destDir);
                    zipEntry = zipInputStream.getNextEntry();
                }
            }
        } catch (Exception e) {
            String message = "Error al descomprimir archivo: " + e.getMessage();
            log.debug(message);
            this.template.convertAndSend("/topic/logs", message);
            throw e;
        }
    }

    private void processZipEntry(ZipInputStream zipInputStream, ZipEntry zipEntry, File destDir) throws IOException {
        File newFile = newFile(destDir, zipEntry);
        if (zipEntry.isDirectory()) {
            createDirectory(newFile);
        } else {
            createFileWithContent(zipInputStream, newFile);
        }
    }

    private void createDirectory(File newDir) throws IOException {
        if (!newDir.isDirectory() && !newDir.mkdirs()) {
            throw new IOException("Failed to create directory " + newDir);
        }
    }

    private void createFileWithContent(ZipInputStream zipInputStream, File newFile) throws IOException {
        File parent = newFile.getParentFile();
        if (!parent.isDirectory() && !parent.mkdirs()) {
            throw new IOException("Failed to create directory " + parent);
        }

        try (FileOutputStream fos = new FileOutputStream(newFile)) {
            byte[] buffer = new byte[1024];
            int len;
            while ((len = zipInputStream.read(buffer)) > 0) {
                fos.write(buffer, 0, len);
            }
        }
    }

    private File newFile(File destDir, ZipEntry zipEntry) throws IOException {
        File destFile = new File(destDir, zipEntry.getName());
        String destDirPath = destDir.getCanonicalPath();
        String destFilePath = destFile.getCanonicalPath();

        if (!destFilePath.startsWith(destDirPath + File.separator)) {
            throw new IOException("Entry is outside of the target dir: " + zipEntry.getName());
        }

        return destFile;
    }

    public void splitZipFile(String zipFilePath, String outputDir) throws IOException {
        try {
            File zipFile = new File(zipFilePath);
            if (!zipFile.exists() || !zipFile.isFile()) {
                throw new FileNotFoundException("ZIP file not found: " + zipFilePath);
            }

            File dir = new File(outputDir);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            FileInputStream fis = new FileInputStream(zipFile);
            BufferedInputStream bis = new BufferedInputStream(fis);

            byte[] buffer = new byte[PART_SIZE];
            int partNumber = 1;
            int bytesRead;

            while ((bytesRead = bis.read(buffer)) > 0) {
                File partFile = new File(outputDir, String.format("%s.z%02d", zipFile.getName(), partNumber++));

                FileOutputStream fos = new FileOutputStream(partFile);
                BufferedOutputStream bos = new BufferedOutputStream(fos);
                bos.write(buffer, 0, bytesRead);

                bos.close();
                fos.close();
                String message = "Archivo dividido: " + partFile.getAbsolutePath();
                log.info(message);
                this.template.convertAndSend("/topic/logs", message);
            }

            bis.close();
            fis.close();
        } catch (Exception e) {
            String message = "Ha ocurrido un error al dividir el archivo zip: " + e.getMessage();
            log.debug(message);
            this.template.convertAndSend("/topic/logs", message);
            throw e;
        }
    }
}
