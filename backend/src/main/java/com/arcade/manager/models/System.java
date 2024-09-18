package com.arcade.manager.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data

@AllArgsConstructor
@NoArgsConstructor
public class System {

    private Integer id;
    @JsonProperty("system_label")
    private String systemLabel;

    @JsonProperty("system_name")
    private String systemName;

    @JsonProperty("work_path")
    private String workPath;

    @JsonProperty("rom_path")
    private String romPath;

    @JsonProperty("video_path")
    private String videoPath;

    @JsonProperty("logo_path")
    private String logoPath;

    @JsonProperty("cfg_path")
    private String cfgPath;

    @JsonProperty("executable_path")
    private String executablePath;
}
