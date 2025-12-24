package com.example.vintagecar.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String projectRoot = System.getProperty("user.dir");
        String uploadsPath = "file:" + projectRoot + "/src/main/java/com/example/vintagecar/uploads/";

        System.out.println("🌐 Serving static files from: " + uploadsPath);

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(uploadsPath);
    }
}