import React, { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import api from '../api/index.js';

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
  // State management - using API + localStorage for logged in user only
  const [loggedInUser, setLoggedInUser] = useLocalStorage('loggedInUser', null);
  const [users, setUsers] = useState([]);
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all data on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Fetch all data from API
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      // Fetch internships, users, and applications in parallel
      const [internshipsData, usersData, applicationsData] = await Promise.all([
        api.internships.getAll().catch(() => []),
        api.users.getAll().catch(() => []),
        loggedInUser ? api.applications.getAll(loggedInUser.id).catch(() => []) : Promise.resolve([])
      ]);

      setInternships(internshipsData);
      setUsers(usersData);
      setApplications(applicationsData);
    } catch (error) {
      console.error('Error fetching data:', error);
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
  const login = async (username, password) => {
    try {
      const userData = await api.users.login({ username, password });
      setLoggedInUser(userData);
      // Fetch user's applications after login
      const userApps = await api.applications.getAll(userData.id);
      setApplications(userApps);
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    setLoggedInUser(null);
    setApplications([]);
  };

  // Register new user
  const register = async (newUser) => {
    try {
      const userData = await api.users.register(newUser);
      console.log('Registration successful:', userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.message || 'Registration failed. Please try again.';
      return { success: false, error: errorMessage };
    }
  };

  // Apply for internship
  const applyForInternship = async (internshipId) => {
    if (!loggedInUser) return false;
    
    try {
      const applicationData = {
        userId: loggedInUser.id,
        internshipId: internshipId
      };
      
      const newApplication = await api.applications.create(applicationData);
      setApplications([...applications, newApplication]);
      return true;
    } catch (error) {
      console.error('Apply error:', error);
      return false;
    }
  };

  // Get user applications
  const getUserApplications = () => {
    if (!loggedInUser) return [];
    return applications.filter(app => app.userId._id === loggedInUser.id || app.userId === loggedInUser.id);
  };

  // Check if user has applied for an internship
  const hasApplied = (internshipId) => {
    if (!loggedInUser) return false;
    return applications.some(
      app => {
        const userId = app.userId._id || app.userId;
        const appInternshipId = app.internshipId._id || app.internshipId;
        return userId === loggedInUser.id && appInternshipId === internshipId;
      }
    );
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Update application status (admin only)
  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      const updatedApp = await api.applications.update(applicationId, { status: newStatus });
      const updatedApplications = applications.map(app =>
        app._id === applicationId ? updatedApp : app
      );
      setApplications(updatedApplications);
      return true;
    } catch (error) {
      console.error('Update status error:', error);
      return false;
    }
  };

  // Delete application (admin only)
  const deleteApplication = async (applicationId) => {
    try {
      await api.applications.delete(applicationId);
      const updatedApplications = applications.filter(app => app._id !== applicationId);
      setApplications(updatedApplications);
      return true;
    } catch (error) {
      console.error('Delete application error:', error);
      return false;
    }
  };

  // Add task to application (student or admin)
  const addTaskToApplication = async (applicationId, taskData) => {
    try {
      const newTask = await api.tasks.create({
        applicationId: applicationId,
        userId: loggedInUser.id,
        title: taskData.title,
        completed: false
      });
      
      // Refresh applications to get updated data
      await fetchAllData();
      return true;
    } catch (error) {
      console.error('Add task error:', error);
      return false;
    }
  };

  // Update task status
  const updateTaskStatus = async (taskId, completed) => {
    try {
      await api.tasks.update(taskId, { completed });
      // Refresh applications to get updated data
      await fetchAllData();
      return true;
    } catch (error) {
      console.error('Update task error:', error);
      return false;
    }
  };

  // Add feedback to task (admin only)
  const addTaskFeedback = async (taskId, feedback) => {
    try {
      await api.tasks.update(taskId, { adminFeedback: feedback });
      // Refresh applications to get updated data
      await fetchAllData();
      return true;
    } catch (error) {
      console.error('Add feedback error:', error);
      return false;
    }
  };

  // Add admin feedback to application
  // Add admin feedback to application
  const addAdminFeedback = async (applicationId, feedback) => {
    try {
      const updatedApp = await api.applications.update(applicationId, { adminFeedback: feedback });
      const updatedApplications = applications.map(app =>
        app._id === applicationId ? updatedApp : app
      );
      setApplications(updatedApplications);
      return true;
    } catch (error) {
      console.error('Add feedback error:', error);
      return false;
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      await api.tasks.delete(taskId);
      // Refresh applications to get updated data
      await fetchAllData();
      return true;
    } catch (error) {
      console.error('Delete task error:', error);
      return false;
    }
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
    deleteApplication,
    addTaskToApplication,
    updateTaskStatus,
    addTaskFeedback,
    addAdminFeedback,
    deleteTask,
    fetchAllData // Export this for manual refresh
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
