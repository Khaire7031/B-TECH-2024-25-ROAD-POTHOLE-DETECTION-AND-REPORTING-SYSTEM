package com.pdk.pothole.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PotholeDto {

    private Double lat;

    private Double lng;

    private String image;

}
