# Karoli Interior Hub — Premium Interior Design Website

Production-ready, luxury interior design website and backend administration system for **Karoli Interior Hub**. Inspired by modern architectural studio principles, featuring a complete public customer website, interactive 3D Design Studio (Three.js), and secure Admin CRM Dashboard.

---

## 1. Business Information & Brand Identity

- **Company Name**: Karoli Interior Hub
- **Phone Numbers**: `7347733581`, `8808111000`
- **Contact Email**: `Primepvcpannal@gmail.com`
- **Specializations**: Interior Design, False Ceiling Work, PVC Panels, Wall Paneling & Moulding, TV Unit Design, Residential & Commercial Solutions.

### Exact Brand Color Palette Tokens
- **Warm Ivory (`#F5F0E6`)**: Main website background (~45-55%)
- **Soft Beige (`#E8DDCC`)**: Cards, section highlights (~20-25%)
- **Warm Taupe (`#B9A895`)**: Secondary accents & borders (~5-10%)
- **Muted Sage Green (`#9BAA91`)**: Soft highlights & active tags (~5%)
- **Deep Olive Green (`#3F5036`)**: Primary CTAs & buttons (~5-10%)
- **Charcoal Black (`#292A26`)**: Elegant typography
- **Pure White (`#FFFFFF`)**: Button text & contrast

---

## 2. Technology Stack

- **Frontend**: React.js, Vite, React Router v6, Tailwind CSS, Framer Motion, Axios, Lucide React icons.
- **3D Engine**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`), OrbitControls.
- **Backend**: Node.js, Express.js REST API, Mongoose, JWT Auth, bcryptjs, Helmet, CORS, Multer.
- **Database**: MongoDB (with automatic graceful fallback storage if MongoDB is not running locally).

---

## 3. Directory Structure

```
karoli-interior-hub/
├── frontend/             # React + Vite + Tailwind + R3F 3D Studio App
│   ├── src/
│   │   ├── api/          # Axios API Client with JWT Interceptors
│   │   ├── components/   # Navbar, Footer, Hero, ConsultationModal, Cards, Filters
│   │   ├── context/      # AuthContext, SettingsContext, ToastContext
│   │   ├── pages/        # Public, User Portal, and Admin Dashboard pages
│   │   ├── three/        # Interactive Three.js 3D Room Viewer & Material Selector
│   │   ├── App.jsx
│   │   └── index.css     # Brand color token definitions
│   └── package.json
├── backend/              # Node.js + Express + MongoDB REST API
│   ├── src/
│   │   ├── config/       # Database connection
│   │   ├── controllers/  # Auth, Leads, Projects, Services, Gallery, Models, Settings
│   │   ├── middleware/   # JWT Protect, Role Check, Error Handler, Upload
│   │   ├── models/       # Mongoose Schemas (User, Lead, Project, Service, Gallery, Model3D, Settings)
│   │   ├── routes/       # Express Router Endpoints
│   │   ├── seed/         # Database Seed Script
│   │   └── server.js     # Server entrypoint
│   └── package.json
└── README.md
```

---

## 4. Setup & Running Locally

### Step A: Backend Setup
```bash
cd backend
npm install

# Seed default admin, services, sample projects, and settings:
npm run seed

# Run Backend Server (Port 5000):
npm run dev
```

### Step B: Frontend Setup
```bash
cd frontend
npm install

# Run Vite Dev Server (Port 3000):
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 5. Development Credentials & Routes

### Customer Portal
- User Login: `/login`
- User Registration: `/register`
- Customer Dashboard: `/dashboard`

### Admin CRM Dashboard
- Admin Login: `/admin/login`
- Admin Dashboard: `/admin`
- **Default Admin Email**: `admin@karoliinterior.com`
- **Default Admin Password**: `Admin@password123`

---

## 6. Key Features Implemented

1. **Timed Consultation Lead Popup**:
   - Triggers 4–6 seconds after visitor entrance with smooth Framer Motion animation.
   - Form fields: Name, Phone, Email, City, Project Type, Budget, Message.
   - Submits directly to `POST /api/leads` and stores in MongoDB & Admin CRM.
   - Intelligent `localStorage` / `sessionStorage` handling to avoid repeating popup after submission or dismissal.

2. **Interactive 3D Design Studio (`/3d-studio`)**:
   - Three.js / React Three Fiber interactive room renderer with OrbitControls.
   - Real-time material switching: Wall colors (Ivory, Beige, Taupe, Sage, Wood), Ceiling finishes (White PVC, Wood Rafters, Geometric Beams, Designer Panel), Floor materials (Light/Dark Marble, Light/Dark Wood).
   - Real-time LED Cove lighting temperature controls (Warm 3000K, Neutral 4000K, Cool 6000K, Deep Olive, RGB Neon Glow mode).
   - "Request This Design" CTA integration.

3. **Admin CRM Lead & Content Management**:
   - Manage lead status (*New, Contacted, Follow-up, Qualified, Converted, Closed*), add private admin notes, filter by status, search by phone/name.
   - Full CRUD for Portfolio Projects, Services, Gallery Assets, 3D Models, and Website Settings (Phone numbers `7347733581`, `8808111000`, Email `Primepvcpannal@gmail.com`, WhatsApp).
