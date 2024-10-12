package com.pdk.pothole.Service;

import com.pdk.pothole.Dto.LoginRequest;
import com.pdk.pothole.Dto.Response;
import com.pdk.pothole.Entity.User;
import java.util.List;

public interface UserService {

    Response register(User user);

    Response login(LoginRequest loginRequest);

    List<User> getAllUsers();
}
