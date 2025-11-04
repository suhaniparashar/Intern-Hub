// Check if user is logged in
export function checkLoginStatus() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    return loggedInUser ? JSON.parse(loggedInUser) : null;
}

// Initialize demo data (First time only)
export function initializeDemoData() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.length === 0) {
        // Demo student user
        const demoUser = {
            username: 'Demo User',
            email: 'demo@internhub.com',
            phone: '+91 9999999999',
            college: 'Demo University',
            branch: 'Computer Science',
            password: 'demo123',
            isAdmin: false,
            registeredAt: new Date().toISOString()
        };
        
        // Admin user - Suhani Parashar
        const adminUser = {
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
        };
        
        users.push(demoUser, adminUser);
        localStorage.setItem('users', JSON.stringify(users));
    }
}
