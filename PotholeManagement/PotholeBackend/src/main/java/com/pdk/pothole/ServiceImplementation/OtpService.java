package com.pdk.pothole.ServiceImplementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pdk.pothole.Dto.Response;
import com.pdk.pothole.Service.EmailService;

import java.security.SecureRandom;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Service
public class OtpService {

    @Autowired
    private EmailService emailService;

    // private static final int OTP_LENGTH = 6;
    private static final SecureRandom random = new SecureRandom();
    private Map<String, OtpDetails> otpStorage = new ConcurrentHashMap<>();
    private static final long OTP_EXPIRATION_TIME = TimeUnit.MINUTES.toMillis(5);

    public Response sendOtp(String email) {
        String otp = generateOtp(email);
        emailService.sendOtpEmail(email, otp);
        Response response = new Response();
        response.setStatusCode(200);
        response.setMessage("Email Send Successfully");
        return response;
    }

    public String generateOtp(String email) {
        String otp = String.valueOf(100000 + random.nextInt(900000));
        otpStorage.put(email, new OtpDetails(otp, System.currentTimeMillis() + OTP_EXPIRATION_TIME));
        return otp;
    }

    public Response verifyOtp(String email, String otp) {
        OtpDetails details = otpStorage.get(email);
        Response response = new Response();

        if (details != null && details.getOtp().equals(otp) && System.currentTimeMillis() < details.getExpiryTime()) {
            otpStorage.remove(email);
            response.setMessage("Otp verified successfully");
            response.setStatusCode(200);
        } else {
            response.setMessage("Invalid OTP / OTP expired");
            response.setStatusCode(500);
        }
        return response;
    }

    private static class OtpDetails {
        private String otp;
        private long expiryTime;

        public OtpDetails(String otp, long expiryTime) {
            this.otp = otp;
            this.expiryTime = expiryTime;
        }

        public String getOtp() {
            return otp;
        }

        public long getExpiryTime() {
            return expiryTime;
        }
    }
}
