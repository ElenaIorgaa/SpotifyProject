package com.spotify.project.components.authorize;


import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.stereotype.Component;

import java.util.Base64;


@Component
public class AuthorizeComponent {
    public Boolean authorize(String token, String role)  {
        String[] parts = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();
        String payload = new String(decoder.decode(parts[1]));
        System.out.println(payload);
        JsonObject jsonObject = JsonParser.parseString(payload).getAsJsonObject();
        System.out.println(jsonObject.get("role"));
        return jsonObject.get("role").toString().contains(role);
    }
}
