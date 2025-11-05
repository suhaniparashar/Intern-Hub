import React, { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Create Context
const AppContext = createContext();

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppContextProvider');
  }
  return context;
};

// Context Provider Component
export const AppContextProvider = ({ children }) => {
  // State management using custom localStorage hook
  const [loggedInUser, setLoggedInUser] = useLocalStorage('loggedInUser', null);
  const [users, setUsers] = useLocalStorage('users', []);
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useLocalStorage('applications', []);
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize demo data on first load
  useEffect(() => {
    initializeDemoData();
  }, []);

  // Fetch internships from fake API (JSON file)
  useEffect(() => {
    fetchInternships();
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Initialize demo users
  const initializeDemoData = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (existingUsers.length === 0) {
      const demoUsers = [
        {
          username: 'Demo User',
          email: 'demo@internhub.com',
          phone: '+91 9999999999',
          college: 'Demo University',
          branch: 'Computer Science',
          password: 'demo123',
          isAdmin: false,
          registeredAt: new Date().toISOString()
        },
        {
          username: 'Suhani Parashar',
          email: '2400033073@kluniversity.in',
          phone: '+91 9876543210',
          rollId: '2400033073',
          year: '2nd Year',
          college: 'KL University',
          branch: 'B.Tech CSE-3',
          semester: '3rd Semester',
          password: 'admin123',
          isAdmin: true,
          registeredAt: new Date().toISOString()
        }
      ];
      
      setUsers(demoUsers);
    } else {
      setUsers(existingUsers);
    }
  };

  // Fake API fetch for internships
  const fetchInternships = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/data/internships.json');
      if (response.ok) {
        const data = await response.json();
        setInternships(data);
      } else {
        // Fallback to hardcoded data if JSON file doesn't exist
        setInternships(getFallbackInternships());
      }
    } catch (error) {
      console.error('Error fetching internships:', error);
      // Use fallback data
      setInternships(getFallbackInternships());
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback internships data
  const getFallbackInternships = () => [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechCorp Solutions",
      duration: "3 Months",
      location: "Remote",
      stipend: "₹15,000/month",
      description: "Work on modern web applications using React, Vue, or Angular. Learn from experienced developers.",
      skills: ["HTML", "CSS", "JavaScript", "React"],
      type: "Full-time"
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "DataMinds Analytics",
      duration: "6 Months",
      location: "Bangalore",
      stipend: "₹20,000/month",
      description: "Work with Python, machine learning models, and data visualization tools.",
      skills: ["Python", "Pandas", "Machine Learning", "SQL"],
      type: "Full-time"
    },
    {
      id: 3,
      title: "UI/UX Design Intern",
      company: "Creative Studio",
      duration: "2 Months",
      location: "Mumbai",
      stipend: "₹12,000/month",
      description: "Design user interfaces and create prototypes using Figma and Adobe XD.",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      type: "Part-time"
    },
    {
      id: 4,
      title: "Backend Developer Intern",
      company: "CloudTech Systems",
      duration: "4 Months",
      location: "Hyderabad",
      stipend: "₹18,000/month",
      description: "Build scalable APIs and work with databases, microservices, and cloud platforms.",
      skills: ["Node.js", "MongoDB", "REST API", "Docker"],
      type: "Full-time"
    },
    {
      id: 5,
      title: "Mobile App Development Intern",
      company: "AppInnovate Labs",
      duration: "3 Months",
      location: "Pune",
      stipend: "₹16,000/month",
      description: "Develop cross-platform mobile applications using React Native or Flutter.",
      skills: ["React Native", "Flutter", "Firebase", "Mobile UI"],
      type: "Full-time"
    },
    {
      id: 6,
      title: "Digital Marketing Intern",
      company: "Growth Marketing Co",
      duration: "2 Months",
      location: "Remote",
      stipend: "₹10,000/month",
      description: "Learn SEO, social media marketing, content creation, and analytics.",
      skills: ["SEO", "Social Media", "Content Writing", "Google Analytics"],
      type: "Part-time"
    }
  ];

  // Login function
  const login = (user) => {
    setLoggedInUser(user);
  };

  // Logout function
  const logout = () => {
    setLoggedInUser(null);
  };

  // Register new user
  const register = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    return true;
  };

  // Apply for internship
  const applyForInternship = (internshipId) => {
    if (!loggedInUser) return false;
    
    const newApplication = {
      id: Date.now(),
      userId: loggedInUser.email,
      internshipId: internshipId,
      appliedAt: new Date().toISOString(),
      status: 'Pending'
    };
    
    setApplications([...applications, newApplication]);
    return true;
  };

  // Get user applications
  const getUserApplications = () => {
    if (!loggedInUser) return [];
    return applications.filter(app => app.userId === loggedInUser.email);
  };

  // Check if user has applied for an internship
  const hasApplied = (internshipId) => {
    if (!loggedInUser) return false;
    return applications.some(
      app => app.userId === loggedInUser.email && app.internshipId === internshipId
    );
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Update application status (admin only)
  const updateApplicationStatus = (applicationId, newStatus) => {
    const updatedApplications = applications.map(app =>
      app.id === applicationId ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApplications);
  };

  // Delete application (admin only)
  const deleteApplication = (applicationId) => {
    const updatedApplications = applications.filter(app => app.id !== applicationId);
    setApplications(updatedApplications);
  };

  // Context value
  const value = {
    // State
    loggedInUser,
    users,
    internships,
    applications,
    darkMode,
    isLoading,
    
    // Functions
    login,
    logout,
    register,
    applyForInternship,
    getUserApplications,
    hasApplied,
    toggleDarkMode,
    updateApplicationStatus,
    deleteApplication
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
