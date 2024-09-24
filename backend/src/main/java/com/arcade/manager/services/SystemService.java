package com.arcade.manager.services;

import com.arcade.manager.mappers.SystemMapper;
import com.arcade.manager.models.System;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Log4j
public class SystemService {
    private final SystemMapper systemMapper;

    @Autowired
    public SystemService(SystemMapper systemMapper){
        this.systemMapper = systemMapper;
    }

    public System getSystemById(Integer id){
        try{
            return systemMapper.getSystemById(id);
        }catch(Exception e){
            log.error("Ha ocurrido un error al obtener el sistema por ID: " + e.getMessage());
            throw  e;
        }
    }

    public void insertSystem(System system){
        try{
            systemMapper.insertSystem(system);
        } catch (Exception e){
            log.error("Ha ocurrido un error al insertar el sistema: " + e.getMessage());
            throw e;
        }
    }

    public void updateSystem(System system){
        try{
            systemMapper.updateSystem(system);
        }catch(Exception e){
            log.error("Ha ocurrido un error al actualizar el sistema: " + e.getMessage());
            throw  e;
        }
    }

    public void deleteSystem(Integer id){
        try{
            systemMapper.deleteSystem(id);
        }catch(Exception e){
            log.error("Ha ocurrido un error al eliminar el sistema: " + e.getMessage());
        }
    }


}
