# InternHub - SDP Project Documentation

**Student Name:** Suhani Prashar  
**Project:** InternHub - Internship Management Platform  
**Repository:** https://github.com/suhaniparashar/internship-hub  



## 📋 Rubric Implementation

### 1️⃣ Component Design & Structure (10 marks)
**Files:** `src/components/Navbar.jsx`, `Footer.jsx`, `ProtectedRoute.jsx` | `src/pages/*.jsx` | `src/utils/*.js`  
**What:** Modular components with single responsibility. Reusable Navbar with dark mode toggle, Footer across all pages, ProtectedRoute for authentication, 9 page components, utility helpers for auth/data/notifications.

### 2️⃣ React Hooks (10 marks)
**Files:** All page components + `src/context/AppContext.jsx` + `src/hooks/useLocalStorage.js`  
**What:** useState for local UI state, useEffect for data loading and redirects, useContext via `useAppContext()` for global state access, custom `useLocalStorage` hook for persistent state.

### 3️⃣ State Management - Context API (10 marks)
**Files:** `src/context/AppContext.jsx`  
**What:** Centralized Context API managing authentication (login/logout/register), users, internships, applications, tasks, admin feedback, and dark mode. All components access via `useAppContext()` hook.

### 4️⃣ Routing & Navigation (10 marks)
**Files:** `src/App.jsx`, `src/components/ProtectedRoute.jsx`, `Navbar.jsx`  
**What:** React Router v6 with public routes (Home, Login, Register) and protected routes (Dashboard, Internships, Enrolled, Admin). Responsive Navbar with hamburger menu and active link highlighting.

### 5️⃣ API Integration (10 marks)
**Files:** `public/data/internships.json`, `src/context/AppContext.jsx`  
**What:** Fetch API loads internship data from JSON file on startup. Includes loading states and error handling with local data fallback.

### 6️⃣ Data Persistence (10 marks)
**Files:** `src/hooks/useLocalStorage.js`, `src/context/AppContext.jsx`  
**What:** Custom hook wraps localStorage for persistent state. Saves users, applications, logged-in user, tasks, and dark mode preference across sessions.

### 7️⃣ UI/UX Design (10 marks)
**Files:** `src/App.css`  
**What:** Responsive design with CSS variables, pure black dark mode, smooth animations, mobile-first approach with media queries. Accessible with semantic HTML and keyboard navigation.

### 8️⃣ Git & Deployment (10 marks)
**Repository:** https://github.com/amanagarwal0602/internship-hub (branch: main)  
**What:** Regular commits with descriptive messages. Vite build setup ready for Vercel/Netlify deployment.

### 9️⃣ Advanced Features (10 marks)
**What I added:**
- **Dark Mode** - Pure black theme with toggle in Navbar, saved in Context
- **Role-Based Access** - Admin-only routes with password modal authentication
- **Task Management** - Students add/track tasks, admins provide feedback
- **Toast Notifications** - Success/error messages with auto-dismiss
- **Admin Feedback System** - Application status updates and task feedback

**Files:** `Login.jsx` (admin modal), `Enrolled.jsx` (tasks), `Admin.jsx` (feedback), `utils/notifications.js` (toasts)

---

## 🚀 Running the Project

```bash
git clone https://github.com/amanagarwal0602/internship-hub.git
cd internship-hub
npm install
npm run dev
```

**Demo Login:**
- Student: Click "Log in as Demo User"
- Admin: Username `admin` | Password `suhani123`

---

## 📂 Project File Structure

```
internhub-react/
├── public/
│   └── data/
│       └── internships.json          # Fake API data
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                # Navigation bar
│   │   ├── Footer.jsx                # Footer component
│   │   └── ProtectedRoute.jsx        # Route protection
│   ├── pages/
│   │   ├── Home.jsx                  # Landing page
│   │   ├── Login.jsx                 # Login with modal
│   │   ├── Register.jsx              # Registration
│   │   ├── Dashboard.jsx             # Student dashboard
│   │   ├── Internships.jsx           # Browse internships
│   │   ├── Enrolled.jsx              # My applications
│   │   ├── Admin.jsx                 # Admin panel
│   │   ├── Status.jsx                # Application status
│   │   └── About.jsx                 # About page
│   ├── context/
│   │   └── AppContext.jsx            # Global state management
│   ├── hooks/
│   │   └── useLocalStorage.js        # Custom localStorage hook
│   ├── utils/
│   │   ├── auth.js                   # Auth helpers
│   │   ├── data.js                   # Data utilities
│   │   └── notifications.js          # Toast notifications
│   ├── App.jsx                       # Main app with routes
│   ├── App.css                       # All styling + dark mode
│   └── main.jsx                      # Entry point
├── package.json
└── vite.config.js
```

---

## 💡 What I Learned
- Structuring React projects with proper component hierarchy
- Managing global state with Context API
- Building custom hooks for reusability
- Implementing authentication without backend using localStorage
- Creating responsive, accessible interfaces

## 🔧 Challenges & Solutions
**Challenge:** Dark mode had white backgrounds showing through  
**Solution:** Used CSS variables and comprehensive dark mode overrides

**Challenge:** Admin modal was flickering  
**Solution:** Used unique class names to avoid conflicts with notification system

**Challenge:** Managing complex state for tasks and feedback  
**Solution:** Centralized everything in Context API with clear action functions

---

*SDP Project - Academic Year 2024-25*
