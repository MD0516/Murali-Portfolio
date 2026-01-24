# Murali Dharan – Full Stack Developer Portfolio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-blue?style=for-the-badge)](https://murali-portfolio-amber.vercel.app)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952B3?style=flat-square&logo=bootstrap)](https://getbootstrap.com/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-2.11.2-764ABC?style=flat-square&logo=redux)](https://redux-toolkit.js.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)

A modern, full-stack portfolio website showcasing full-stack development skills with comprehensive admin functionality for content management. Built with React 19, Redux Toolkit, and Bootstrap, featuring smooth animations, responsive design, secure authentication, and optimized performance.

![Portfolio Preview](https://opengraph.b-cdn.net/production/images/eb8cfd62-2fe5-4a0d-afba-0ce21188466a.png?token=EGEw_czAnmH4Tzp5lDmBLuymQ8Jj48D_Xka6r1d4MJQ&height=630&width=1200&expires=33286485986)

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Contact](#contact)

## Features

### Frontend Features
- **Responsive Design**: Fully responsive layout optimized for all devices (mobile, tablet, desktop) using Bootstrap's grid system and custom media queries
- **Modern UI/UX**: Clean, professional design with smooth Framer Motion animations and micro-interactions
- **Interactive Navigation**: Collapsible sidebar navigation with mobile-friendly hamburger menu and smooth transitions
- **Dynamic Content**: Animated sections with scroll-triggered animations, hover effects, and progressive loading
- **Toast Notifications**: Custom toast system for user feedback, success messages, and error handling
- **Loading States**: Progressive loading bars and skeleton screens for enhanced user experience
- **Accessibility**: WCAG-compliant components with proper ARIA labels and keyboard navigation

### Admin Dashboard
- **Magic Link Authentication**: Secure passwordless authentication using email magic links with HTTP-only cookies
- **Project Management**: Full CRUD operations for portfolio projects with image uploads and rich metadata
- **Content Management**: Add, edit, and delete projects with categories, technologies, and descriptions
- **Feedback System**: Collect and manage project feedback from visitors with local storage persistence
- **Analytics Ready**: Structured for easy integration with analytics platforms and performance monitoring

### Portfolio Sections
- **Explore**: Dynamic landing page with animated introduction, typing effects, and call-to-action buttons
- **Skills**: Comprehensive showcase of technical skills with categorized display and proficiency indicators
- **Projects**: Interactive project gallery with filtering, search functionality, and detailed project views
- **About**: Personal journey, professional experience, and background information
- **Contact**: Integrated contact form with backend API integration and social media links

### Security & Performance
- **Secure Authentication**: HTTP-only cookies, CSRF protection, and secure API communication
- **Optimized Builds**: Vite-powered builds with code splitting, tree shaking, and lazy loading
- **CSS Optimization**: PurgeCSS integration for minimal CSS bundle size and faster load times
- **SEO Optimized**: Complete meta tags, Open Graph integration, Twitter Cards, and structured data (JSON-LD)
- **PWA Ready**: Service worker setup, web app manifest, and offline capabilities
- **Performance Monitoring**: Built-in performance tracking and error boundary handling

## Architecture

### Frontend Architecture
```
src/
├── Api/                 # API configuration and utilities
│   ├── ApiWrapper.jsx   # API wrapper with interceptors and error handling
│   ├── axios.jsx        # Axios instance configuration with credentials
│   └── Endpoints.jsx    # Centralized API endpoint definitions
├── Components/          # Reusable UI components
│   ├── Project/         # Project-specific components (CRUD operations)
│   ├── UI/             # General UI components (navigation, modals, alerts)
│   └── Utils/          # Utility components (forms, animations, helpers)
├── Constants/          # Application constants and configuration
├── Context/            # React Context providers for UI state
├── Layout/             # Layout components and route protection
├── Pages/              # Page components (route destinations)
├── Routes/             # Routing configuration with lazy loading
└── Store/              # Redux store and slices for server state
```

### State Management Strategy
- **Redux Toolkit (RTK)**: Global server state management for authentication, projects, feedback, and contact data
- **React Context**: Local UI state management for sidebar, mobile detection, toasts, and modal states
- **Local Storage**: Client-side persistence for pending feedback and user preferences
- **Redux Persist**: Optional persistence for Redux state across sessions

### Component Architecture
- **Atomic Design**: Components organized by complexity (atoms, molecules, organisms)
- **Container/Presentational**: Separation of logic and presentation components
- **Higher-Order Components**: Route protection and authentication wrappers
- **Custom Hooks**: Reusable logic for API calls, animations, and state management

## Tech Stack

### Core Framework & Build Tools
- **React 19.1.0** - Latest React with concurrent features, hooks, and improved performance
- **Vite 6.3.5** - Next-generation frontend build tool with lightning-fast HMR
- **React Router DOM 7.6.2** - Declarative routing with nested routes and lazy loading
- **Redux Toolkit 2.11.2** - Opinionated Redux with RTK Query for efficient API management

### UI & Styling
- **Bootstrap 5.3.8** - Responsive CSS framework with utility classes
- **Framer Motion 12.18.1** - Production-ready motion library for React
- **Lucide React 0.562.0** - Beautiful & consistent icon toolkit
- **React Bootstrap 2.10.10** - Bootstrap components rebuilt for React
- **Bootstrap Icons 1.13.1** - Official icon library for Bootstrap

### Development & Quality Tools
- **ESLint 9.25.0** - Pluggable linting utility for JavaScript and JSX
- **Vite Plugin PurgeCSS** - Remove unused CSS to reduce bundle size
- **Axios 1.12.2** - Promise-based HTTP client with interceptors
- **Formik 2.4.6** - Form library for React with validation
- **Yup 1.7.1** - JavaScript schema builder for validation

### Additional Libraries
- **React Top Loading Bar 3.0.2** - Minimalistic progress bar for page loads
- **React DOM 19.1.0** - React renderer for the web
- **@types/react & @types/react-dom** - TypeScript definitions for React

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (>= 18.0.0) - JavaScript runtime
- **npm** (>= 9.0.0) or **yarn** (>= 1.22.0) - Package manager
- **Git** (>= 2.30.0) - Version control system
- **Backend API** - Running instance of the portfolio backend (see backend repository)

### System Requirements
- **OS**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **RAM**: Minimum 4GB, recommended 8GB+
- **Storage**: 500MB free space for dependencies and build artifacts

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MD0516/Murali-Portfolio.git
   cd portfolio-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables** (see [Environment Setup](#environment-setup))

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` (default Vite port)

## Environment Setup

The codebase includes a `.env` file with the following configuration:

```env
VITE_API_URL=http://localhost:4040
```

This environment variable configures the API endpoint for the backend server. The codebase uses Vite's environment variable system where variables prefixed with `VITE_` are exposed to the client-side code.

## Usage

### Development Workflow

1. **Start development server**
   ```bash
   npm run dev
   ```

2. **Run linting**
   ```bash
   npm run lint
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

### Admin Features

1. **Access Admin Panel**
   - Navigate to `/auth` and request a magic link
   - Check your email and click the verification link
   - Access admin features from the sidebar

2. **Manage Projects**
   - Click "Add Project" button in the admin panel
   - Fill in project details, upload images, and save
   - Edit or delete existing projects

3. **View Feedback**
   - Access feedback section to view visitor submissions
   - Manage pending feedback stored locally

### User Features

- **Browse Portfolio**: Navigate through different sections using the sidebar
- **View Projects**: Filter and search through project showcase
- **Contact**: Use the contact form to send messages
- **Leave Feedback**: Provide feedback on individual projects

## Project Structure

```
portfolio-frontend/
├── public/                 # Static assets
│   ├── Favicon/           # Favicon and PWA assets
│   ├── Image/             # Static images
│   └── sitemap.xml        # SEO sitemap
├── src/                   # Source code
│   ├── Api/              # API layer
│   ├── Components/       # React components
│   ├── Constants/        # App constants
│   ├── Context/          # React context
│   ├── Layout/           # Layout components
│   ├── Pages/            # Page components
│   ├── Routes/           # Routing config
│   └── Store/            # Redux store
├── .env                  # Environment variables
├── .gitignore           # Git ignore rules
├── eslint.config.js     # ESLint configuration
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── README.md            # This file
├── vercel.json          # Vercel deployment config
└── vite.config.js       # Vite configuration
```

### Key Files Explained

- **`src/main.jsx`**: Application entry point with React 19 setup
- **`src/Routes/Routes.jsx`**: Route configuration with lazy loading
- **`src/Store/store.jsx`**: Redux store configuration
- **`src/Layout/Layout.jsx`**: Main layout with navigation and state management
- **`src/Api/axios.jsx`**: Axios instance with interceptors
- **`vite.config.js`**: Build configuration with PurgeCSS and proxy setup

## API Integration

The frontend integrates with a RESTful backend API for:

### Authentication Endpoints
- `POST /api/auth/request` - Request magic link
- `POST /api/auth/verify` - Verify magic link and set session
- `GET /api/auth/profile` - Get user profile (session check)

### Project Management
- `GET /api/projects` - Fetch all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Contact & Feedback
- `POST /api/contact` - Send contact message
- `POST /api/feedback` - Submit project feedback

### API Features
- **Automatic Retries**: Failed requests are retried with exponential backoff
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Loading indicators for all API operations
- **Caching**: Redux Toolkit Query for efficient data caching

## Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Import project to Vercel from GitHub
   - Configure build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

2. **Environment Variables**
   - Add `VITE_API_URL` in Vercel dashboard
   - Set production API URL

3. **Deploy**
   - Push to main branch or deploy manually
   - Vercel handles the rest automatically

### Other Platforms

#### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

### Build Optimization

- **Code Splitting**: Automatic route-based code splitting
- **Asset Optimization**: Images optimized with Vite
- **CSS Minification**: PurgeCSS removes unused styles
- **Bundle Analysis**: Use `npm run build -- --mode analyze` for bundle insights

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow ESLint configuration
- Use meaningful commit messages
- Test on multiple devices/browsers
- Maintain responsive design principles
- Document new features in README

## Contact

**Murali Dharan**

- **Portfolio**: [murali-portfolio-amber.vercel.app](https://murali-portfolio-amber.vercel.app)
- **LinkedIn**: [linkedin.com/in/murali-dharan-30163a248](https://www.linkedin.com/in/murali-dharan-30163a248/)
- **GitHub**: [github.com/MD0516](https://github.com/MD0516)
- **Email**: msmurali2005@gmail.com
- **WhatsApp**: [+91 9941161100](https://wa.me/919941161100?text=Hi%20Murali%2C%20I%20came%20across%20your%20portfolio%20and%20I'm%20interested%20in%20your%20work.%20Can%20we%20talk%3F)

### Social Links
- **GitHub**: [MD0516](https://github.com/MD0516)
- **LinkedIn**: [Murali Dharan](https://www.linkedin.com/in/murali-dharan-30163a248/)
- **Instagram**: [@hatetosocializ.e](https://www.instagram.com/hatetosocializ.e/)

---

**Built with ❤️ by Murali Dharan**

*Show some love by starring this repo! ⭐*