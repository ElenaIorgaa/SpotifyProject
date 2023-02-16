//package com.example.demo;
//
//import com.google.gson.JsonObject;
//import com.google.gson.JsonParser;
//import org.springframework.stereotype.Component;
//
//import java.util.Base64;
//import java.util.Date;
//
//@Component
//public class JwtTokenValidator {
//    private final String secret = "secret";
//
//    public boolean validateToken(String token) {
//        String[] parts = token.split("\\.");
//        Base64.Decoder decoder = Base64.getUrlDecoder();
//        String payload = new String(decoder.decode(parts[1]));
//        System.out.println(payload);
//        JsonObject jsonObject = JsonParser.parseString(payload).getAsJsonObject();
//        long exp = jsonObject.get("exp").getAsLong();
//        Date expiration = new Date(exp * 1000);
//        Date now = new Date();
//        return now.after(expiration);
//    }
//}