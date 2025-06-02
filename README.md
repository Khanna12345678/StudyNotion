
# Ed-Tech Platform

## Overview

This Ed-Tech Platform is a comprehensive solution designed to provide an enriching and interactive learning experience. Built using the MERN stack, it offers a variety of features tailored for both students and instructors. The platform includes course purchasing, video watching, rating, reviewing, and extensive media management, making it a robust tool for online education.

## Features

### 💳 Payment Gateway Integration
- **Razorpay**: Seamlessly integrated payment gateway to handle course purchases securely and efficiently.

### 📧 Email Verification System
- **Nodemailer**: Utilizes OTPs (One-Time Passwords) sent via email for user verification during the sign-up process.

### ⭐ Course Interactions
- **Buy, Watch, Rate, and Review**: Users can purchase courses, watch instructional videos, rate the content, and leave reviews to share their feedback.

### 🎥 Course Video Watching
- **Inbuilt Video Player**: Courses come with integrated video watching capabilities, allowing users to stream educational content directly within the platform.

### 🛠️ Instructor Course Creation
- **Multipart Course Creation Page**: Instructors can create comprehensive courses through a step-by-step multipart form, simplifying the course creation process.

### 🖼️ Media Management
- **Cloudinary Integration**: Effective media management for course materials, supporting various file uploads and storage solutions.

### 🛒 CART Functionality
- **Redux Toolkit**: Implemented cart functionality to manage users' course purchases and interactions, ensuring a smooth and intuitive shopping experience.

### 👤 User Profile Management
- **Profile Editing**: Users have the ability to view and edit their profile details, maintaining control over their personal information and preferences.

### 🖥️ Dashboard Views
- **Instructor and Student Dashboards**: Distinct dashboard interfaces tailored for instructors and students, providing relevant information and functionalities to each user type.

### 📈 Course Progress and Ratings
- **Backend Analytics**: Tracks and displays course progress and average ratings, giving users insights into their learning journey and course effectiveness.

### 📊 Instructor Dashboard Analytics
- **Real-Time Sales and Progress**: Instructors have access to real-time data on course sales and student progress, aiding in performance monitoring and decision-making.

## Technologies Used

- **MERN Stack**: MongoDB, Express.js, React.js, and Node.js for a full-stack development approach.
- **Cloudinary**: For efficient media management and file uploads.
- **Nodemailer**: To handle email communications and OTP verifications.
- **Razorpay**: For secure payment processing.
- **Redux Toolkit**: To manage application state, particularly for cart functionality.
- **Tailwind CSS**: For styling and responsive design.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Razorpay Account
- Cloudinary Account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gaurangsaini01/StudyNotion.git
   cd StudyNotion
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd client
   npm install
   ```

### Configuration

1. Set up environment variables:
   - Create a `.env` file in the server directory with the following variables:
     ```env
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     RAZORPAY_KEY_ID=your_razorpay_key_id
     RAZORPAY_KEY_SECRET=your_razorpay_key_secret
     EMAIL_SERVICE=your_email_service
     EMAIL_USER=your_email_user
     EMAIL_PASS=your_email_pass
     ```

### Running the Application

1. Start the server:
   ```bash
   cd server
   npm start
   ```

2. Start the client:
   ```bash
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:5173` to start using the platform.

## Contribution

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Make sure to follow the code of conduct and adhere to the contribution guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or issues, please contact [niteshkhanna00@gmail.com].
