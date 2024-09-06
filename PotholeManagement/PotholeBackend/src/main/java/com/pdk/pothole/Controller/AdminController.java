package com.pdk.pothole.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pdk.pothole.Dto.Response;

@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {

    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> getAllUsers() {
        Response response = null;
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
