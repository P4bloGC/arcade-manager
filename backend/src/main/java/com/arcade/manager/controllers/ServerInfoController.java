package com.arcade.manager.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.PostConstruct;
import java.net.InetAddress;
import java.net.UnknownHostException;

@Controller
public class ServerInfoController {

    @Value("${server.port}")
    private int serverPort;

    private String serverIp;

    @PostConstruct
    public void init() {
        try {
            // Obtiene la dirección IP de la máquina
            InetAddress inetAddress = InetAddress.getLocalHost();
            this.serverIp = inetAddress.getHostAddress();
        } catch (UnknownHostException e) {
            this.serverIp = "IP desconocida";
        }
    }

    @GetMapping("/server-info")
    @ResponseBody
    public String getServerInfo() {
        return "IP: " + serverIp + ", Puerto: " + serverPort;
    }
}
