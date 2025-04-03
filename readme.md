# Job Portal Application

A modern job portal application built with React, Vite, and Tailwind CSS. This application allows users to browse job listings, apply for positions, and manage their job applications.

## 🚀 Features

- User authentication and authorization
- Job listing and search functionality
- Profile management
- Responsive design
- Client-side routing
- Environment-based configuration

## 🛠️ Tech Stack

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Shadcn UI
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Authentication**: JWT with refresh token mechanism

## 📦 Project Structure

```
job-portal/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/       # React Context providers
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── public/           # Static assets
├── .env             # Production environment variables
├── .env.local       # Local development environment variables (git-ignored)
├── vite.config.js   # Vite configuration
└── tailwind.config.js # Tailwind CSS configuration
```

## 🔧 Setup and Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd job-portal
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   VITE_BASE_URL=http://localhost:5000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🏗️ Build Configuration

The project uses a custom Vite build configuration for optimal performance:

```javascript
build: {
  chunkSizeWarningLimit: 600,
  rollupOptions: {
    output: {
      manualChunks: (id) => {
        // Vendor chunk for node_modules
        if (id.includes('node_modules')) {
          return 'vendor';
        }
        // Auth chunk for authentication code
        if (id.includes('src/context/authContext') ||
            id.includes('src/hooks/useAxios')) {
          return 'auth';
        }
      }
    }
  }
}
```

This configuration:

- Splits the bundle into smaller chunks for better loading performance
- Creates separate vendor and authentication chunks
- Increases the chunk size warning limit to 600KB

## 🔐 Authentication

The application uses a JWT-based authentication system with refresh tokens:

- `authContext.jsx`: Manages authentication state and tokens
- `useAxios.js`: Custom hook for authenticated API requests
- Automatic token refresh mechanism
- Secure token storage in localStorage

## 🌐 API Integration

- Base URL configuration through environment variables
- Axios instance with interceptors for token management
- Automatic token refresh on expiration
- Error handling and unauthorized access management

## 📱 Responsive Design

The application is fully responsive and follows a mobile-first approach using Tailwind CSS:

- Breakpoint system for different screen sizes
- Fluid typography and spacing
- Optimized layouts for mobile and desktop

## 🚀 Deployment

The application is configured for deployment on Vercel:

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Configure Vercel**

   - Set up environment variables in Vercel project settings
   - Enable automatic deployments from your repository
   - Configure custom domains if needed

3. **Vercel Configuration**
   The `vercel.json` file handles client-side routing:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

## 🧪 Development Guidelines

1. **Code Style**

   - Use functional components and hooks
   - Follow React best practices
   - Implement proper error handling
   - Write meaningful component and function names

2. **State Management**

   - Use React Context for global state
   - Keep component state local when possible
   - Implement proper data fetching strategies

3. **Performance**
   - Lazy load components when appropriate
   - Optimize images and assets
   - Implement proper caching strategies
   - Use memoization when needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details
