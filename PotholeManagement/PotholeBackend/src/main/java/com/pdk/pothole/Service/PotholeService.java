package com.pdk.pothole.Service;

import org.springframework.web.multipart.MultipartFile;

import com.pdk.pothole.Dto.PotholeDto;
import com.pdk.pothole.Dto.PotholeReportRequest;
import com.pdk.pothole.Dto.Response;
import java.util.List;

public interface PotholeService {

    Response addPotholeDetails(Double latitude, Double longitude, MultipartFile potholeImage);

    Response addPotholeList(List<PotholeDto> potholeDto);

    Response addPotholeByUser(PotholeReportRequest request);

    String getFlaskStatus();
}