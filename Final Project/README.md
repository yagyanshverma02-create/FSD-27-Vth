# MealBridge — Surplus Food Redistribution Platform

> **Academic Project:** B.Tech Full Stack Development (FSD)  
> **Architecture:** Pure Frontend SPA (Zero-Backend, LocalStorage Persistent Engine)  
> **Tech Stack:** React 19, Vite, React Router DOM, Recharts, Lucide React, React Toastify, Context API, Native CSS3 Design Tokens.

---

## 🌿 Overview

**MealBridge** is an advanced, high-performance web platform designed to eliminate edible food waste by connecting corporate caterers, restaurants, and grocers (**Donors**) directly with verified frontline shelters and community kitchens (**NGOs**).

Built using a minimalist startup aesthetic inspired by editorial typography and organic forest tones, the application implements real-time client-side inventory reservations, Haversine geodesic distance calculations, dynamic food safety expiry counters, and comprehensive impact analytics.

---

## 🎨 Design System & Palette

- **Primary Forest Green:** `#173D32` (Header, primary actions, branding)
- **Deep Green:** `#315B49` (Accent buttons, secondary elements)
- **Sage Green:** `#B7C9B2` (Badges, subtle borders, soft backgrounds)
- **Warm Ivory:** `#F7F6F0` (Page body canvas)
- **Pure White:** `#FFFFFF` (Surface cards, modals, clean surfaces)
- **Charcoal Text:** `#1F2421` (High-contrast, accessible typography)
- **Typography:** **Manrope** (Headings) & **Inter** (Body text)

---

## 🏗️ Project Architecture

```
MealBridge/
├── public/                 # Static assets & favicon
├── src/
│   ├── assets/             # Branding icons & illustrations
│   ├── components/
│   │   ├── common/         # Button, Badge, Card, Modal
│   │   ├── navigation/     # Navbar (with fast role switcher), Footer
│   │   └── feedback/       # Alerts & Spinners
│   ├── contexts/
│   │   ├── AuthContext.jsx         # Role-based user session state (Donor/NGO)
│   │   ├── DonationContext.jsx     # Food inventory, reservations & claims
│   │   └── NotificationContext.jsx # Dispatch & confirmation notifications
│   ├── data/
│   │   └── seedData.js             # Realistic pre-seeded Donors, NGOs & listings
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useDonations.js
│   │   └── useNotifications.js
│   ├── layouts/
│   │   └── AppLayout.jsx           # Sticky Navbar + Dynamic Outlet + Footer
│   ├── pages/
│   │   ├── Home.jsx                # Premium landing hero & core pillars
│   │   ├── Marketplace.jsx         # Food discovery, filters, search & distance
│   │   ├── DonationDetails.jsx     # Safe handling, expiry countdown & reservation
│   │   ├── DonorDashboard.jsx      # Surplus inventory CRUD & request review
│   │   ├── NgoDashboard.jsx        # Food claim tracking & receipt coordination
│   │   ├── SafetyGuidelines.jsx    # Mandatory temperature & sanitary checklist
│   │   ├── ImpactAnalytics.jsx     # Recharts data on meals saved & CO2 avoided
│   │   ├── Auth.jsx                # One-click demo profile switcher & registration
│   │   └── NotFound.jsx            # 404 handler
│   ├── routes/
│   │   ├── AppRoutes.jsx           # Central React Router configuration
│   │   └── ProtectedRoute.jsx      # Guard for Donor and NGO specific views
│   ├── services/
│   │   ├── localStorageService.js  # Centralized store, schema versioning & locking
│   │   └── storageKeys.js          # Canonical keys, roles & statuses
│   ├── styles/
│   │   ├── variables.css           # Global design tokens
│   │   └── global.css              # Typography, resets & layout utilities
│   ├── utils/
│   │   ├── constants.js            # Default coordinates, checklist & units
│   │   ├── distance.js             # Haversine distance algorithm
│   │   ├── formatters.js           # Expiry status badges & date formatters
│   │   └── validators.js           # Form input verification logic
│   ├── App.jsx                     # Top-level providers, router & toast container
│   └── main.jsx                    # Application entrypoint
├── index.html                      # HTML5 template with Google Fonts (Manrope/Inter)
├── package.json                    # Project scripts & dependencies
└── vite.config.js                  # Vite configuration
```

---

## ⚡ Core Roles & Workflow

1. **Donor (`donor`):**
   - Lists surplus meals specifying quantity, unit, food category, preparation time, safe consumption window, and storage guidelines.
   - Reviews incoming claim requests from nearby NGOs.
   - Approves or declines requests with automated quantity updates.

2. **NGO (`ngo`):**
   - Discovers available surplus sorted by Haversine proximity (`km away`) and expiry urgency.
   - Places safe reservations for all or part of the listed quantity (guaranteed against race conditions).
   - Coordinates pickup logistics and confirms safe delivery receipt upon arrival.

3. **Deterministic LocalStorage Engine:**
   - Schema versioning (`1.0.0`) ensures seed data auto-populates on first run or migration.
   - Automatic expiration status calculation on live listings.
   - Inventory reservation locks: requested quantities are subtracted from `availableQuantity` and added to `reservedQuantity`.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 📍 Current Phase: Foundation & Shell (Complete)
- [x] Initialized Vite + React with clean ES6+ modular architecture.
- [x] Installed `react-router-dom`, `recharts`, `lucide-react`, and `react-toastify`.
- [x] Implemented global CSS variables and design tokens (`#173D32`, `#315B49`, `#B7C9B2`, `#F7F6F0`).
- [x] Integrated Google Fonts (Manrope & Inter) in `index.html`.
- [x] Built centralized `LocalStorageService` with schema versioning, safe reservation logic, and realistic seed data.
- [x] Built Context providers (`AuthContext`, `DonationContext`, `NotificationContext`).
- [x] Built App shell (`Navbar`, `Footer`, `AppLayout`) with an instant role-switching dropdown in the header for rapid testing.
- [x] Configured `AppRoutes` with role-based `ProtectedRoute` guards and functional placeholder pages.
- [x] Verified compilation and development build with zero errors.

### 🎯 Next Milestone
- **Milestone 2: Premium Landing Page**: Expand the hero section into a full editorial landing page featuring interactive impact tickers, step-by-step workflow visualizer, featured live surplus ticker, food safety guarantee, and trust testimonials.
