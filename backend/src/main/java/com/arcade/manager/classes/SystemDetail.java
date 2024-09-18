package com.arcade.manager.classes;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SystemDetail {
    private Integer idSystem;
    private String systemlabel;
    private List<GameDetail> romList;
    private List<GameDetail> logoList;
    private List<GameDetail> videoList;
    private Integer logosCount;
    private Integer videosCount;
    private Integer romsCount;

}
