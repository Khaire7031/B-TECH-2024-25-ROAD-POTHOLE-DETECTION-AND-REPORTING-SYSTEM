package com.pdk.pothole.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PotholeReportRequest {
    private String image;
    private Location location;
    private String userId;
}
