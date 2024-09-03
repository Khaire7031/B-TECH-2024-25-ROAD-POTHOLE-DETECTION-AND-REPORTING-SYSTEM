package com.pdk.pothole.Utils;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;
import com.pdk.pothole.Dto.UserDto;
import com.pdk.pothole.Entity.User;

public class Utils {

    // String containing alphanumeric characters for generating random codes
    private static final String ALPHANUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    // SecureRandom instance for generating random values
    private static final SecureRandom secureRandom = new SecureRandom();

    /**
     * Generates a random alphanumeric confirmation code of the specified length.
     * 
     * @param length the length of the confirmation code
     * @return a random alphanumeric confirmation code
     */
    public static String generateRandomConfirmationCode(int length) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(ALPHANUMERIC_STRING.length());
            char randomChar = ALPHANUMERIC_STRING.charAt(randomIndex);
            stringBuilder.append(randomChar);
        }
        return stringBuilder.toString();
    }

    /**
     * Maps a User entity to a UserDto.
     * 
     * @param user the User entity
     * @return the corresponding UserDto
     */
    public static UserDto mapUserEntityToUserDTO(User user) {
        UserDto userDTO = new UserDto();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole());
        return userDTO;
    }

    /**
     * Maps a list of User entities to a list of UserDto.
     * 
     * @param userList the list of User entities
     * @return the corresponding list of UserDto
     */
    public static List<UserDto> mapUserListEntityToUserListDTO(List<User> userList) {
        return userList.stream().map(Utils::mapUserEntityToUserDTO).collect(Collectors.toList());
    }

}
