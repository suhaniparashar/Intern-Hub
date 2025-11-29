import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Internship from './models/Internship.js';
import Application from './models/Application.js';

dotenv.config();

const internshipsData = [
  {
    title: "Full Stack Development Internship",
    company: "Tech Innovations Ltd.",
    location: "Bangalore",
    duration: "3 months",
    stipend: "₹15,000/month",
    description: "Work on cutting-edge web applications using React and Node.js",
    requirements: ["Strong knowledge of JavaScript", "Experience with React", "Understanding of RESTful APIs"],
    skills: ["React", "Node.js", "MongoDB", "Express"],
    type: "Hybrid",
    deadline: "2025-12-31"
  },
  {
    title: "UI/UX Design Internship",
    company: "Creative Studios",
    location: "Mumbai",
    duration: "2 months",
    stipend: "₹12,000/month",
    description: "Create beautiful and intuitive user interfaces for web and mobile applications",
    requirements: ["Proficiency in Figma", "Basic HTML/CSS knowledge", "Portfolio required"],
    skills: ["Figma", "Adobe XD", "UI Design", "Prototyping"],
    type: "Remote"
  },
  {
    title: "Data Science Internship",
    company: "Analytics Pro",
    location: "Hyderabad",
    duration: "6 months",
    stipend: "₹20,000/month",
    description: "Work on machine learning projects and data analysis",
    requirements: ["Python programming", "Knowledge of ML algorithms", "Statistics background"],
    skills: ["Python", "TensorFlow", "Pandas", "Machine Learning"],
    type: "On-site"
  },
  {
    title: "Mobile App Development",
    company: "AppWorks Solutions",
    location: "Delhi",
    duration: "4 months",
    stipend: "₹18,000/month",
    description: "Develop mobile applications for Android and iOS platforms",
    requirements: ["React Native or Flutter experience", "Mobile UI/UX understanding"],
    skills: ["React Native", "Flutter", "Firebase", "Mobile Development"],
    type: "Remote"
  },
  {
    title: "DevOps Internship",
    company: "CloudTech Services",
    location: "Pune",
    duration: "3 months",
    stipend: "₹16,000/month",
    description: "Learn and implement CI/CD pipelines and cloud infrastructure",
    requirements: ["Basic Linux knowledge", "Understanding of Docker", "AWS basics"],
    skills: ["Docker", "Kubernetes", "AWS", "Jenkins"],
    type: "Hybrid"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Internship.deleteMany({});
    await Application.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const admin = new User({
      username: 'admin',
      email: 'admin@internhub.com',
      password: 'suhani123',
      fullName: 'Admin User',
      role: 'admin'
    });
    await admin.save();
    console.log('✅ Created admin user');

    // Create demo student
    const student = new User({
      username: 'demo',
      email: 'demo@internhub.com',
      password: 'demo123',
      fullName: 'Demo Student',
      role: 'student'
    });
    await student.save();
    console.log('✅ Created demo student');

    // Insert internships
    const internships = await Internship.insertMany(internshipsData);
    console.log('✅ Inserted internships data');

    // Create sample applications with random data
    const statuses = ['Pending', 'Under Review', 'Accepted', 'Rejected'];
    const feedbackMessages = [
      'Great portfolio! We are impressed with your work.',
      'Your application is being reviewed by our team.',
      'Thank you for applying. We will get back to you soon.',
      'Unfortunately, we cannot proceed with your application at this time.',
      'Excellent technical skills demonstrated.',
      'We would like to schedule an interview with you.',
      'Your profile matches our requirements perfectly.',
      'Please provide more details about your experience.'
    ];

    const applications = [];
    
    // Create 15 random applications
    for (let i = 0; i < 15; i++) {
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      const randomFeedback = randomStatus === 'Pending' ? '' : feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
      
      applications.push({
        userId: student._id,
        internshipId: internships[Math.floor(Math.random() * internships.length)]._id,
        status: randomStatus,
        appliedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
        adminFeedback: randomFeedback
      });
    }

    await Application.insertMany(applications);
    console.log('✅ Inserted 15 random applications');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin: username=admin, password=suhani123');
    console.log('Student: username=demo, password=demo123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
