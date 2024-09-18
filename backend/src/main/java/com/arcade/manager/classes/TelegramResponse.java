package com.arcade.manager.classes;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.List;

@Data
public class TelegramResponse {
    private boolean ok;
    private List<TelegramUpdate> result;
}
