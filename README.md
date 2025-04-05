# KnowvioFit

KnowvioFit is a fitness tracking app that leverages AI to provide personalized fitness suggestions and track your physical activity. This robust backend API is designed for seamless integration with modern frontend applications.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [API Routes](#api-routes)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview
KnowvioFit offers a comprehensive suite of endpoints for user authentication, account management, and future profile enhancements. This documentation is tailored for frontend developers looking to integrate the KnowvioFit backend with their applications.

## Features
- **User Authentication:** Secure registration, email verification, login, logout, and account deletion.
- **AI-Powered Suggestions:** Delivers personalized fitness recommendations based on user activity.
- **RESTful API:** Clean and predictable endpoints for easy integration with your frontend projects.
- **Production-Ready:** Environment configurations and deployment guidelines for a reliable production setup.

## API Routes

### Server Default Routes
- **GET** `/healthCheck`  
  _Purpose:_ Verify the server is up and running.

### User Routes
- **POST** `/api/v1/user/register`  
  _Description:_ Register a new user.  
  _Parameters:_ `name`, `email`, `password`.

- **GET** `/api/v1/user/verifyemail/:id`  
  _Description:_ Trigger email verification.  
  _Note:_ Check your spam folder if the email isn't in your inbox.

- **POST** `/api/v1/user/login`  
  _Description:_ Authenticate a user using `email` and `password`.

- **GET** `/api/v1/user/logout`  
  _Description:_ Log out the current user.

- **GET** `/deleteuser`  
  _Description:_ Delete the currently authenticated user account.

### Profile Routes
- *(Additional endpoints for profile management can be added here as the app evolves.)*

## Environment Variables
Before running the application, configure the following variables in a `.env` file:

```env
PORT=8000
DB_URI=your_database_uri
CLIENT_URL=your_frontend_url
COOKIE_SECRET=your_cookie_secret
NODE_ENV=production_or_development
MAIL_PASS=your_email_password
MAIL_ID=your_email_id
```

## Getting Started

### Prerequisites
- Node.js (version 18.19.1 or later)
- NPM (or Yarn)
- MongoDB (recommended for the database)
- A modern frontend framework (React, Vue, Angular, etc.) for integration

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/dhruv-sharma007/knowvioFit.git
   ```

2. Navigate to the project directory:
   ```bash
   cd knowvioFit
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Configure your `.env` file with the environment variables shown above.

5. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment
To deploy KnowvioFit in production:

1. Build the project:
   ```bash
   npm run build
   ```

2. Ensure environment variables are correctly configured on your production platform.

3. Deploy using your preferred provider (e.g., Render, Heroku, AWS).

   For example, on Render you might set the build command to:
   ```bash
   npm install && npm run build
   ```
   This ensures all dependencies are installed before building.

## Contributing
Contributions are welcome. If you have suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.