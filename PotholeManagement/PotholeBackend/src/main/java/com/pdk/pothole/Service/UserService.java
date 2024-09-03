package com.pdk.pothole.Service;

import com.pdk.pothole.Dto.LoginRequest;
import com.pdk.pothole.Dto.Response;
import com.pdk.pothole.Entity.User;

public interface UserService {

    Response register(User user);

    Response login(LoginRequest loginRequest);

}
