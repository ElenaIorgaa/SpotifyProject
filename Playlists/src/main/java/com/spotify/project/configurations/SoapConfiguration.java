package com.spotify.project.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ws.client.core.WebServiceTemplate;

@Configuration
public class SoapConfiguration {
    @Bean
    public WebServiceTemplate webServiceTemplate() {
        return new WebServiceTemplate();
    }
}
