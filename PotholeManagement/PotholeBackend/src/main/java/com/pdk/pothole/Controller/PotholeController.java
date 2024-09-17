package com.pdk.pothole.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pdk.pothole.Dto.PotholeDto;
import com.pdk.pothole.Dto.Response;
import java.util.List;
import com.pdk.pothole.Service.PotholeService;

@CrossOrigin
@RestController
@RequestMapping("/pothole")
public class PotholeController {

    @Autowired
    private PotholeService potholeService;

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> getAllUsers() {
        Response response = null;
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // Its Working but admin autority is remaining
    @PostMapping("/add")
    public ResponseEntity<Response> addPothole(
            @RequestParam("latitude") Double latitude,
            @RequestParam("longitude") Double longitude,
            @RequestParam("potholeImage") MultipartFile potholeImage) {
        Response response = potholeService.addPotholeDetails(latitude, longitude, potholeImage);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/add_pothole")
    public ResponseEntity<Response> addPotholeList(@RequestBody List<PotholeDto> potholes) {
        Response response = potholeService.addPotholeList(potholes);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}
