package com.arcade.manager;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableEncryptableProperties
public class ArcadeWebManagerApplication {

	public static void main(String[] args) {
		// Configurar la propiedad para evitar el modo headless
		System.setProperty("java.awt.headless", "false");

		SpringApplication.run(ArcadeWebManagerApplication.class, args);
	}
}
