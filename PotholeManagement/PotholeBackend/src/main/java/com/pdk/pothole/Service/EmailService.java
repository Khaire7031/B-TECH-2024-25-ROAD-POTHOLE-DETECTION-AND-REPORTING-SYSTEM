package com.pdk.pothole.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(String to, String subject, String htmlContent) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            System.out.println("Exception while sendEmail: " + e);
        }
    }

    public void sendOtpEmail(String to, String otp) {
        // Create HTML content for OTP email
        String htmlContent = "<html>" +
                "<body>" +
                "<h1>Your OTP Code</h1>" +
                "<p>Your OTP code is: <strong>" + otp + "</strong></p>" +
                "<p>It will expire in 5 minutes.</p>" +
                "</body>" +
                "</html>";

        sendEmail(to, "Your OTP Code", htmlContent);
    }
}
