package com.smartq;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.smartq.model") // Optional if your entity is not in the same package
@EnableJpaRepositories(basePackages = "com.smartq.repository") // Optional if your repository is not in the same package
public class SmartqBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartqBackendApplication.class, args);
    }
}
