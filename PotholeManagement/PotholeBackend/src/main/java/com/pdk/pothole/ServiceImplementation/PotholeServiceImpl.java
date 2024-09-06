package com.pdk.pothole.ServiceImplementation;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pdk.pothole.Dto.Response;
import com.pdk.pothole.Service.PotholeService;

@Service
public class PotholeServiceImpl implements PotholeService {

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
