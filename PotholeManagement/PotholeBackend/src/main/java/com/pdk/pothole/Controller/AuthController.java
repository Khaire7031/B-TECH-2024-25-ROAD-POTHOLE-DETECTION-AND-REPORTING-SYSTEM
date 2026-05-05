package com.pdk.pothole.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pdk.pothole.Dto.LoginRequest;
import com.pdk.pothole.Dto.OtpRequest;
import com.pdk.pothole.Dto.Response;
import com.pdk.pothole.Entity.User;
import com.pdk.pothole.Service.EmailService;
import com.pdk.pothole.Service.UserService;
import com.pdk.pothole.ServiceImplementation.OtpService;

import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private OtpService otpService;

    @PostMapping("/register")
    public ResponseEntity<Response> register(@Valid @RequestBody User user) {
        logger.info("Registering user: {}", user.getUsername());
        Response response = userService.register(user);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Response> login(@Valid @RequestBody LoginRequest loginRequest) {
        logger.info("User login attempt: {}", loginRequest.getEmail());
        Response response = userService.login(loginRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/send_email")
    public ResponseEntity<String> sendOtp() {
        emailService.sendEmail("pranav.22110507@viit.ac.in", "Hello Pranav", "Hi from Sharayu.");
        return ResponseEntity.status(200).body("Mail send Successfully");
    }

    @PostMapping("/get_otp")
    public ResponseEntity<Response> sendOtp(@RequestBody OtpRequest otpRequest) {
        Response response = otpService.sendOtp(otpRequest.getEmail());
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // Endpoint to verify OTP
    @PostMapping("/verify_otp")
    public ResponseEntity<Response> verifyOtp(@RequestBody OtpRequest otpRequest) {
        Response response = otpService.verifyOtp(otpRequest.getEmail(), otpRequest.getOtp());
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}
