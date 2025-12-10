package com.eduprajna;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.eduprajna.entity.User;
import com.eduprajna.service.UserService;

@SpringBootApplication
public class AviraUdupuApplication {
	
	private static final Logger logger = LoggerFactory.getLogger(AviraUdupuApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(AviraUdupuApplication.class, args);
	}
	
	@Bean
	public CommandLineRunner initDatabase(UserService userService) {
		return args -> {
			// Auto-create admin user if it doesn't exist
			if (userService.findByEmail("admin@gmail.com").isEmpty()) {
				logger.info("Creating default admin user...");
				User admin = new User();
				admin.setEmail("admin@gmail.com");
				admin.setName("Admin User");
				admin.setPasswordHash("Admin@123");
				admin.setRole("admin");
				admin.setPhone("0000000000");
				admin.setIsActive(true);
				admin.setLoyaltyPoints(0);
				admin.setTotalOrders(0);
				userService.save(admin);
				logger.info("Default admin user created successfully!");
			} else {
				logger.info("Admin user already exists.");
			}
		};
	}

}
