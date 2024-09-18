package com.arcade.manager.mappers;

import com.arcade.manager.models.System;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SystemMapper {

    List<System> getAllSystems();

    System getSystemById(int id);

    void insertSystem(System system);

    void updateSystem(System system);

    void deleteSystem(int id);
}
