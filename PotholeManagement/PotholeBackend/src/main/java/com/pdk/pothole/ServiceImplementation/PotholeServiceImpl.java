package com.pdk.pothole.ServiceImplementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pdk.pothole.Dto.PotholeDto;
import com.pdk.pothole.Dto.Response;
import com.pdk.pothole.Entity.Pothole;
import com.pdk.pothole.Entity.Severity;
import com.pdk.pothole.Entity.Status;
import com.pdk.pothole.Entity.User;
import com.pdk.pothole.Repository.PotholeRepository;
import com.pdk.pothole.Repository.UserRepository;
import com.pdk.pothole.Service.PotholeService;
import java.util.List;
import java.time.LocalDateTime;

@Service
public class PotholeServiceImpl implements PotholeService {

    @Autowired
    private PotholeRepository potholeRepository;

    @Autowired
    private UserRepository userRepository;

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

            System.out.println();
            System.out.println();
            System.out.println(newPothole);
            potholeRepository.save(newPothole);
            System.out.println();
            System.out.println();
        }
        Response response = new Response();
        response.setStatusCode(200);
        return response;
    }

    @Override
    public Response addPotholeDetails(Double latitude, Double longitude, MultipartFile potholeImage) {
        System.out.println();
        System.out.println();
        System.out.println(latitude);
        System.out.println(longitude);
        System.out.println(potholeImage);
        System.out.println();
        Response response = new Response();
        response.setStatusCode(200);
        return response;
    }

}
