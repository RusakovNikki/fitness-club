package com.example.demoauth.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TestController {

	@GetMapping("/all")
	public String allAccess() {
		return "public API";
	}

	@GetMapping("/user")
	@PreAuthorize("hasRole('USER') or hasRole('TRAINER') or hasRole('ADMIN')")
	public String userAccess() {
		return "user API";
	}

	@GetMapping("/trainer")
	@PreAuthorize("hasRole('TRAINER') or hasRole('ADMIN')")
	public String trainerAccess() {
		return "trainer API";
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminAccess() {
		return "admin API";
	}
}
