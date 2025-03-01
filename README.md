# Doctor Appointment App

## Introduction

The **Doctor Appointment App** is a web-based platform that allows patients to book, manage, and track their medical appointments efficiently. The application provides a seamless experience for both patients and healthcare providers by integrating appointment scheduling, Email reminders, and image uploads for medical records.

## Features

- **User Authentication**: Secure login and registration for patients and doctors.
- **Appointment Booking**: Easy scheduling of doctor appointments.
- **Doctor Management**: View doctor profiles, availability, and specialization.
- **Email Reminders**: Automated appointment reminders using Nodemailer.
- **Image Uploads**: Upload using Cloudinary.
- **Admin Dashboard**: Manage users, doctors, and appointments.
- **Responsive UI**: Mobile-friendly design for easy access on any device.
- **Google OAth 2.0**: User can login or signUp using google.

## Technologies Used

- **Frontend**: React.js, Redux
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT-based authentication
- **Email Integration**: Nodemailer, Node-corn
- **Image Storage**: Cloudinary
- **Google Oath2**: googleapis,@react-oauth/google
- **Deployment**: pending..

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node.js & npm
- MongoDB

### Steps to Run the Project

1. Clone the repository:
   ```sh
   https://github.com/Pranav-kp02/Doctor-Appoiment.git
   ```
2. Navigate to the project directory:
   ```sh
   cd Doctor-Appoiment
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Configure environment variables:
   - Create a `dot.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=3000
     DB_URL=your-mongodb-uri
     SECRETKEY=your-secret-key
     EMAIL_USER= email
     EMAIL_PASS= app-password
     CLOUDINARY_CLOUD_NAME=your-cloudinary-name
     CLOUDINARY_API_KEY=your-cloudinary-api-key
     CLOUDINARY_API_SECRET=your-cloudinary-api-secret
     ```
5. Start the server:
   ```sh
   npm start
   ```
6. Open the application in the browser at `http://localhost:3000`

## Contact

For any inquiries, contact: `pranavkp1320@gmail.com`
