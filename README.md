# Authentication System with JWT and OTP Support
This project is a Node.js-based authentication system that provides user registration, login, and password reset functionality using JSON Web Tokens (JWT) and OTP (One-Time Password).
## Features

- **User Registration**: Register new users with a unique email and password.
- **User Login**: Authenticate users and provide a JWT for secure access to protected routes.
- **Protected Routes**: Allow only authenticated users to access specific routes.
- **Password Reset**: Send an OTP to the user's email for resetting the password.
- **OTP Verification**: Verify the OTP and allow users to set a new password.

---
## Tech Stack

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer
- **Other Tools**: Crypto for OTP generation, Bcrypt for password hashing

---
## Project Structure
```
authentication/
├── src/
│   ├── controllers/       # Controllers for handling API requests
│   ├── middlewares/       # Authentication middleware
│   ├── models/            # Mongoose schemas and models
│   ├── routes/            # API routes
│   ├── services/          # Business logic and database interactions
│   ├── utils/             # Utility functions (e.g., email sender)
│   └── index.js           # Entry point of the application
├── .env                   # Environment variables
├── package.json           # Node.js dependencies and scripts
└── README.md              # Project documentation
```
## API Endpoints
### 1. Register User
URL: POST /api/v1/register
### 2. Login User
URL: POST /api/v1/login
### 3. Access Protected Route
URL: GET /api/v1/protected
### 4. Request Password Reset
URL: POST api/v1/resetpassword
### 5.  Verify OTP and Reset Password
URL: POST /api/v1/verifyotp

## Contributing
Contributions are welcome! If you'd like to contribute to Twitter_Dev Backend, please follow these steps:

- Fork the repository.
- Create a new branch (git checkout -b  add-new-feature).
- Make your changes.
- Commit your changes (git commit -m 'Add new feature').
- Push to the branch (git push origin add-new-feature).
- Create a new Pull Request.

## License
 This project is licensed under the MIT License - see the LICENSE file for details.

