#!/bin/bash

# Solicitar al usuario que ingrese el valor a encriptar
read -p "Ingrese el valor a encriptar: " value_to_encrypt

# Ejecutar el comando Maven para encriptar el valor
mvn jasypt:encrypt-value -Djasypt.encryptor.password="superkey" -Djasypt.plugin.value="$value_to_encrypt"

