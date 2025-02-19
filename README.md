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

## Technologies Used
- **Frontend**: React.js 
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT-based authentication
- **Email Integration**: Nodemailer
- **Image Storage**: Cloudinary
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
     MONGO_URI=your-mongodb-uri
     JWT_SECRET=your-secret-key
     EMAIL_USER= email
     EMAIL_PASS= app password
     CLOUDINARY_CLOUD_NAME=your-cloudinary-name
     CLOUDINARY_API_KEY=your-cloudinary-api-key
     CLOUDINARY_API_SECRET=your-cloudinary-api-secret
     ```
5. Start the server:
   ```sh
   npm start
   ```
6. Open the application in the browser at `http://localhost:3000`

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Appointments
- `POST /api/appointments` - Book an appointment
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments/:id` - Cancel appointment

### Doctors
- `GET /api/doctors` - Get list of doctors
- `GET /api/doctors/:id` - Get doctor details



## Contact
For any inquiries, contact: `pranavkp1320@gmail.com`

