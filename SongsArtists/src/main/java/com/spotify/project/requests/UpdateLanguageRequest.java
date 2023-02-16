package com.spotify.project.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateLanguageRequest {
    @JsonProperty("id")
    @NotNull
    Integer id;
    @JsonProperty("language")
    @NotNull
    String language;
}
