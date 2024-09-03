package com.pdk.pothole.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pdk.pothole.Dto.LoginRequest;
import com.pdk.pothole.Dto.Response;
import com.pdk.pothole.Entity.User;
import com.pdk.pothole.Exception.OwnException;
import com.pdk.pothole.Repository.UserRepository;
import com.pdk.pothole.Service.UserService;
import com.pdk.pothole.Utils.JWTUtils;

@Service
public class UserServiceImpl implements UserService {

    // Injecting dependencies
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    // Register a new user
    @Override
    public Response register(User user) {
        Response response = new Response();

        try {
            // Set default role if not provided
            if (user.getRole() == null || user.getRole().isBlank()) {
                user.setRole("USER");
            }
            // Check if the email is already registered
            if (userRepository.existsByEmail(user.getEmail())) {
                throw new OwnException(user.getEmail() + " Already Exists");
            }
            // Encode the user's password and save the user
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);
            response.setStatusCode(200);
            response.setUser(savedUser);
        } catch (OwnException e) {
            // Handle custom exceptions
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            // Handle general exceptions
            response.setStatusCode(500);
            response.setMessage("Error Occurred During User Registration " + e.getMessage());
        }
        return response;
    }

    // Authenticate and login a user
    @Override
    public Response login(LoginRequest loginRequest) {
        Response response = new Response();

        try {
            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            var user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new OwnException("User Not found"));

            // Generate a JWT token
            var token = jwtUtils.generateToken(user);
            response.setStatusCode(200);
            response.setToken(token);
            response.setRole(user.getRole());
            response.setExpirationTime("7 Days");
            response.setMessage("successful");

        } catch (OwnException e) {
            // Handle custom exceptions
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {
            // Handle general exceptions
            response.setStatusCode(500);
            response.setMessage("Error Occurred During User Login " + e.getMessage());
        }
        return response;
    }
}
