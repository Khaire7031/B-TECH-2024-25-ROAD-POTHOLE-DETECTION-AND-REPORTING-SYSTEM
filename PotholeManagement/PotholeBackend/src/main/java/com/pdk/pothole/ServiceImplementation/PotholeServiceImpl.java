package com.pdk.pothole.ServiceImplementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.pdk.pothole.Dto.PotholeDto;
import com.pdk.pothole.Dto.PotholeReportRequest;
import com.pdk.pothole.Dto.Response;
import com.pdk.pothole.Entity.Pothole;
import com.pdk.pothole.Entity.Severity;
import com.pdk.pothole.Entity.Status;
import com.pdk.pothole.Entity.User;
import com.pdk.pothole.Repository.PotholeRepository;
import com.pdk.pothole.Repository.UserRepository;
import com.pdk.pothole.Service.PotholeService;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.time.LocalDateTime;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@Service
public class PotholeServiceImpl implements PotholeService {

    @Autowired
    private PotholeRepository potholeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestTemplate restTemplate;

    private String url = "http://localhost:5000";

    @Override
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public Response addPotholeByUser(PotholeReportRequest request) {
        Response response = new Response();

        System.out.println();
        System.out.println("Length of image: " + request.getImage().length());
        System.out.println("Received image data: " + request.getImage());
        System.out.println("Received location data: Latitude: " + request.getLocation().getLatitude() +
                ", Longitude: " + request.getLocation().getLongitude());
        System.out.println("Received userId data: " + request.getUserId());

        System.out.println();

        // Prepare the headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Prepare the body with the image
        Map<String, Object> body = new HashMap<>();
        body.put("image", request.getImage());

        // Wrap it in an HttpEntity
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        // Send POST request to Flask API
        ResponseEntity<Map> response1 = restTemplate.exchange(url + "/upload_image", HttpMethod.POST, entity,
                Map.class);

        // Extract and return the message from the Flask API response
        Map<String, Object> responseBody = response1.getBody();

        System.out.println();
        System.out.println("responseBody : " + responseBody);
        System.out.println();

        return response;
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public String getFlaskStatus() {
        ResponseEntity<Map> response = restTemplate.getForEntity(url + "/status", Map.class);
        Map<String, Object> responseBody = response.getBody();
        return responseBody != null ? (String) responseBody.get("message") : "Error fetching status";
    }

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

    @Override
    public Response addPotholeDetails(Double latitude, Double longitude, MultipartFile potholeImage) {
        Response response = new Response();
        response.setStatusCode(200);
        return response;
    }

}
