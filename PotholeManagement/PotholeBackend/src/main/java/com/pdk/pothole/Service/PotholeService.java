package com.pdk.pothole.Service;

import com.pdk.pothole.Dto.PotholeDto;
import com.pdk.pothole.Dto.PotholeReportRequest;
import com.pdk.pothole.Dto.Response;
import com.pdk.pothole.Entity.Pothole;

import java.util.List;

public interface PotholeService {

    Response addPotholeList(List<PotholeDto> potholeDto);

    Response addPotholeByUser(PotholeReportRequest request);

    String getFlaskStatus();

    List<Pothole> getAllPothole();
}