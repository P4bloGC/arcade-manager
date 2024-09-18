package com.arcade.manager.classes;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class TelegramMessage {
    @JsonProperty("message_id")
    private Integer messageId;

    @JsonProperty("document")
    private TelegramDocument document;
}
