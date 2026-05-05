package com.pdk.pothole.Service;

import com.pdk.pothole.Dto.PotholeDto;
import com.pdk.pothole.Dto.PotholeReportRequest;
import com.pdk.pothole.Dto.Response;
import com.pdk.pothole.Entity.Pothole;

import java.io.IOException;
import java.util.List;

public interface PotholeService {

    Response addPotholeList(List<PotholeDto> potholeDto);

    Response addPotholeByUser(PotholeReportRequest request) throws IOException;
    // Response addPotholeByUser(PotholeReportRequest request, int potholeCount)
    // throws IOException;

    String getFlaskStatus();

    List<Pothole> getAllPothole();

    Response deletePothole(Long potholeId);

    Response updateStatus(Long potholeId, String status);
}