# 🚀 BridgeHub

### Community, Business & Opportunity Platform

BridgeHub is an all-in-one ecosystem that combines the power of LinkedIn, Upwork, and community platforms. It's designed to connect people, businesses, and opportunities in one seamless experience.

## ✨ Key Features

- **🔐 Authentication**: Secure JWT-based auth with registration, login, and profile management.
- **💼 Job Board**: Post jobs, browse opportunities, and track applications.
- **📋 Application Tracking**: Manage your job applications with status updates (Pending, Reviewed, Interview, Accepted, Rejected).
- **🏢 Company Profiles**: Create and manage company pages to build your employer brand.
- **👤 User Profiles**: Customize profiles with bio, skills, experience, and social links.
- **🌓 Dark Mode**: Full dark/light theme support with persistent user preference.
- **📱 Responsive Design**: Works beautifully on desktop, tablet, and mobile.

## 🛠️ Tech Stack

### Frontend
- React with Vite
- React Router for navigation
- Axios for API calls
- Pure CSS with CSS Variables for theming
- React Hot Toast for notifications

### Backend
- Node.js with Express
- PostgreSQL with Sequelize ORM
- JWT for authentication
- Bcrypt for password hashing

### Database
- PostgreSQL (hosted on Neon)

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Neon PostgreSQL

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (or Neon account)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BrMwita/BridgeHub.git
   cd BridgeHub


   bridgehub/
├── backend/
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Auth and error handling
│   │   ├── models/        # Sequelize models
│   │   └── routes/        # API routes
│   ├── .env              # Environment variables
│   ├── package.json
│   └── server.js         # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── context/      # React context (Auth, Theme)
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── styles/       # Global CSS and themes
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── package.json          # Root package.json
└── README.md