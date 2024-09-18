package com.arcade.manager.classes;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TelegramConfig {
    private String name;
    private String idChat;
    private String token;
    private boolean inParts;
    private boolean compress;
    private String extension;
    private String apiUpdates;
    private Integer offset;
    private String roms;
    private String videos;
    private String logos;
}
