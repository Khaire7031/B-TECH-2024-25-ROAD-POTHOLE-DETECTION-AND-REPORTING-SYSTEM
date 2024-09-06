package com.pdk.pothole.Service;

import org.springframework.web.multipart.MultipartFile;

import com.pdk.pothole.Dto.Response;

public interface PotholeService {

    Response addPotholeDetails(Double latitude, Double longitude, MultipartFile potholeImage);
}