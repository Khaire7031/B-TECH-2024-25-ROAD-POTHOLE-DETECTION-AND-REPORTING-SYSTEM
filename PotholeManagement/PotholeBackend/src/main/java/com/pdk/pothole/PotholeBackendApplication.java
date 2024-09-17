package com.pdk.pothole;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PotholeBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(PotholeBackendApplication.class, args);
		System.out.println("---------------------------------");
		System.out.println("|	 Pothole Management  	|");
		System.out.println("---------------------------------");
	}
}
