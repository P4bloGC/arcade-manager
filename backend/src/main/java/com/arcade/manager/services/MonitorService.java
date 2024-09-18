package com.arcade.manager.services;

import lombok.extern.log4j.Log4j;
import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;
import oshi.hardware.GlobalMemory;
import oshi.hardware.GraphicsCard;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.util.FormatUtil;

import java.lang.management.ManagementFactory;
import java.lang.management.OperatingSystemMXBean;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.io.File;

import org.springframework.stereotype.Service;

@Service
@Log4j
public class MonitorService {
    private final OperatingSystemMXBean osBean;
    private final HardwareAbstractionLayer hardware;

    public MonitorService() {
        this.osBean = ManagementFactory.getOperatingSystemMXBean();
        this.hardware = new SystemInfo().getHardware();
    }

    public Map<String, Object> getSystemInfo() {
        Map<String, Object> metricsMap = new HashMap<>();
        metricsMap.put("RAM", getRamInfo());
        metricsMap.put("Disk", getDiskInfo());
        metricsMap.put("CPU", getCpuInfo());
        metricsMap.put("Graphics", getGraphicsInfo());
        log.info("Métricas obtenidas correctamente: " + metricsMap.toString());
        return metricsMap;
    }

    private Map<String, Object> getRamInfo() {
        try {
            Map<String, Object> ramMetrics = new HashMap<>();
            GlobalMemory globalMemory = hardware.getMemory();
            long totalMemory = globalMemory.getTotal();
            long freeMemory = globalMemory.getAvailable();
            long usedMemory = totalMemory - freeMemory;
            ramMetrics.put("TotalMemory", FormatUtil.formatBytes(totalMemory));
            ramMetrics.put("UsedMemory", FormatUtil.formatBytes(usedMemory));
            ramMetrics.put("FreeMemory", FormatUtil.formatBytes(freeMemory));
            return ramMetrics;
        } catch (Exception e) {
            log.error("Error al obtener métricas de la Memoria RAM: " + e.getMessage());
            throw e;
        }
    }

    private Map<String, Object> getDiskInfo() {
        try {
            Map<String, Object> diskMetrics = new HashMap<>();
            File root = new File("/");
            long totalSpace = root.getTotalSpace();
            long freeSpace = root.getFreeSpace();
            long usedSpace = totalSpace - freeSpace;
            diskMetrics.put("/", Map.of(
                    "TotalSpace", FormatUtil.formatBytes(totalSpace),
                    "UsedSpace", FormatUtil.formatBytes(usedSpace),
                    "FreeSpace", FormatUtil.formatBytes(freeSpace)
            ));
            return diskMetrics;
        } catch (Exception e) {
            log.error("Error al obtener métricas de la Disco Duro: " + e.getMessage());
            throw e;
        }
    }

    private Map<String, Object> getCpuInfo() {
        try {
            Map<String, Object> cpuMetrics = new HashMap<>();
            CentralProcessor processor = hardware.getProcessor();
            int numberOfCores = Runtime.getRuntime().availableProcessors();
            double cpuLoad = osBean.getSystemLoadAverage() * 100;
            cpuMetrics.put("NumberOfCores", numberOfCores);
            cpuMetrics.put("CpuLoad", String.format("%.2f", cpuLoad));
            cpuMetrics.put("ProcessorName", processor.getProcessorIdentifier().getName());
            return cpuMetrics;
        } catch (Exception e) {
            log.error("Error al obtener métricas de la CPU: " + e.getMessage());
            throw e;
        }
    }

    private Map<String, Object> getGraphicsInfo() {
        try {
            Map<String, Object> graphicsMetrics = new HashMap<>();
            List<GraphicsCard> graphicsCards = hardware.getGraphicsCards();
            for (GraphicsCard graphicsCard : graphicsCards) {
                graphicsMetrics.put("GraphicsCardName", graphicsCard.getName());
                graphicsMetrics.put("GraphicsCardVendor", graphicsCard.getVendor());
                graphicsMetrics.put("GraphicsCardVRAM", FormatUtil.formatBytes(graphicsCard.getVRam()));
            }
            return graphicsMetrics;
        } catch (Exception e) {
            log.error("Error al obtener métricas de la gráfica: " + e.getMessage());
            throw e;
        }
    }
}

