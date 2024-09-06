package com.pdk.pothole.Dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.pdk.pothole.Entity.User;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PotholeResponce {

    private int statusCode;

    private String message;

    private String token;

    private String expirationTime;

    private User user;
}
