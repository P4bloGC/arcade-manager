package com.arcade.manager.controllers;

import com.arcade.manager.services.MonitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class MonitorController {
    @Autowired
    private MonitorService monitorService;

    @GetMapping("/monitor")
    public ResponseEntity<Map<String, Object>> getsystemInfo() {
        return ResponseEntity.ok(monitorService.getSystemInfo());
    }
}

