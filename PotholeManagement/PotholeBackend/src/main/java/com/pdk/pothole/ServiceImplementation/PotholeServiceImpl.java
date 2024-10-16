package com.pdk.pothole.ServiceImplementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.MediaType;

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
import java.io.IOException;
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

    private final String FLASK_API_URL = "http://localhost:4000/detect_potholes";

    @Override
    public Response addPotholeByUser(PotholeReportRequest request) throws IOException {
        // public Response addPotholeByUser(PotholeReportRequest request, int
        // potholeCount) throws IOException {
        Response response = new Response();

        // Validate the request image
        if (request.getImage() == null || request.getImage().isEmpty()) {
            response.setMessage("Image file is missing in the request.");
            response.setStatusCode(400); // Bad Request
            return response;
        }

        // Try to upload the image to AWS S3
        String potholeUrl;
        try {
            potholeUrl = awsS3Service.saveImageToS3(request.getImage());
        } catch (Exception e) {
            response.setMessage("Failed to upload image to AWS S3: " + e.getMessage());
            response.setStatusCode(500); // Internal Server Error
            return response;
        }

        // Create the pothole entity
        Pothole pothole = new Pothole();
        pothole.setLatitude(request.getLocation().getLatitude());
        pothole.setLongitude(request.getLocation().getLongitude());
        pothole.setSeverity(determineSeverity(0)); // Set default severity or adjust based on your logic
        pothole.setStatus(Status.REPORTED);
        pothole.setReportedDate(LocalDateTime.now());
        pothole.setUpdatedDate(LocalDateTime.now());
        pothole.setPotholeImage(potholeUrl);
        pothole.setPotholeCount(0); // Set default count or adjust based on your logic

        // Validate and find the user by ID
        Long userId;
        try {
            userId = Long.parseLong(request.getUserId());
        } catch (NumberFormatException e) {
            response.setMessage("Invalid User ID format.");
            response.setStatusCode(400); // Bad Request
            return response;
        }

        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            response.setMessage("User not found.");
            response.setStatusCode(404); // User Not Found
            return response;
        }

        // Save the pothole report
        pothole.setUser(userOptional.get());
        try {
            potholeRepository.save(pothole);
        } catch (Exception e) {
            response.setMessage("Failed to save pothole report: " + e.getMessage());
            response.setStatusCode(500); // Internal Server Error
            return response;
        }

        // Set successful response
        response.setMessage("Pothole reported successfully.");
        response.setStatusCode(200); // OK
        return response;
    }

    private Severity determineSeverity(int potholeCount) {
        if (potholeCount == 0) {
            return Severity.LOW;
        } else if (potholeCount <= 5) {
            return Severity.MODERATE;
        } else {
            return Severity.HIGH;
        }
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

            if (status.equals("FIXED")) {
                existingPothole.setStatus(Status.FIXED);
            } else if (status.equals("UNDER_REVIEW")) {
                existingPothole.setStatus(Status.UNDER_REVIEW);
            } else if (status.equals("IGNORED")) {
                existingPothole.setStatus(Status.IGNORED);
            }
            potholeRepository.save(existingPothole);

            response.setMessage("Pothole status updated to : " + status);
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

/*
 * 
 * public Response addPotholeByUser(PotholeReportRequest request) throws
 * IOException {
 * Response response = new Response();
 * 
 * // Validate the request image
 * if (request.getImage() == null || request.getImage().isEmpty()) {
 * response.setMessage("Image file is missing in the request.");
 * response.setStatusCode(400); // Bad Request
 * return response;
 * }
 * 
 * // Set headers for Flask API
 * HttpHeaders headers = new HttpHeaders();
 * headers.setContentType(MediaType.MULTIPART_FORM_DATA);
 * 
 * // Prepare the body for Flask API using MultiValueMap for multipart/form-data
 * MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
 * body.add("image", new ByteArrayResource(request.getImage().getBytes()) {
 * 
 * @Override
 * public String getFilename() {
 * return request.getImage().getOriginalFilename();
 * }
 * });
 * 
 * HttpEntity<MultiValueMap<String, Object>> requestEntity = new
 * HttpEntity<>(body, headers);
 * 
 * // Try sending the request to the Flask API
 * ResponseEntity<MultiValueMap<String, Object>> responseFromFlask;
 * try {
 * responseFromFlask = restTemplate.exchange(
 * FLASK_API_URL,
 * HttpMethod.POST,
 * requestEntity,
 * new ParameterizedTypeReference<>() {}
 * );
 * } catch (Exception e) {
 * response.setMessage("Error while communicating with Flask API: " +
 * e.getMessage());
 * response.setStatusCode(500); // Internal Server Error
 * return response;
 * }
 * 
 * // Check if the Flask API response was successful
 * if (!responseFromFlask.getStatusCode().is2xxSuccessful()) {
 * response.setMessage("Flask API failed to process the image.");
 * response.setStatusCode(500); // Internal Server Error
 * return response;
 * }
 * 
 * // Ensure the Pothole-Count header is present
 * String potholeCountHeader =
 * responseFromFlask.getHeaders().getFirst("Pothole-Count");
 * if (potholeCountHeader == null) {
 * response.
 * setMessage("Pothole-Count header is missing from Flask API response.");
 * response.setStatusCode(500); // Internal Server Error
 * return response;
 * }
 * 
 * int potholeCount;
 * try {
 * potholeCount = Integer.parseInt(potholeCountHeader);
 * } catch (NumberFormatException e) {
 * response.setMessage("Invalid Pothole-Count value returned from Flask API.");
 * response.setStatusCode(500); // Internal Server Error
 * return response;
 * }
 * 
 * // Try to upload the image to AWS S3
 * String potholeUrl;
 * try {
 * potholeUrl = awsS3Service.saveImageToS3(request.getImage());
 * } catch (Exception e) {
 * response.setMessage("Failed to upload image to AWS S3: " + e.getMessage());
 * response.setStatusCode(500); // Internal Server Error
 * return response;
 * }
 * 
 * // Create the pothole entity
 * Pothole pothole = new Pothole();
 * pothole.setLatitude(request.getLocation().getLatitude());
 * pothole.setLongitude(request.getLocation().getLongitude());
 * pothole.setSeverity(determineSeverity(potholeCount));
 * pothole.setStatus(Status.REPORTED);
 * pothole.setReportedDate(LocalDateTime.now());
 * pothole.setUpdatedDate(LocalDateTime.now());
 * pothole.setPotholeImage(potholeUrl);
 * pothole.setPotholeCount(potholeCount);
 * 
 * // Validate and find the user by ID
 * Long userId;
 * try {
 * userId = Long.parseLong(request.getUserId());
 * } catch (NumberFormatException e) {
 * response.setMessage("Invalid User ID format.");
 * response.setStatusCode(400); // Bad Request
 * return response;
 * }
 * 
 * Optional<User> userOptional = userRepository.findById(userId);
 * if (userOptional.isEmpty()) {
 * response.setMessage("User not found.");
 * response.setStatusCode(404); // User Not Found
 * return response;
 * }
 * 
 * // Save the pothole report
 * pothole.setUser(userOptional.get());
 * try {
 * potholeRepository.save(pothole);
 * } catch (Exception e) {
 * response.setMessage("Failed to save pothole report: " + e.getMessage());
 * response.setStatusCode(500); // Internal Server Error
 * return response;
 * }
 * 
 * // Set successful response
 * response.setMessage("Pothole reported successfully.");
 * response.setStatusCode(200); // OK
 * return response;
 * }
 * 
 */