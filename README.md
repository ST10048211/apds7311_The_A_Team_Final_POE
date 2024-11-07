
# APDS7311 POE PART 2


This project is part of the Portfolio of Evidence (PoE) for APDS7311, developed as a full-stack application using React for the frontend and Node.js and express for the backend. The application provides secure user authentication, payment processing, and account management functionalities for the customer portal.


## Table of Contents

  1. [Group Members](#group-members) 
  2. [Project Links](#project-links) 
  3. [Project Structure](#project-structure) 
  4. [Prerequisites](#prerequisites) 
  5. [Installation](#installation) 
  6.  [Running the Application](#running-the-application) 
  7.  [Features](#features) 
  8.  [Usage](#usage) 
  9.  [Security](#security) 


------------------

## Group Members

**ST10048211 – Anjali Sunil Morar**

**ST10071160 – Aidan Johann Schwoerer**

**ST10104776 – Mohamad Aslam Mustufa Khalifa**

**ST10243270 – Aayush Navsariwala**

**ST10062860 – Abdullah Gadatia**

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

------


## Project Links

**Github Links:** https://github.com/VCSTDN2024/apds7311-part2-the_a_team_apds7311_part_2.git

**YouTube Link:** https://youtu.be/4FyBn17P_GQ


<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

------


## Project Structure


The project consists of two main parts: the frontend and the backend.

**Frontend Structure**
 - public/: Contains static files for the application.
	- index.html: Main HTML file for the React application.
	- logo192.png, logo512.png: Logo assets.
	- manifest.json: Configuration for the Progressive Web App (PWA).
	- robots.txt: Instructions for web crawlers.
 - src/: Contains the source code for the React application.
	- App.css: Styles for the main App component.
	- App.js: The main React component that serves as the entry point.
	- App.test.js: Unit tests for the App component.
	- index.css: Global styles for the application.
	- index.js: The main entry point for the React application.
	- logo.svg: SVG logo used in the application.
	- reportWebVitals.js: For measuring performance metrics.
	- setupTests.js: Configures the testing environment.
 - components/: Contains reusable React components.
	- AccountAndPayment.js: Handles account and payment operations.
	- Login.js: The login form component, managing user authentication.
	- Payment.css: Styles specific to the payment section.
	- PrivateRoute.js: Component for handling protected routes.
	- Register.js: The user registration form component.

**Backend Structure**
 - .env: Stores environment variables for secure configuration.
 - eslint.config.mjs: Configuration file for ESLint.
 - package.json: Lists dependencies and scripts for the backend.
 - package-lock.json: Lockfile that captures the exact version of dependencies.
 - server.js: Main server file that sets up the Express server and manages routing.
 - config/db.js: Contains the database connection logic.
	- authController.js: Handles authentication operations.
	- paymentController.js: Manages payment processing.
 - keys/: Contains SSL keys for secure communication.
	- certificate.pem: The SSL certificate.
	- privatekey.pem: The corresponding private key.
 - middlewares/authMiddleware.js: Protects routes that require authentication.
 - models/: Defines the structure for data models.
	- User.js: Represents user data.
	- Payment.js: Represents payment data.
 - routes/: Defines API endpoints.
	- authRoutes.js: Authentication-related routes.
	- paymentRoutes.js: Payment-related routes.


<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

## Prerequisites

Before you begin, ensure you have the following installed:

 1. Node.js: A JavaScript runtime for server-side development. Download from Node.js official website.
 2. npm: Node Package Manager, included with Node.js.
 3. MongoDB: A NoSQL database. You can install it locally or use a cloud-based service like MongoDB Atlas.
 4. Visual Studio Code: A popular code editor. Download from Visual Studio Code official website.

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

----

## Installation

**Step 1: Install Visual Studio Code**
 1. Go to the Visual Studio Code website.
 2. Download the installer for your operating system.
 3. Follow the installation instructions to set up Visual Studio Code on your machine.

**Step 2: Clone the Repository**
Open a terminal or command prompt and run the following command to clone the repository:
"git clone <repository-url>"

**Step 3: Install Dependencies**
Frontend
 1. Navigate to the frontend/ directory into the terminal:
    "cd frontend"
 2. Install the frontend dependencies:
    "npm install"

Backend
 1. Navigate to the backend/ directory into the terminal:
    "cd backend"
 2. Install the backend dependencies:
    "npm install"

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

---

## Running the Application


**Step 1: Start the Backend Server**
 1. In the backend/ directory, run the following command into the terminal:
    "npm start"
This will start the backend server, which listens on http://localhost:5000.

**Step 2: Start the Frontend Application**
 1. In a new terminal window, navigate to the frontend/ directory:
    "cd frontend"
 2. Run the following command to start the React development server:
    "npm start"
The frontend will be accessible at http://localhost:3000
This will open up in the browser on the login page 

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

---

## Features

 1. User Authentication:
      - Users can register and log in to access their accounts securely.
      - Passwords are hashed for security using bcrypt.
 2. Payment Management:
      - Users can make payments through a secure interface.
      - Payment details are processed using a dedicated controller.
 3. Private Routing:
      - Certain routes are protected and can only be accessed by authenticated users.
 4. SSL Encryption:
      - Secure communication is established using SSL certificates to protect data transmission.

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

----

## Usage


**Login**
 1. Navigate to /login in your web browser.
 2. Fill in the following fields:
     - Email: Your registered email address.
     - Password: Your password.
 3. Click the Login button to authenticate.

**Register**
 1. Navigate to /register.
 2. Fill in the following fields:
     - Name: Your full name.
     - Email: Your desired email address (must be unique).
     - Password: A strong password for your account.
     - Confirm Password: Repeat the password to confirm.
 3. Click the Register button to create your account.

**Payments**
 1. After logging in, navigate to the payments section.
 2. Fill in the required fields
		 **Account Information Section:**
		 Account Number
		 Bank
		 Account Owner's Name
		 Type of Account
		 SWIFT Code
		 
	 **Payment Information Section**
	Amount 
	Currency
	Bank
 4. Click the Submit Payment button to process your payment.



<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

----

## Security

 - SSL Encryption: The application uses SSL certificates to ensure that all data transmitted between the client and server is encrypted.
 - JWT Authentication: JSON Web Tokens (JWT) are used for securing routes and ensuring that only authenticated users can access sensitive areas of the application.
 - Environment Variables: Sensitive information such as the MongoDB connection string and JWT secret are stored in environment variables to enhance security.

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

---


