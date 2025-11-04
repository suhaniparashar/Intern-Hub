# InternHub - Remote Internship Management Platform (FEDF-PS37)

A complete React + Vite implementation of InternHub with **Task Management & Evaluation** features for remote internship management.

##  Features

### Student Features
-  Browse and apply to internships
-  **Task Management** - Add, track, and manage tasks for each internship
-  **Progress Tracking** - Automatic progress calculation based on completed tasks
-  **Mentor Feedback** - View feedback and evaluation from mentors
-  Dashboard with application statistics
-  Application status tracking
-  Profile management

### Admin/Mentor Features
-  View all registered students
-  **Student Progress Monitoring** - View each student's tasks and progress
-  **Add Feedback** - Provide feedback for each internship
-  **Evaluation** - Mark internships as Completed/Needs Improvement/Pending
-  User management
-  Application tracking

##  Quick Start

### Installation
\\\ash
cd C:\Users\DELL\OneDrive\Desktop\internhub-react
npm install
\\\

### Run Development Server
\\\ash
npm run dev
\\\

Visit: http://localhost:5173

### Build for Production
\\\ash
npm run build
\\\

##  Project Structure

\\\
internhub-react/
 src/
    components/
       Navbar.jsx
       Footer.jsx
    pages/
       Home.jsx
       Login.jsx
       Register.jsx
       Dashboard.jsx
       Internships.jsx
       Enrolled.jsx       # NEW: Task Management
       Status.jsx
       About.jsx
       Admin.jsx           # NEW: Evaluation Features
    utils/
       auth.js
       data.js
       notifications.js
    App.jsx
    main.jsx
    App.css
 index.html
 package.json
 vite.config.js
\\\

##  Demo Accounts

### Student Account
- **Quick Login:** Click "Log in as Demo User" button
- **Manual Login:**
  - Email: demo@internhub.com
  - Password: demo123

### Admin Account
- **Quick Login:** Click "Log in as Admin" button
- **Manual Login:**
  - Email: 2400033073@kluniversity.in
  - Password: admin123

##  Data Model (localStorage)

### Enrollments (NEW)
\\\javascript
{
  userEmail: string,
  internshipId: number,
  internshipTitle: string,
  company: string,
  appliedAt: ISO date,
  status: 'Pending' | 'Selected' | 'Rejected',
  tasks: [
    {
      title: string,
      notes: string,
      status: 'Pending' | 'Done',
      createdAt: ISO date
    }
  ],
  progress: 0-100,
  feedback: string,
  evaluation: 'Pending' | 'Completed' | 'Needs Improvement',
  feedbackDate: ISO date
}
\\\

##  New Features (FEDF-PS37 Compliance)

### 1. Task Management (Student)
- Navigate to **My Applications** page
- Click **" Tasks & Progress"** to expand any internship
- **Add tasks** with title and optional notes
- **Mark tasks as done** by clicking the checkbox
- **Delete tasks** using the trash icon
- **Progress auto-updates** based on completed vs total tasks

### 2. Progress Tracking
- Progress bar shows completion percentage
- Auto-calculated: (Completed Tasks / Total Tasks)  100
- Updates in real-time as tasks are completed

### 3. Mentor Feedback (Student View)
- View feedback from mentors on each internship
- See evaluation status (Pending/Completed/Needs Improvement)
- Displays on the expanded internship card

### 4. Student Progress Monitoring (Admin)
- Admin Dashboard  **"Student Progress & Evaluation"** tab
- Click on any student card to view their details
- See all enrolled internships with:
  - Task lists
  - Progress percentage
  - Current feedback and evaluation

### 5. Evaluation & Feedback (Admin)
- Enter feedback text for each student's internship
- Select evaluation status from dropdown
- Click **"Save Feedback"** to store
- Students can view this immediately

##  Design Philosophy

- **Minimalist** - Clean, professional interface
- **Lightweight** - No heavy frameworks, just React + Vite
- **localStorage-based** - Fully static, no backend needed
- **Responsive** - Works on desktop, tablet, and mobile
- **Same Design** - Maintains original InternHub visual style

##  Migration from Static Version

All existing features from the static HTML version are preserved:
- Same CSS styling
- Same color scheme
- Same layout and components
- Enhanced with React for better state management

##  Responsive Design

- Mobile-friendly task management
- Collapsible sections for small screens
- Touch-friendly buttons and controls
- Optimized for all device sizes

##  Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Build & Deploy Manually
\\\ash
npm run build
# Upload dist/ folder to your hosting
\\\

##  Usage Tips

### For Students
1. Apply to internships from the Internships page
2. Go to "My Applications" to manage your tasks
3. Expand any internship to add/manage tasks
4. Mark tasks as done to increase your progress
5. Check feedback from mentors

### For Admins
1. Go to Admin Dashboard
2. Switch to "Student Progress & Evaluation" tab
3. Click on a student to see their progress
4. Review their tasks and progress
5. Add feedback and set evaluation status
6. Save changes

##  Technologies

- **React 18.3** - UI framework
- **Vite 5.4** - Build tool
- **React Router DOM 6.26** - Routing
- **localStorage** - Data persistence
- **CSS3** - Styling
- **No backend required** - Fully static

##  License

This is a demo project for educational purposes.

##  Development

### Key Components
- \Navbar\ - Dynamic navigation based on user role
- \Footer\ - Consistent footer across pages
- \Enrolled\ - Task management interface
- \Admin\ - Student progress and evaluation

### State Management
- Uses React hooks (useState, useEffect)
- localStorage for data persistence
- Real-time updates across components

##  FEDF-PS37 Compliance

 Remote internship management
 Task tracking with status
 Progress reporting (auto-calculated)
 Mentor feedback system
 Student evaluation
 Role-based access (Student/Admin)
 Minimalist, clean UI
 Fully functional without backend

---

**Built with  using React + Vite**
