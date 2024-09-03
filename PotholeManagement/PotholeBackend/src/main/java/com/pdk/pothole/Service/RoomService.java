package com.pdk.pothole.Service;

import java.time.LocalDate;
import org.springframework.web.multipart.MultipartFile;

import com.pdk.pothole.Dto.Response;

import java.util.List;
import java.math.BigDecimal;

public interface RoomService {

    /**
     * Adds a new room to the hotel with the specified details.
     * 
     * @param photo       the photo of the room
     * @param roomType    the type of the room (e.g., single, double, suite)
     * @param roomPrice   the price of the room per night
     * @param description a brief description of the room
     * @return a Response object containing the status and details of the operation
     */
    Response addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String description);

    /**
     * Retrieves a list of all unique room types available in the hotel.
     * 
     * @return a List of Strings representing the room types
     */
    List<String> getAllRoomTypes();

    /**
     * Retrieves a list of all rooms available in the hotel.
     * 
     * @return a Response object containing the status and the list of all rooms
     */
    Response getAllRooms();

    /**
     * Deletes a room from the hotel based on the room ID.
     * 
     * @param roomId the ID of the room to be deleted
     * @return a Response object containing the status of the deletion operation
     */
    Response deleteRoom(Long roomId);

    /**
     * Updates the details of an existing room in the hotel.
     * 
     * @param roomId      the ID of the room to be updated
     * @param description the new description of the room
     * @param roomType    the new type of the room
     * @param roomPrice   the new price of the room per night
     * @param photo       the new photo of the room
     * @return a Response object containing the status and details of the update
     *         operation
     */
    Response updateRoom(Long roomId, String description, String roomType, BigDecimal roomPrice, MultipartFile photo);

    /**
     * Retrieves the details of a specific room based on its ID.
     * 
     * @param roomId the ID of the room to be retrieved
     * @return a Response object containing the status and the details of the room
     */
    Response getRoomById(Long roomId);

    /**
     * Retrieves a list of available rooms based on the specified check-in and
     * check-out dates and room type.
     * 
     * @param checkInDate  the check-in date for room availability
     * @param checkOutDate the check-out date for room availability
     * @param roomType     the type of room to filter availability
     * @return a Response object containing the status and the list of available
     *         rooms
     */
    Response getAvailableRoomsByDataAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType);

    /**
     * Retrieves a list of all available rooms in the hotel.
     * 
     * @return a Response object containing the status and the list of available
     *         rooms
     */
    Response getAllAvailableRooms();
}
