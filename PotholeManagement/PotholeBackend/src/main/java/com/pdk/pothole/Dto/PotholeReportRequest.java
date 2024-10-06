package com.pdk.pothole.Dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PotholeReportRequest {
    private MultipartFile image;
    private Location location;
    private String userId;
}
