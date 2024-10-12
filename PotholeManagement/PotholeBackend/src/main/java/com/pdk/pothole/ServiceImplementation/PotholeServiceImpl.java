package com.pdk.pothole.ServiceImplementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.pdk.pothole.Dto.PotholeDto;
import com.pdk.pothole.Dto.PotholeReportRequest;
import com.pdk.pothole.Dto.Response;
import com.pdk.pothole.Entity.Pothole;
import com.pdk.pothole.Entity.Severity;
import com.pdk.pothole.Entity.Status;
import com.pdk.pothole.Entity.User;
import com.pdk.pothole.Repository.PotholeRepository;
import com.pdk.pothole.Repository.UserRepository;
import com.pdk.pothole.Service.AwsS3Service;
import com.pdk.pothole.Service.PotholeService;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.time.LocalDateTime;
import org.springframework.http.ResponseEntity;

@Service
public class PotholeServiceImpl implements PotholeService {

    @Autowired
    private PotholeRepository potholeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private AwsS3Service awsS3Service;

    private String url = "http://localhost:5000";

    @Override
    public Response addPotholeByUser(PotholeReportRequest request) {
        Response response = new Response();
        // Cheack Pothole is present or not

        String potholeUrl = awsS3Service.saveImageToS3(request.getImage());

        Pothole pothole = new Pothole();

        pothole.setLatitude(request.getLocation().getLatitude());
        pothole.setLongitude(request.getLocation().getLongitude());
        pothole.setSeverity(Severity.HIGH);
        pothole.setReportedDate(LocalDateTime.now());
        pothole.setStatus(Status.REPORTED);

        // Add Random
        pothole.setPercentage((int) (Math.random() * 81) + 20);

        pothole.setUpdatedDate(LocalDateTime.now());
        pothole.setPotholeImage(potholeUrl);

        Optional<User> user = userRepository.findById(Long.parseLong(request.getUserId()));

        if (user.isPresent()) {
            pothole.setUser(user.get());
        }

        potholeRepository.save(pothole);

        response.setMessage("Pothole reported successfully at s3 !");
        response.setStatusCode(200);

        return response;
    }

    // Get All Pothole
    @Override
    public List<Pothole> getAllPothole() {
        List<Pothole> potholesList = potholeRepository.findAll();
        return potholesList;
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public String getFlaskStatus() {
        ResponseEntity<Map> response = restTemplate.getForEntity(url + "/status", Map.class);
        Map<String, Object> responseBody = response.getBody();
        return responseBody != null ? (String) responseBody.get("message") : "Error fetching status";
    }

    // Add pothole List
    @Override
    public Response addPotholeList(List<PotholeDto> potholes) {
        User user = userRepository.findById((long) 4).orElse(null);
        for (PotholeDto pothole : potholes) {

            Pothole newPothole = new Pothole();

            newPothole.setLatitude(pothole.getLat());
            newPothole.setLongitude(pothole.getLng());
            newPothole.setSeverity(Severity.MODERATE);
            newPothole.setStatus(Status.REPORTED);
            newPothole.setReportedDate(LocalDateTime.now());
            newPothole.setUpdatedDate(LocalDateTime.now());
            newPothole.setPotholeImage(pothole.getImage());
            newPothole.setUser(user);

            potholeRepository.save(newPothole);

        }
        Response response = new Response();
        response.setStatusCode(200);
        return response;
    }

    public void printData(PotholeReportRequest request) {
        System.out.println();
        // System.out.println("Length of image: " + request.getImage().length());
        System.out.println("Received image data: " + request.getImage());
        System.out.println("Latitude: " + request.getLocation().getLatitude() + ", Longitude: "
                + request.getLocation().getLongitude());
        System.out.println("Received userId data: " + request.getUserId());
        System.out.println();
    }

    public Response deletePothole(Long potholeId) {
        Optional<Pothole> pothole = potholeRepository.findById(potholeId);
        Response response = new Response();

        if (pothole.isPresent()) {
            potholeRepository.delete(pothole.get());
            response.setMessage("Pothole deleted successfully");
            response.setStatusCode(200);
        } else {
            response.setMessage("Pothole not found");
            response.setStatusCode(404);
        }
        return response;
    }

    public Response updateStatus(Long potholeId, String status) {
        // Find the pothole by ID
        Optional<Pothole> pothole = potholeRepository.findById(potholeId);
        Response response = new Response();

        if (pothole.isPresent()) {
            // Update the status of the pothole if found
            Pothole existingPothole = pothole.get();

            existingPothole.setStatus(Status.FIXED);
            potholeRepository.save(existingPothole);

            response.setMessage("Pothole status updated to: " + status);
            response.setStatusCode(200);
        } else {
            // Return a response if the pothole was not found
            response.setMessage("Pothole not found");
            response.setStatusCode(404);
        }

        return response;
    }

}

// public Response addPotholeByUser(PotholeReportRequest request) {
// // Prepare the headers
// // HttpHeaders headers = new HttpHeaders();
// // headers.setContentType(MediaType.APPLICATION_JSON);

// // // Prepare the body with the image
// // Map<String, Object> body = new HashMap<>();
// // body.put("image", request.getImage());

// // // Wrap it in an HttpEntity
// // HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

// // // Send POST request to Flask API
// // ResponseEntity<Map> flaskResponce = restTemplate.exchange(url +
// // "/upload_image", HttpMethod.POST, entity,
// // Map.class);

// // // Extract and return the message from the Flask API response
// // Map<String, Object> responseBody = flaskResponce.getBody();

// // System.out.println();
// // System.out.println("responseBody : " + responseBody);
// // System.out.println();

// Pothole pothole = new Pothole();

// pothole.setLatitude(request.getLocation().getLatitude());
// pothole.setLongitude(request.getLocation().getLongitude());
// pothole.setSeverity(Severity.HIGH);
// pothole.setReportedDate(LocalDateTime.now());
// pothole.setStatus(Status.REPORTED);
// pothole.setUpdatedDate(LocalDateTime.now());
// // pothole.setPotholeImage(request.getImage());

// Optional<User> user =
// userRepository.findById(Long.parseLong(request.getUserId()));

// if (user.isPresent()) {
// pothole.setUser(user.get());
// }

// potholeRepository.save(pothole);

// Response response = new Response();

// response.setMessage("Pothole reported successfully!");
// response.setStatusCode(200);

// System.out.println();
// System.out.println();
// System.out.println(pothole);
// System.out.println(response);
// System.out.println();
// System.out.println();
// return response;
// }