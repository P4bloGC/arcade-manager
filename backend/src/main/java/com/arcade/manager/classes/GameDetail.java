package com.arcade.manager.classes;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GameDetail {
    private String romPath;
    private String videoPath;
    private String logoPath;
    private String romName;
    private String gameName;
    private String desc;
    private String romSize;
}
