Mentorly 🎓
Mentorly: Find Your Path, Together.

Mentorly is a modern web application designed to bridge the gap between aspiring learners and experienced professionals. It provides a dynamic platform for finding the perfect mentor, participating in insightful events, and accelerating personal and professional growth.


✅ Key Features
👥 Dual User Roles: A seamless experience for both Mentors and Mentees, featuring tailored registration flows and distinct profile functionalities.

📝 Multi-Step Profile Creation: An intuitive, multi-step onboarding process helps users build a comprehensive and engaging profile, detailing their skills, goals, and experience.

📅 Dynamic Event System: Browse a real-time list of current and upcoming events fetched directly from our live database. Users can view event details and register with a single click.

✏️ Full Profile Management: A dedicated and clean profile page that displays all relevant user information. Users have full control to edit and update their details, including bio, occupation, and social media links.

🔗 Modern & Responsive UI: Built with a vibrant orange and cream theme, the user interface is designed to be clean, intuitive, and fully responsive across devices.

🚀 Seamless Navigation: As a Single-Page Application (SPA), Mentorly offers a fast and fluid user experience with a fully functional and consistent navigation system.

🚀 Tech Stack
Frontend: React (with Vite)

Routing: React Router v6

UI/Styling: Material-UI (MUI) & Emotion

Backend & Database: Firebase (Authentication & Cloud Firestore)

🛠️ Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js and npm installed on your machine.

A Firebase project with Authentication and Firestore enabled.

Installation & Setup
Clone the repo

Bash

git clone [https://github.com/Bromigos-IITB/Mentorly]
Navigate to the project directory

Bash

cd mentorly
Install NPM packages

Bash

npm install
Set up your Firebase Credentials

In your Firebase project console, go to Project Settings and find your web app's Firebase config object.

In the src/backend/ folder, create a new file named Firebase.js.

Paste your config object into this file, like so:

JavaScript

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
Run the application

Bash

npm run dev
The application will be available at http://localhost:5173.

🌟 Future Goals
Implement a real-time messaging feature.

Build out a comprehensive "Progress" tracking system for mentees.

Develop a more advanced search and filtering system for finding mentors.
