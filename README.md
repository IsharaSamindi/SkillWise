# SkillWise Learning Platform

A modern learning platform built with the PERN stack (PostgreSQL, Express.js, React, Node.js).

## ✨ Features

- 🎨 Modern, responsive UI with glass morphism design
- 🔐 Role-based authentication (Learner, Instructor, Admin)
- 📱 Mobile-friendly interface
- ⚡ Fast development with Vite
- 🎯 Interactive dashboards for different user roles

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/IsharaSamindi/SkillWise.git
cd SkillWise
```

2. **Install client dependencies:**
```bash
cd client
npm install
```

3. **Install server dependencies:**
```bash
cd ../server
npm install
```

### Running the Application

#### Frontend (React + Vite)
```bash
cd client
npm run dev
```
The frontend will automatically open in your browser at `http://localhost:5174`

#### Backend (Express.js)
```bash
cd server
npm start
```
The backend will run on `http://localhost:3000`

## 🛠️ Development Scripts

### Client Scripts
- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server Scripts
- `npm start` - Start the server
- `npm run dev` - Start server with nodemon (auto-reload)

## 📱 Demo Credentials

Use these credentials to test the application:
- **Email:** demo@skillwise.com
- **Password:** demo123

## 🎨 UI Components

- **HomePage** - Modern landing page with animations
- **LoginPage** - Secure login with role selection
- **SignupPage** - Multi-step registration process
- **LearnerDashboard** - Student learning interface
- **InstructorDashboard** - Teacher management interface

## 🔧 Technology Stack

### Frontend
- React 19
- Vite (Build tool)
- React Router DOM
- Axios (HTTP client)
- Font Awesome (Icons)
- Modern CSS with animations

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Nodemon (Development)

## 📁 Project Structure

```
SkillWise/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── index.css      # Global styles
│   │   └── main.jsx       # App entry point
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
├── server/                # Express backend
│   ├── routes/           # API routes
│   ├── package.json      # Backend dependencies
│   └── server.js         # Server entry point
└── README.md             # This file
```

## 🌟 Key Features

### Modern UI Design
- Glass morphism effects
- Smooth animations and transitions
- Responsive design for all devices
- Beautiful gradient backgrounds

### Authentication System
- Role-based access control
- Secure login/signup forms
- Demo credentials for testing
- Password validation

### Dashboard Interfaces
- Personalized user dashboards
- Progress tracking
- Course management
- Interactive components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit and push
5. Open a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- **GitHub Repository:** https://github.com/IsharaSamindi/SkillWise
- **Live Demo:** Coming soon...

---

Made with ❤️ by [IsharaSamindi](https://github.com/IsharaSamindi)
