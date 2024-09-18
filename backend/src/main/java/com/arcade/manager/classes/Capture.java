package com.arcade.manager.classes;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Capture {
    private String path;
    private String fileSize;
    private String fileName;
}
