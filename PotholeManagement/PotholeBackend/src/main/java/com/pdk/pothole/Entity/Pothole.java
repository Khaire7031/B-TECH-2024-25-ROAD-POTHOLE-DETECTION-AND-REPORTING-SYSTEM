package com.pdk.pothole.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "potholes")
public class Pothole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pothole_id")
    private Long potholeId;

    // Latitude for the location
    @Column(name = "latitude", nullable = false)
    private Double latitude;

    // Longitude for the location
    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @Enumerated(EnumType.STRING)
    @Column(name = "severity", nullable = false)
    private Severity severity;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @Column(name = "reported_date", nullable = false)
    private LocalDateTime reportedDate;

    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @Column(name = "image_url")
    private String potholeImage;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
