import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { checkLoginStatus } from '../utils/auth';
import { showMessage, showConfirmModal } from '../utils/notifications';

function Enrolled() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [enrolledInternships, setEnrolledInternships] = useState([]);
    const [expandedInternship, setExpandedInternship] = useState(null);
    const [newTask, setNewTask] = useState({ title: '', notes: '' });

    useEffect(() => {
        const loggedInUser = checkLoginStatus();
        if (!loggedInUser) {
            showMessage('Please login to access this page', 'warning');
            setTimeout(() => navigate('/login'), 1000);
            return;
        }
        setUser(loggedInUser);
        loadEnrolledInternships(loggedInUser);
    }, [navigate]);

    const loadEnrolledInternships = (loggedInUser) => {
        const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        const userEnrollments = enrollments.filter(e => e.userEmail === loggedInUser.email);
        setEnrolledInternships(userEnrollments);
    };

    const addTask = (internshipId) => {
        if (!newTask.title.trim()) {
            showMessage('Task title is required', 'warning');
            return;
        }

        const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        const enrollmentIndex = enrollments.findIndex(
            e => e.internshipId === internshipId && e.userEmail === user.email
        );

        if (enrollmentIndex !== -1) {
            if (!enrollments[enrollmentIndex].tasks) {
                enrollments[enrollmentIndex].tasks = [];
            }
            
            enrollments[enrollmentIndex].tasks.push({
                title: newTask.title,
                notes: newTask.notes,
                status: 'Pending',
                createdAt: new Date().toISOString()
            });

            // Recalculate progress
            enrollments[enrollmentIndex].progress = calculateProgress(enrollments[enrollmentIndex].tasks);
            
            localStorage.setItem('enrollments', JSON.stringify(enrollments));
            showMessage('Task added successfully', 'success');
            setNewTask({ title: '', notes: '' });
            loadEnrolledInternships(user);
        }
    };

    const toggleTaskStatus = (internshipId, taskIndex) => {
        const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        const enrollmentIndex = enrollments.findIndex(
            e => e.internshipId === internshipId && e.userEmail === user.email
        );

        if (enrollmentIndex !== -1 && enrollments[enrollmentIndex].tasks[taskIndex]) {
            const currentStatus = enrollments[enrollmentIndex].tasks[taskIndex].status;
            enrollments[enrollmentIndex].tasks[taskIndex].status = 
                currentStatus === 'Done' ? 'Pending' : 'Done';
            
            // Recalculate progress
            enrollments[enrollmentIndex].progress = calculateProgress(enrollments[enrollmentIndex].tasks);
            
            localStorage.setItem('enrollments', JSON.stringify(enrollments));
            showMessage('Task status updated', 'success');
            loadEnrolledInternships(user);
        }
    };

    const deleteTask = (internshipId, taskIndex) => {
        showConfirmModal('Are you sure you want to delete this task?', () => {
            const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
            const enrollmentIndex = enrollments.findIndex(
                e => e.internshipId === internshipId && e.userEmail === user.email
            );

            if (enrollmentIndex !== -1) {
                enrollments[enrollmentIndex].tasks.splice(taskIndex, 1);
                
                // Recalculate progress
                enrollments[enrollmentIndex].progress = calculateProgress(enrollments[enrollmentIndex].tasks);
                
                localStorage.setItem('enrollments', JSON.stringify(enrollments));
                showMessage('Task deleted successfully', 'success');
                loadEnrolledInternships(user);
            }
        });
    };

    const calculateProgress = (tasks) => {
        if (!tasks || tasks.length === 0) return 0;
        const completedTasks = tasks.filter(t => t.status === 'Done').length;
        return Math.round((completedTasks / tasks.length) * 100);
    };

    const removeEnrollment = (internshipId) => {
        showConfirmModal('Are you sure you want to remove this application?', () => {
            const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
            const updatedEnrollments = enrollments.filter(e => 
                !(e.internshipId === internshipId && e.userEmail === user.email)
            );
            
            localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));
            
            // Also update appliedInternships for backward compatibility
            const appliedInternships = JSON.parse(localStorage.getItem('appliedInternships') || '[]');
            const updatedApplications = appliedInternships.filter(app => 
                !(app.internshipId === internshipId && app.userEmail === user.email)
            );
            localStorage.setItem('appliedInternships', JSON.stringify(updatedApplications));
            
            showMessage('Application removed successfully', 'success');
            loadEnrolledInternships(user);
        });
    };

    const clearAllEnrollments = () => {
        showConfirmModal('Are you sure you want to remove ALL applications? This cannot be undone.', () => {
            const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
            const updatedEnrollments = enrollments.filter(e => e.userEmail !== user.email);
            
            localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));
            
            const appliedInternships = JSON.parse(localStorage.getItem('appliedInternships') || '[]');
            const updatedApplications = appliedInternships.filter(app => app.userEmail !== user.email);
            localStorage.setItem('appliedInternships', JSON.stringify(updatedApplications));
            
            showMessage('All applications cleared', 'success');
            loadEnrolledInternships(user);
        });
    };

    const toggleExpanded = (internshipId) => {
        setExpandedInternship(expandedInternship === internshipId ? null : internshipId);
        setNewTask({ title: '', notes: '' });
    };

    if (!user) return null;

    return (
        <>
            <Navbar />
            
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>My Enrolled Internships</h1>
                    <p>View and manage your internship applications</p>
                </div>
            </section>

            {/* Enrolled Internships Section */}
            <section className="enrolled-section">
                <div className="container">
                    <div className="enrolled-header">
                        <h2>Your Applications (<span id="enrolledCount">{enrolledInternships.length}</span>)</h2>
                        {enrolledInternships.length > 0 && (
                            <button className="btn btn-secondary" onClick={clearAllEnrollments}>Clear All</button>
                        )}
                    </div>
                    
                    <div className="enrollments-container" id="enrolledTableContainer">
                        {enrolledInternships.length === 0 ? (
                            <p className="no-applications">
                                You haven't applied to any internships yet. <Link to="/internships">Browse internships</Link>
                            </p>
                        ) : (
                            enrolledInternships.map((enrollment, index) => (
                                <div key={index} className="enrollment-card">
                                    <div className="enrollment-header">
                                        <div className="enrollment-info">
                                            <h3>{enrollment.internshipTitle}</h3>
                                            <p className="company-name">{enrollment.company}</p>
                                            <p className="applied-date">Applied: {new Date(enrollment.appliedAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="enrollment-actions">
                                            <button 
                                                className="btn-expand"
                                                onClick={() => toggleExpanded(enrollment.internshipId)}
                                            >
                                                {expandedInternship === enrollment.internshipId ? '▼ Collapse' : '▶ Tasks & Progress'}
                                            </button>
                                            <button 
                                                className="btn-remove-small" 
                                                onClick={() => removeEnrollment(enrollment.internshipId)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="progress-section">
                                        <div className="progress-header">
                                            <span>Progress</span>
                                            <span className="progress-percentage">{enrollment.progress || 0}%</span>
                                        </div>
                                        <div className="progress-bar-container">
                                            <div 
                                                className="progress-bar-fill" 
                                                style={{width: `${enrollment.progress || 0}%`}}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Expanded Tasks & Feedback Section */}
                                    {expandedInternship === enrollment.internshipId && (
                                        <div className="tasks-management-section">
                                            {/* Mentor Feedback Display */}
                                            {(enrollment.feedback || enrollment.evaluation !== 'Pending') && (
                                                <div className="feedback-display">
                                                    <h4>💬 Mentor Feedback</h4>
                                                    {enrollment.feedback && <p className="feedback-text">{enrollment.feedback}</p>}
                                                    <span className={`evaluation-badge evaluation-${enrollment.evaluation?.toLowerCase().replace(' ', '-')}`}>
                                                        {enrollment.evaluation || 'Pending'}
                                                    </span>
                                                    {enrollment.feedbackDate && (
                                                        <p className="feedback-date">
                                                            {new Date(enrollment.feedbackDate).toLocaleDateString()}
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            {/* Task List */}
                                            <div className="task-list-section">
                                                <h4>📋 Tasks ({enrollment.tasks?.length || 0})</h4>
                                                
                                                {enrollment.tasks && enrollment.tasks.length > 0 && (
                                                    <ul className="task-list">
                                                        {enrollment.tasks.map((task, taskIndex) => (
                                                            <li key={taskIndex} className={`task-item ${task.status.toLowerCase()}`}>
                                                                <button 
                                                                    className="task-checkbox"
                                                                    onClick={() => toggleTaskStatus(enrollment.internshipId, taskIndex)}
                                                                >
                                                                    {task.status === 'Done' ? '✓' : '○'}
                                                                </button>
                                                                <div className="task-content">
                                                                    <span className="task-title">{task.title}</span>
                                                                    {task.notes && <span className="task-notes">{task.notes}</span>}
                                                                </div>
                                                                <button 
                                                                    className="task-delete"
                                                                    onClick={() => deleteTask(enrollment.internshipId, taskIndex)}
                                                                >
                                                                    🗑️
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}

                                                {/* Add Task Form */}
                                                <div className="add-task-form">
                                                    <input
                                                        type="text"
                                                        placeholder="Task title *"
                                                        value={newTask.title}
                                                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                                        onKeyPress={(e) => {
                                                            if (e.key === 'Enter') addTask(enrollment.internshipId);
                                                        }}
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Notes (optional)"
                                                        value={newTask.notes}
                                                        onChange={(e) => setNewTask({...newTask, notes: e.target.value})}
                                                    />
                                                    <button 
                                                        className="btn-add-task"
                                                        onClick={() => addTask(enrollment.internshipId)}
                                                    >
                                                        ➕ Add Task
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Enrolled;
