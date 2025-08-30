# SkillWise Learning Platform

A modern learning platform built with the PERN stack (PostgreSQL, Express.js, React, Node.js).

## ✨ Features

- 🎨 Modern, responsive UI with glass morphism design
- 🔐 Role-based authentication (Learner, Instructor, Admin)
- 📱 Mobile-friendly interface
- ⚡ Fast development with Vite
- 🎯 Interactive dashboards for different user roles




# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 🖥️ Running the Application

#### Option 1: Run Both Frontend & Backend

**Terminal 1 - Start Frontend:**
```bash
cd client
npm run dev
```
✅ Frontend will open automatically at: `http://localhost:5174`

**Terminal 2 - Start Backend:**
```bash
cd server
npm start
```
✅ Backend will run on: `http://localhost:3000`

#### Option 2: Frontend Only (for UI testing)
```bash
cd client
npm run dev
```

### 🎯 First Time Setup - Step by Step

1. **Verify Node.js installation:**
   ```bash
   node --version
   npm --version
   ```

2. **Navigate to project folder:**
   ```bash
   cd SkillWise
   ```

3. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   ```
   ✅ This creates `node_modules` folder with all React/Vite dependencies

4. **Install backend dependencies:**
   ```bash
   cd ../server
   npm install
   ```
   ✅ This creates `node_modules` folder with all Express/Node dependencies

5. **Start development servers:**
   ```bash
   # Terminal 1 - Frontend
   cd client
   npm run dev
   
   # Terminal 2 - Backend
   cd server
   npm start
   ```

### 🛠️ Troubleshooting

#### ❌ Error: 'vite' is not recognized
**Problem:** Dependencies not installed
**Solution:**
```bash
cd client
npm install
npm run dev
```

#### ❌ Error: Cannot find package.json
**Problem:** Wrong directory
**Solution:**
```bash
# Make sure you're in the right folder
cd SkillWise/client  # for frontend
cd SkillWise/server  # for backend
```

#### ❌ Port already in use
**Problem:** Another app using the same port
**Solution:**
- Frontend: Change port in `vite.config.js`
- Backend: Change port in server configuration

#### ❌ Module not found errors
**Problem:** Dependencies missing or corrupted
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

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

## ⚠️ Important Notes

### Why `node_modules` is Not Included
- ✅ **This is normal!** All JavaScript projects exclude `node_modules` from GitHub
- ✅ The folder contains 100MB+ of dependencies
- ✅ It's automatically recreated when you run `npm install`
- ✅ This keeps the repository lightweight and fast to download

### After Download Steps
1. **Always run `npm install`** in both `client` and `server` folders
2. **Don't panic** if you see "vite not recognized" - just install dependencies first
3. **Use two terminals** to run frontend and backend simultaneously
4. **Check your Node.js version** - needs to be v16 or higher

### Development Workflow
```bash
# Daily workflow
git pull origin main        # Get latest changes
cd client && npm install   # Update frontend deps if needed
cd ../server && npm install # Update backend deps if needed
npm run dev                # Start development
```

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

## 🚀 Quick Reference

### Essential Commands
```bash
# Setup (run once)
git clone https://github.com/IsharaSamindi/SkillWise.git
cd SkillWise
cd client && npm install
cd ../server && npm install

# Daily development
cd client && npm run dev     # Start frontend
cd server && npm start       # Start backend

# Build for production
cd client && npm run build   # Build frontend
```

### Folder Structure Quick Guide
```
SkillWise/
├── client/          # 🖼️  React frontend (Port 5174)
│   ├── src/         # 📄 React components & styles
│   └── package.json # 📦 Frontend dependencies
├── server/          # ⚙️  Express backend (Port 3000)
│   ├── routes/      # 🛣️  API endpoints
│   └── package.json # 📦 Backend dependencies
└── README.md        # 📖 This documentation
```

### First-Time Setup Checklist
- [ ] Node.js v16+ installed
- [ ] Git installed
- [ ] Repository cloned/downloaded
- [ ] `npm install` run in `/client`
- [ ] `npm install` run in `/server`
- [ ] Frontend running on localhost:5174
- [ ] Backend running on localhost:3000

### Common Issues & Solutions
| Problem | Solution |
|---------|----------|
| `vite not recognized` | Run `npm install` in client folder |
| `Cannot find package.json` | Navigate to correct folder (client/server) |
| `Port in use` | Close other apps or change port |
| `Module not found` | Delete `node_modules`, run `npm install` |

---

Made with ❤️ by [IsharaSamindi](https://github.com/IsharaSamindi)
