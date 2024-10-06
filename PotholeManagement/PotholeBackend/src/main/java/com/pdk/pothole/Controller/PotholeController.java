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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pdk.pothole.Dto.Location;
import com.pdk.pothole.Dto.PotholeDto;
import com.pdk.pothole.Dto.PotholeReportRequest;
import com.pdk.pothole.Dto.Response;
import com.pdk.pothole.Entity.Pothole;

import java.util.List;
import com.pdk.pothole.Service.PotholeService;

import io.jsonwebtoken.io.IOException;

@CrossOrigin
@RestController
@RequestMapping("/pothole")
public class PotholeController {

    @Autowired
    private PotholeService potholeService;

    // @GetMapping("/all")
    // @PreAuthorize("hasAuthority('ADMIN')")
    // public ResponseEntity<Response> getAllUsers() {
    // Response response = new Response();
    // return ResponseEntity.status(response.getStatusCode()).body(response);
    // }

    /**
     * Reports a pothole submitted by the user.
     *
     * @param request the details of the pothole report
     * @return ResponseEntity containing the response message and status code
     */
    // @PostMapping("/report-pothole")
    // public ResponseEntity<Response> submitPothole(
    // @RequestBody PotholeReportRequest request) {
    // Response response = potholeService.addPotholeByUser(request);
    // return ResponseEntity.status(response.getStatusCode()).body(response);
    // }

    @PostMapping("/")
    public ResponseEntity<Response> appStatus(@RequestBody Pothole pothole) {
        Response response = new Response();
        response.setMessage("Springboot Start Successfully");
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/report-pothole")
    public ResponseEntity<Response> submitPothole(
            @RequestParam("image") MultipartFile image,
            @RequestParam("location") String location, // Expecting a JSON string
            @RequestParam("userId") String userId) throws JsonMappingException, JsonProcessingException {

        // Parse the JSON location string into a Location object
        Location parsedLocation = parseLocation(location);
        PotholeReportRequest request = new PotholeReportRequest(image, parsedLocation, userId);

        Response response = potholeService.addPotholeByUser(request);

        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

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

    /**
     * Retrieves the status of the Flask application.
     * 
     * @return ResponseEntity containing the status message
     */
    @GetMapping("/flask-status")
    public ResponseEntity<String> getFlaskStatus() {
        String statusMessage = potholeService.getFlaskStatus();
        return ResponseEntity.ok(statusMessage);
    }

    // For Practice Purpose to add Multiple Pothole at same time
    @PostMapping("/add_pothole")
    public ResponseEntity<Response> addPotholeList(@RequestBody List<PotholeDto> potholes) {
        Response response = potholeService.addPotholeList(potholes);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}
