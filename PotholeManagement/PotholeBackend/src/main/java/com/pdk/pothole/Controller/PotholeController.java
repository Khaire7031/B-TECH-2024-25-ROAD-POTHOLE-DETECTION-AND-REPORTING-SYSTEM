package com.pdk.pothole.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pdk.pothole.Dto.Location;
import com.pdk.pothole.Dto.PotholeDto;
import com.pdk.pothole.Dto.PotholeReportRequest;
import com.pdk.pothole.Dto.Response;
import com.pdk.pothole.Entity.Pothole;
import com.pdk.pothole.Entity.User;

import java.util.List;
import java.util.Map;

import com.pdk.pothole.Service.PotholeService;
import com.pdk.pothole.Service.UserService;

import io.jsonwebtoken.io.IOException;

@CrossOrigin
@RestController
@RequestMapping("/pothole")
public class PotholeController {

    @Autowired
    private PotholeService potholeService;

    @Autowired
    private UserService userService;

    // @GetMapping("/all")
    // @PreAuthorize("hasAuthority('ADMIN')")
    // public ResponseEntity<Response> getAllUsers() {
    // Response response = new Response();
    // return ResponseEntity.status(response.getStatusCode()).body(response);
    // }

    @PostMapping("/")
    public ResponseEntity<Response> appStatus(@RequestBody Pothole pothole) {
        Response response = new Response();
        response.setMessage("Springboot Start Successfully");
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // Original Method
    @PostMapping("/report-pothole")
    public ResponseEntity<Response> submitPothole(
            @RequestParam("image") MultipartFile image,
            @RequestParam("location") String location, // Expecting a JSON string
            @RequestParam("userId") String userId) throws java.io.IOException {

        // Parse the JSON location string into a Location object
        Location parsedLocation = parseLocation(location);
        PotholeReportRequest request = new PotholeReportRequest(image,
                parsedLocation, userId);

        Response response = potholeService.addPotholeByUser(request);

        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // Testing Method
    // @PostMapping("/report-pothole")
    // public ResponseEntity<Response> submitPothole(
    // @RequestParam("image") MultipartFile image,
    // @RequestParam("location") String location, // Expecting a JSON string
    // @RequestParam("userId") String userId,
    // @RequestParam("potholeCount") Integer potholeCount) throws
    // java.io.IOException {

    // // Parse the JSON location string into a Location object
    // Location parsedLocation = parseLocation(location);
    // PotholeReportRequest request = new PotholeReportRequest(image,
    // parsedLocation, userId);

    // Response response = potholeService.addPotholeByUser(request, potholeCount);

    // return ResponseEntity.status(response.getStatusCode()).body(response);
    // }

    private Location parseLocation(String locationString) throws JsonMappingException, JsonProcessingException {
        // Use ObjectMapper from Jackson to deserialize JSON to Location
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(locationString, Location.class);
        } catch (IOException e) {
            throw new RuntimeException("Failed to parse location data", e);
        }
    }

    // Get All Potholes
    @GetMapping("/all")
    public ResponseEntity<List<Pothole>> getAllPothole() {
        List<Pothole> potholesList = potholeService.getAllPothole();
        return ResponseEntity.status(200).body(potholesList);
    }

    @GetMapping("/all/users")
    public ResponseEntity<List<User>> getFlaskStatus() {
        List<User> userList = userService.getAllUsers();
        return ResponseEntity.status(200).body(userList);
    }

    // For Practice Purpose to add Multiple Pothole at same time

    @GetMapping("/all/user")
    public ResponseEntity<List<User>> getAllUser() {
        List<User> userList = userService.getAllUsers();
        return ResponseEntity.status(200).body(userList);
    }

    @PostMapping("/delete/{potholeId}")
    public ResponseEntity<Response> deletePothole(@PathVariable("potholeId") long potholeId) {
        Response response = potholeService.deletePothole(potholeId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/update-status/{potholeId}")
    public ResponseEntity<Response> updatePotholeStatus(
            @PathVariable("potholeId") Long potholeId,
            @RequestBody String status) {
        Response response = potholeService.updateStatus(potholeId, status);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}
