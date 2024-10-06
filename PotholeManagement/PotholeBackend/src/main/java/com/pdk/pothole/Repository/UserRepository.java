package com.pdk.pothole.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pdk.pothole.Entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Check if a user with the given email exists
    boolean existsByEmail(String email);

    // Find a user by their email
    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);

}
