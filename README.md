
# Road Pothole Detection and Reporting System

The **Road Pothole Detection and Reporting System** is an innovative solution designed to enhance road safety and streamline maintenance by detecting potholes in real time and integrating the findings into navigation platforms.

## Features

- **Real-Time Pothole Detection**: Uses advanced machine learning and image processing techniques.
- **Navigation Integration**: Suggests alternate routes to avoid pothole-affected areas.
- **Data Analytics**: Provides insights for road maintenance and management.
- **Cloud Integration**: Leverages AWS services for scalability and reliability.



## Tech Stack

**Client:**  
- React (HTML, CSS, JavaScript)

**Server:**  
- Java 17 or higher  
- Python 3.9+ (Flask for machine learning and backend integration)

**Database:**  
- MySQL (for data storage and management)

**Cloud Services:**  
- AWS Elastic Beanstalk (for backend deployment)  
- AWS RDS (Managed database service for MySQL)  
- AWS Amplify (for hosting the frontend)

**Machine Learning:**  
- **Convolutional Neural Networks (CNN):** Used for image classification and feature extraction.  
- **YOLO (You Only Look Once):** Real-time object detection algorithm used for detecting objects in images and videos.  
- **Flask:** A lightweight Python web framework used for deploying machine learning models.

**Version Control:**  
- Git, GitHub

**Other Tools:**  
- Postman (for API testing)  
- Vite (for bundling)  
- ESLint (for linting)




## Deployment
### React

1. Clone the repository:
   ```bash
   git clone https://github.com/Khaire7031/B-Tech-2024-Pothole
   cd PotholeManagement

2. Navigate to the pothole-management-system folder:

```bash
cd pothole-management-system
```

3. Install the required dependencies:

```bash
npm install
```
4. Start the React development server:
```bash
npm run dev
```
5. Access the application in your browser at:
```bash
Local: http://localhost:5173/
Network: Use the provided network URLs, e.g., http://192.168.0.105:5173/.
```
4. Start the React development server:
```bash
  npm run dev
```

### Spring Boot

2. Navigate to the PotholeBackend folder:

```bash
cd PotholeBackend
```

3.Configure the application properties:

```bash
Open src/main/resources/application.properties
Update the database connection details (e.g., MySQL)

spring.datasource.url=jdbc:mysql://localhost:3306/pothole_db
spring.datasource.username=your-username
spring.datasource.password=your-password
spring.jpa.hibernate.ddl-auto=update

```
4. Build the project:
```bash
Use Vs-Code To Start The server
```

## Screenshots

| Screenshot | Description |
|------------|-------------|
| ![Screenshot (228)](https://github.com/user-attachments/assets/9c36b526-727b-44ad-b9fe-49eff17b6936) | Home Page |
| ![Screenshot (229)](https://github.com/user-attachments/assets/7e4a716a-ce31-4b8a-a276-857c694ee6a2) | Road Sgements |
| ![Screenshot (230)](https://github.com/user-attachments/assets/a31e8495-02c2-4793-8bce-a5276c7921a3) | All Pothole Locations |
| ![Screenshot (231)](https://github.com/user-attachments/assets/2d75f837-8cdd-4da9-a82a-0446bec1b60d) | No Pothole are in 50M range that's Why it is in Green color |
| ![Screenshot (232)](https://github.com/user-attachments/assets/b7e3d4a1-7601-4a1d-9301-49d112bb57f8) | Pothole is in 50M range that's Why it is in Red color |
| ![Screenshot (238)](https://github.com/user-attachments/assets/495501c9-93f3-45bb-ba91-81b45ebc7c3c) | While Travelling |
| ![Screenshot (243)](https://github.com/user-attachments/assets/3edf0f76-332e-4089-b5ad-9e606c1aca53) | Admin Dashboard |
| ![Screenshot (244)](https://github.com/user-attachments/assets/6624dcf1-6315-47c3-b27b-06a45752b207) | Pothole Data |
| ![Screenshot (245)](https://github.com/user-attachments/assets/3b6254ba-6295-48e3-ad77-e75c26e104a8) | Single Pothole Location When we click on "View On Map" |




## Demo
You can access the file by clicking the link below:

[View the File on Google Drive](https://drive.google.com/file/d/1jrn7okdW98Iro2vEkxm9cvSXRYzklbKy/view?usp=sharing)


## 🚀 About Me
I'm a full stack developer at Vishwakarma Institute of Technology, Pune currently pursuing B. Tech in Information technology. Being a computer passionate, find myself highly interested in domains of Web development, Application development. 

In addition, I have worked on projects involving machine-learning as well as web development and I love to exploring various fields through projects.
I have faith in "Consistently Learning" and always keep a learning attitude towards new thing/technologies. My aim is to enhance the skills I learned so far and always be a faithful to my work.
## 🔗 Links
[![Portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://khairepranav.onrender.com/)
[![LinkedIn](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pranav-khaire-java-developer/)
[![Instagram](https://img.shields.io/badge/instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/pranav_khaire_70/)
[![GitHub](https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Khaire7031)
[![Resume](https://img.shields.io/badge/resume-000000?style=for-the-badge&logo=resume&logoColor=white)](https://example.com/your-resume-link)  



## License

[MIT](https://choosealicense.com/licenses/mit/)


## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)
[![Spring Boot](https://img.shields.io/badge/spring%20boot-2.7.0-brightgreen.svg)](https://spring.io/projects/spring-boot)  [![MySQL](https://img.shields.io/badge/mysql-%3E=8.0-blue.svg)](https://www.mysql.com/)  [![Deployed on AWS](https://img.shields.io/badge/deployed-AWS-orange.svg)](https://aws.amazon.com/)  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Khaire7031/B-Tech-2024-Pothole/pulls)  [![Made with Love](https://img.shields.io/badge/made%20with-love-red.svg)](https://github.com/Khaire7031/)  
### Acknowledgements

- This project was inspired by the growing need for improved road safety and maintenance solutions.
- Special thanks to the open-source communities of Spring Boot, React, MySQL, and AWS for their valuable contributions to the development process.
- Thanks to all contributors and collaborators for their support in building and enhancing this system.

### References

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [AWS Documentation](https://aws.amazon.com/documentation/)
## FAQ

#### What is the purpose of this pothole detection system?

The purpose of this pothole detection system is to enhance road safety by automatically detecting potholes in real-time, providing timely information to drivers and helping authorities prioritize road maintenance. This system aims to reduce accidents caused by potholes and improve overall road quality.

#### How is this system really helpful?

This system is helpful by improving road safety and reducing the time spent on road repairs. It helps drivers avoid dangerous potholes, reduces vehicle damage, and enables faster and more accurate identification of potholes for road maintenance authorities. Additionally, it can be integrated with navigation apps to provide real-time alerts for safer driving.



## Feedback

If you have any feedback, please reach out to me at pranavkhaire28@gmail.com

