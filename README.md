# Decrypt - Crypto Asset Management

A production-ready React application for managing cryptocurrency assets with real-time market tracking, portfolio management, and security features.

## 🚀 Tech Stack

- **Framework**: React 18+ with Vite
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Charts**: Recharts

## 🎨 Design System

### Colors
- **Primary**: Deep Space Navy (`navy-950`)
- **Accent**: Neon Mint (`mint-500`)
- **Success**: Crypto Green
- **Danger**: Crypto Red
- **Warning**: Crypto Yellow

### Typography
- **Sans**: Inter (system-ui fallback)
- **Mono**: JetBrains Mono

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI atoms (Button, Input, Card, Badge)
│   ├── layout/          # Layout components (Sidebar, Topbar)
│   ├── dashboard/       # Dashboard-specific components
│   ├── market/          # Market page components
│   └── security/        # Security page components
├── pages/               # Page components
│   ├── Dashboard/
│   ├── Market/
│   └── Security/
├── services/            # API service layers
├── store/               # Zustand state management
├── types/               # TypeScript interfaces
├── lib/                 # Utility functions
├── hooks/               # Custom React hooks
├── assets/              # Static assets
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## ✨ Features

### Dashboard
- Portfolio value overview with 24h change
- Asset allocation pie chart
- Recent transactions list
- Multi-widget responsive layout

### Market
- Real-time price tracking table
- Filtering and sorting capabilities
- Asset search functionality
- Trade action buttons

### Security
- API key management
- Two-factor authentication settings
- Email notifications toggle
- Login alerts
- Withdrawal whitelist

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Responsive Design

- **Desktop-first** approach
- **Mobile-optimized** with collapsible sidebar
- Tailwind breakpoints for responsive layouts

## 🔐 Security Features

- Mock API key management
- 2FA settings interface
- Withdrawal address whitelist
- Login alerts configuration

## 🎯 Key Components

### UI Components
- **Button**: Primary, secondary, ghost, danger variants
- **Input**: With label, error, and icon support
- **Card**: With hover effects and glow option
- **Badge**: Success, warning, danger, info variants

### Layout Components
- **Sidebar**: Persistent navigation with wallet connection
- **Topbar**: Search, notifications, user profile

## 📊 State Management

Zustand store manages:
- User authentication
- Wallet connection status
- Current page navigation
- Global app state

## 🧪 Mock Services

Simulated API calls for:
- Market data
- Portfolio information
- Transaction history
- API key management
- Security settings

## 🚀 Deployment

```bash
# Build the project
npm run build

# The output will be in the 'dist' directory
# Deploy the 'dist' folder to your hosting service
```

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
