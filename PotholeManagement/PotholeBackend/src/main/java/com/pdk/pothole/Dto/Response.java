package com.pdk.pothole.Dto;

import lombok.Data;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.pdk.pothole.Entity.User;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {

    private int statusCode;

    private String message;

    private String token;

    private String role;

    private String expirationTime;

    private User user;

    private List<UserDto> userList;

    private String opt;

}
