package com.spotify.project.components.authorize;


import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Base64;
import com.google.gson.JsonParser;
import com.google.gson.JsonObject;


@Component
public class AuthorizeComponent {
    public Boolean authorize(String token, String role)  {
        String[] parts = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();
        String payload = new String(decoder.decode(parts[1]));
        JsonObject jsonObject = JsonParser.parseString(payload).getAsJsonObject();
        return jsonObject.get("role").toString().contains(role);
    }
}
