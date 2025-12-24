import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/user.models.js';
import { Job } from './models/job.models.js';
import { Event } from './models/event.models.js';
import { Application } from './models/application.models.js';

dotenv.config();

// Demo data - 15 users for each role
const demoUsers = [
    // 15 Students
    { email: 'student1@example.com', password: 'student123', firstName: 'Rahul', lastName: 'Sharma', role: 'student', isEmailVerified: true, studentDetails: { collegeName: 'IIT Delhi', degree: 'B.Tech', branch: 'Computer Science', yearOfStudy: 3, enrollmentNumber: 'IIT2022CS001', cgpa: 8.5, skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB'], githubProfile: 'https://github.com/rahulsharma', linkedinProfile: 'https://linkedin.com/in/rahulsharma' } },
    { email: 'student2@example.com', password: 'student123', firstName: 'Priya', lastName: 'Patel', role: 'student', isEmailVerified: true, studentDetails: { collegeName: 'BITS Pilani', degree: 'B.Tech', branch: 'Information Technology', yearOfStudy: 4, enrollmentNumber: 'BITS2021IT042', cgpa: 9.2, skills: ['Java', 'Spring Boot', 'Angular', 'SQL', 'AWS'], githubProfile: 'https://github.com/priyapatel', linkedinProfile: 'https://linkedin.com/in/priyapatel' } },
    { email: 'student3@example.com', password: 'student123', firstName: 'Arjun', lastName: 'Kumar', role: 'student', isEmailVerified: true, studentDetails: { collegeName: 'NIT Trichy', degree: 'B.Tech', branch: 'Electronics', yearOfStudy: 2, enrollmentNumber: 'NIT2023EC115', cgpa: 7.8, skills: ['C++', 'Python', 'Machine Learning', 'TensorFlow'], githubProfile: 'https://github.com/arjunkumar', linkedinProfile: 'https://linkedin.com/in/arjunkumar' } },
    { email: 'student4@example.com', password: 'student123', firstName: 'Ananya', lastName: 'Singh', role: 'student', isEmailVerified: true, studentDetails: { collegeName: 'IIT Bombay', degree: 'B.Tech', branch: 'Computer Science', yearOfStudy: 4, enrollmentNumber: 'IITB2021CS023', cgpa: 9.0, skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Redis'], githubProfile: 'https://github.com/ananyasingh', linkedinProfile: 'https://linkedin.com/in/ananyasingh' } },
    { email: 'student5@example.com', password: 'student123', firstName: 'Karthik', lastName: 'Reddy', role: 'student', isEmailVerified: true, studentDetails: { collegeName: 'IIIT Hyderabad', degree: 'B.Tech', branch: 'Information Technology', yearOfStudy: 3, enrollmentNumber: 'IIIT2022IT067', cgpa: 8.8, skills: ['Go', 'Microservices', 'Kubernetes', 'gRPC'], githubProfile: 'https://github.com/karthikreddy', linkedinProfile: 'https://linkedin.com/in/karthikreddy' } },
    { email: 'student6@example.com', password: 'student123', firstName: 'Sneha', lastName: 'Gupta', role: 'student', isEmailVerified: true, studentDetails: { collegeName: 'NIT Warangal', degree: 'B.Tech', branch: 'Computer Science', yearOfStudy: 2, enrollmentNumber: 'NITW2023CS089', cgpa: 8.3, skills: ['C', 'Data Structures', 'Algorithms', 'Competitive Programming'], githubProfile: 'https://github.com/snehagupta', linkedinProfile: 'https://linkedin.com/in/snehagupta' } },
    { email: 'student7@example.com', password: 'student123', firstName: 'Rohan', lastName: 'Mehta', role: 'student', isEmailVerified: true, studentDetails: { collegeName: 'DTU Delhi', degree: 'B.Tech', branch: 'Information Technology', yearOfStudy: 4, enrollmentNumber: 'DTU2021IT034', cgpa: 7.9, skills: ['Flutter', 'Dart', 'Firebase', 'Mobile Development'], githubProfile: 'https://github.com/rohanmehta', linkedinProfile: 'https://linkedin.com/in/rohanmehta' } },
    { email: 'student8@example.com', password: 'student123', firstName: 'Divya', lastName: 'Nair', role: 'student', isEmailVerified: true, studentDetails: { collegeName: 'VIT Vellore', degree: 'B.Tech', branch: 'Computer Science', yearOfStudy: 3, enrollmentNumber: 'VIT2022CS145', cgpa: 8.7, skills: ['React Native', 'TypeScript', 'GraphQL', 'Apollo'], githubProfile: 'https://github.com/divyanair', linkedinProfile: 'https://linkedin.com/in/divyanair' } },
    { email: 'student9@example.com', password: 'student123', firstName: 'Aditya', lastName: 'Joshi', role: 'student', isEmailVerified: true, studentDetails: { collegeName: 'NSIT Delhi', degree: 'B.Tech', branch: 'Electronics', yearOfStudy: 2, enrollmentNumber: 'NSIT2023EC078', cgpa: 7.5, skills: ['IoT', 'Arduino', 'Raspberry Pi', 'Embedded Systems'], githubProfile: 'https://github.com/adityajoshi', linkedinProfile: 'https://linkedin.com/in/adityajoshi' } },
    { email: 'student10@example.com', password: 'student123', firstName: 'Ishita', lastName: 'Desai', role: 'student', isEmailVerified: true, studentDetails: { collegeName: 'Manipal Institute', degree: 'B.Tech', branch: 'Information Technology', yearOfStudy: 4, enrollmentNumber: 'MIT2021IT056', cgpa: 8.6, skills: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'Figma'], githubProfile: 'https://github.com/ishitadesai', linkedinProfile: 'https://linkedin.com/in/ishitadesai' } },
    { email: 'student11@example.com', password: 'student123', firstName: 'Siddharth', lastName: 'Kapoor', role: 'student', isEmailVerified: true, studentDetails: { collegeName: 'PEC Chandigarh', degree: 'B.Tech', branch: 'Computer Science', yearOfStudy: 3, enrollmentNumber: 'PEC2022CS091', cgpa: 8.2, skills: ['Swift', 'iOS Development', 'SwiftUI', 'Core Data'], githubProfile: 'https://github.com/siddharthkapoor', linkedinProfile: 'https://linkedin.com/in/siddharthkapoor' } },
    { email: 'student12@example.com', password: 'student123', firstName: 'Neha', lastName: 'Agarwal', role: 'student', isEmailVerified: true, studentDetails: { collegeName: 'BITS Goa', degree: 'B.Tech', branch: 'Computer Science', yearOfStudy: 2, enrollmentNumber: 'BITSG2023CS023', cgpa: 9.1, skills: ['Kotlin', 'Android', 'Jetpack Compose', 'Room DB'], githubProfile: 'https://github.com/nehaagarwal', linkedinProfile: 'https://linkedin.com/in/nehaagarwal' } },
    { email: 'student13@example.com', password: 'student123', firstName: 'Varun', lastName: 'Khanna', role: 'student', isEmailVerified: true, studentDetails: { collegeName: 'NIT Surathkal', degree: 'B.Tech', branch: 'Information Technology', yearOfStudy: 4, enrollmentNumber: 'NITS2021IT045', cgpa: 8.4, skills: ['Rust', 'WebAssembly', 'System Programming', 'Performance Optimization'], githubProfile: 'https://github.com/varunkhanna', linkedinProfile: 'https://linkedin.com/in/varunkhanna' } },
    { email: 'student14@example.com', password: 'student123', firstName: 'Pooja', lastName: 'Saxena', role: 'student', isEmailVerified: true, studentDetails: { collegeName: 'Thapar University', degree: 'B.Tech', branch: 'Computer Science', yearOfStudy: 3, enrollmentNumber: 'THAPAR2022CS067', cgpa: 7.7, skills: ['Ruby on Rails', 'PostgreSQL', 'Heroku', 'Sidekiq'], githubProfile: 'https://github.com/poojasaxena', linkedinProfile: 'https://linkedin.com/in/poojasaxena' } },
    { email: 'student15@example.com', password: 'student123', firstName: 'Akash', lastName: 'Verma', role: 'student', isEmailVerified: true, studentDetails: { collegeName: 'Jadavpur University', degree: 'B.Tech', branch: 'Electronics', yearOfStudy: 2, enrollmentNumber: 'JU2023EC134', cgpa: 8.1, skills: ['MATLAB', 'Signal Processing', 'Digital Electronics', 'VHDL'], githubProfile: 'https://github.com/akashverma', linkedinProfile: 'https://linkedin.com/in/akashverma' } },

    // 15 Companies
    { email: 'hr@techcorp.com', password: 'company123', firstName: 'Tech', lastName: 'Corp', role: 'company', isEmailVerified: true, companyDetails: { companyName: 'TechCorp Solutions', industry: 'Technology', companySize: '500-1000', website: 'https://techcorp.com', description: 'Leading IT solutions provider specializing in cloud computing and AI', location: 'Bangalore, Karnataka', hrContactName: 'Anjali Verma', hrContactEmail: 'anjali@techcorp.com', hrContactPhone: '+91-9876543210', isVerified: true } },
    { email: 'recruit@innovate.com', password: 'company123', firstName: 'Innovate', lastName: 'Labs', role: 'company', isEmailVerified: true, companyDetails: { companyName: 'Innovate Labs', industry: 'Software Development', companySize: '100-500', website: 'https://innovatelabs.com', description: 'Cutting-edge software development and consulting firm', location: 'Pune, Maharashtra', hrContactName: 'Rajesh Singh', hrContactEmail: 'rajesh@innovate.com', hrContactPhone: '+91-9876543211', isVerified: true } },
    { email: 'jobs@fintech.com', password: 'company123', firstName: 'FinTech', lastName: 'India', role: 'company', isEmailVerified: true, companyDetails: { companyName: 'FinTech India Pvt Ltd', industry: 'Financial Technology', companySize: '50-100', website: 'https://fintechindia.com', description: 'Revolutionary fintech startup transforming digital payments', location: 'Mumbai, Maharashtra', hrContactName: 'Sneha Reddy', hrContactEmail: 'sneha@fintech.com', hrContactPhone: '+91-9876543212', isVerified: true } },
    { email: 'careers@cloudnine.com', password: 'company123', firstName: 'Cloud', lastName: 'Nine', role: 'company', isEmailVerified: true, companyDetails: { companyName: 'CloudNine Technologies', industry: 'Cloud Services', companySize: '1000-5000', website: 'https://cloudnine.com', description: 'Enterprise cloud solutions and infrastructure management', location: 'Hyderabad, Telangana', hrContactName: 'Amit Patel', hrContactEmail: 'amit@cloudnine.com', hrContactPhone: '+91-9876543213', isVerified: true } },
    { email: 'hire@datascience.com', password: 'company123', firstName: 'Data', lastName: 'Science Inc', role: 'company', isEmailVerified: true, companyDetails: { companyName: 'DataScience Inc', industry: 'Analytics', companySize: '200-500', website: 'https://datascience.com', description: 'Big data analytics and machine learning solutions provider', location: 'Chennai, Tamil Nadu', hrContactName: 'Deepika Rao', hrContactEmail: 'deepika@datascience.com', hrContactPhone: '+91-9876543214', isVerified: true } },
    { email: 'talent@cybertech.com', password: 'company123', firstName: 'Cyber', lastName: 'Tech', role: 'company', isEmailVerified: true, companyDetails: { companyName: 'CyberTech Security', industry: 'Cybersecurity', companySize: '100-200', website: 'https://cybertech.com', description: 'Leading cybersecurity and information security services', location: 'Noida, Uttar Pradesh', hrContactName: 'Rahul Malhotra', hrContactEmail: 'rahul@cybertech.com', hrContactPhone: '+91-9876543215', isVerified: true } },
    { email: 'recruitment@healthtech.com', password: 'company123', firstName: 'Health', lastName: 'Tech', role: 'company', isEmailVerified: true, companyDetails: { companyName: 'HealthTech Solutions', industry: 'Healthcare Technology', companySize: '50-100', website: 'https://healthtech.com', description: 'Digital healthcare and telemedicine platform', location: 'Bangalore, Karnataka', hrContactName: 'Priya Sharma', hrContactEmail: 'priya@healthtech.com', hrContactPhone: '+91-9876543216', isVerified: true } },
    { email: 'hr@edutech.com', password: 'company123', firstName: 'Edu', lastName: 'Tech', role: 'company', isEmailVerified: true, companyDetails: { companyName: 'EduTech Learning', industry: 'Education Technology', companySize: '500-1000', website: 'https://edutech.com', description: 'Online learning platform with AI-powered personalization', location: 'Delhi, NCR', hrContactName: 'Vikram Singh', hrContactEmail: 'vikram@edutech.com', hrContactPhone: '+91-9876543217', isVerified: true } },
    { email: 'jobs@ecommerce.com', password: 'company123', firstName: 'E-Commerce', lastName: 'Hub', role: 'company', isEmailVerified: true, companyDetails: { companyName: 'E-Commerce Hub', industry: 'E-Commerce', companySize: '1000-5000', website: 'https://ecommercehub.com', description: 'Leading online retail platform with millions of products', location: 'Mumbai, Maharashtra', hrContactName: 'Neha Gupta', hrContactEmail: 'neha@ecommerce.com', hrContactPhone: '+91-9876543218', isVerified: true } },
    { email: 'careers@gaming.com', password: 'company123', firstName: 'Gaming', lastName: 'Studio', role: 'company', isEmailVerified: true, companyDetails: { companyName: 'Gaming Studio Pro', industry: 'Gaming', companySize: '200-500', website: 'https://gamingstudio.com', description: 'Mobile and console game development studio', location: 'Pune, Maharashtra', hrContactName: 'Arun Kumar', hrContactEmail: 'arun@gaming.com', hrContactPhone: '+91-9876543219', isVerified: true } },
    { email: 'recruit@blockchain.com', password: 'company123', firstName: 'Block', lastName: 'Chain', role: 'company', isEmailVerified: true, companyDetails: { companyName: 'BlockChain Innovations', industry: 'Blockchain', companySize: '50-100', website: 'https://blockchain.com', description: 'Blockchain development and cryptocurrency solutions', location: 'Bangalore, Karnataka', hrContactName: 'Sanjay Mehta', hrContactEmail: 'sanjay@blockchain.com', hrContactPhone: '+91-9876543220', isVerified: true } },
    { email: 'hr@iot.com', password: 'company123', firstName: 'IoT', lastName: 'Solutions', role: 'company', isEmailVerified: true, companyDetails: { companyName: 'IoT Solutions Ltd', industry: 'Internet of Things', companySize: '100-200', website: 'https://iotsolutions.com', description: 'Smart home and industrial IoT solutions provider', location: 'Hyderabad, Telangana', hrContactName: 'Kavita Desai', hrContactEmail: 'kavita@iot.com', hrContactPhone: '+91-9876543221', isVerified: true } },
    { email: 'talent@aitech.com', password: 'company123', firstName: 'AI', lastName: 'Tech', role: 'company', isEmailVerified: true, companyDetails: { companyName: 'AI Technologies', industry: 'Artificial Intelligence', companySize: '200-500', website: 'https://aitech.com', description: 'AI research and development company focusing on NLP and CV', location: 'Chennai, Tamil Nadu', hrContactName: 'Rohan Kapoor', hrContactEmail: 'rohan@aitech.com', hrContactPhone: '+91-9876543222', isVerified: true } },
    { email: 'jobs@robotics.com', password: 'company123', firstName: 'Robotics', lastName: 'Corp', role: 'company', isEmailVerified: true, companyDetails: { companyName: 'Robotics Corporation', industry: 'Robotics', companySize: '100-200', website: 'https://roboticscorp.com', description: 'Industrial automation and robotics manufacturing', location: 'Ahmedabad, Gujarat', hrContactName: 'Pooja Jain', hrContactEmail: 'pooja@robotics.com', hrContactPhone: '+91-9876543223', isVerified: true } },
    { email: 'careers@quantum.com', password: 'company123', firstName: 'Quantum', lastName: 'Computing', role: 'company', isEmailVerified: true, companyDetails: { companyName: 'Quantum Computing Labs', industry: 'Quantum Computing', companySize: '50-100', website: 'https://quantumcomputing.com', description: 'Quantum computing research and development', location: 'Bangalore, Karnataka', hrContactName: 'Arvind Shah', hrContactEmail: 'arvind@quantum.com', hrContactPhone: '+91-9876543224', isVerified: true } },

    // 15 Alumni
    { email: 'alumni1@example.com', password: 'alumni123', firstName: 'Vikram', lastName: 'Malhotra', role: 'alumni', isEmailVerified: true, alumniDetails: { collegeName: 'IIT Delhi', graduationYear: 2018, degree: 'B.Tech', branch: 'Computer Science', currentCompany: 'Google', currentDesignation: 'Senior Software Engineer', experience: 7, expertise: ['System Design', 'Cloud Architecture', 'Leadership'], linkedinProfile: 'https://linkedin.com/in/vikrammalhotra', mentorshipAvailable: true } },
    { email: 'alumni2@example.com', password: 'alumni123', firstName: 'Meera', lastName: 'Iyer', role: 'alumni', isEmailVerified: true, alumniDetails: { collegeName: 'BITS Pilani', graduationYear: 2015, degree: 'B.Tech', branch: 'Information Technology', currentCompany: 'Amazon', currentDesignation: 'Engineering Manager', experience: 10, expertise: ['Product Management', 'Agile', 'Team Building'], linkedinProfile: 'https://linkedin.com/in/meeraiyer', mentorshipAvailable: true } },
    { email: 'alumni3@example.com', password: 'alumni123', firstName: 'Sameer', lastName: 'Khan', role: 'alumni', isEmailVerified: true, alumniDetails: { collegeName: 'IIT Bombay', graduationYear: 2016, degree: 'B.Tech', branch: 'Computer Science', currentCompany: 'Microsoft', currentDesignation: 'Principal Engineer', experience: 9, expertise: ['Distributed Systems', 'Microservices', 'Azure'], linkedinProfile: 'https://linkedin.com/in/sameerkhan', mentorshipAvailable: true } },
    { email: 'alumni4@example.com', password: 'alumni123', firstName: 'Riya', lastName: 'Chopra', role: 'alumni', isEmailVerified: true, alumniDetails: { collegeName: 'NIT Trichy', graduationYear: 2017, degree: 'B.Tech', branch: 'Electronics', currentCompany: 'Apple', currentDesignation: 'Hardware Engineer', experience: 8, expertise: ['Circuit Design', 'IoT', 'Embedded Systems'], linkedinProfile: 'https://linkedin.com/in/riyachopra', mentorshipAvailable: true } },
    { email: 'alumni5@example.com', password: 'alumni123', firstName: 'Aryan', lastName: 'Sinha', role: 'alumni', isEmailVerified: true, alumniDetails: { collegeName: 'IIIT Hyderabad', graduationYear: 2014, degree: 'B.Tech', branch: 'Computer Science', currentCompany: 'Meta', currentDesignation: 'Staff Software Engineer', experience: 11, expertise: ['React', 'Frontend Architecture', 'Performance'], linkedinProfile: 'https://linkedin.com/in/aryansinha', mentorshipAvailable: true } },
    { email: 'alumni6@example.com', password: 'alumni123', firstName: 'Tanya', lastName: 'Bhatt', role: 'alumni', isEmailVerified: true, alumniDetails: { collegeName: 'DTU Delhi', graduationYear: 2019, degree: 'B.Tech', branch: 'Information Technology', currentCompany: 'Netflix', currentDesignation: 'Software Engineer', experience: 6, expertise: ['Backend Development', 'Scalability', 'Streaming'], linkedinProfile: 'https://linkedin.com/in/tanyabhatt', mentorshipAvailable: true } },
    { email: 'alumni7@example.com', password: 'alumni123', firstName: 'Karan', lastName: 'Sethi', role: 'alumni', isEmailVerified: true, alumniDetails: { collegeName: 'VIT Vellore', graduationYear: 2016, degree: 'B.Tech', branch: 'Computer Science', currentCompany: 'Tesla', currentDesignation: 'Software Engineer', experience: 9, expertise: ['Autonomous Systems', 'Machine Learning', 'Python'], linkedinProfile: 'https://linkedin.com/in/karansethi', mentorshipAvailable: true } },
    { email: 'alumni8@example.com', password: 'alumni123', firstName: 'Simran', lastName: 'Kaur', role: 'alumni', isEmailVerified: true, alumniDetails: { collegeName: 'NIT Warangal', graduationYear: 2015, degree: 'B.Tech', branch: 'Information Technology', currentCompany: 'Adobe', currentDesignation: 'Senior Product Manager', experience: 10, expertise: ['Product Strategy', 'UX Design', 'Analytics'], linkedinProfile: 'https://linkedin.com/in/simrankaur', mentorshipAvailable: false } },
    { email: 'alumni9@example.com', password: 'alumni123', firstName: 'Nikhil', lastName: 'Bose', role: 'alumni', isEmailVerified: true, alumniDetails: { collegeName: 'BITS Goa', graduationYear: 2018, degree: 'B.Tech', branch: 'Computer Science', currentCompany: 'Uber', currentDesignation: 'Tech Lead', experience: 7, expertise: ['Mobile Development', 'React Native', 'Architecture'], linkedinProfile: 'https://linkedin.com/in/nikhilbose', mentorshipAvailable: true } },
    { email: 'alumni10@example.com', password: 'alumni123', firstName: 'Anjali', lastName: 'Pillai', role: 'alumni', isEmailVerified: true, alumniDetails: { collegeName: 'PEC Chandigarh', graduationYear: 2017, degree: 'B.Tech', branch: 'Computer Science', currentCompany: 'Airbnb', currentDesignation: 'Senior Engineer', experience: 8, expertise: ['Full Stack', 'Ruby on Rails', 'DevOps'], linkedinProfile: 'https://linkedin.com/in/anjalipillai', mentorshipAvailable: true } },
    { email: 'alumni11@example.com', password: 'alumni123', firstName: 'Harsh', lastName: 'Agarwal', role: 'alumni', isEmailVerified: true, alumniDetails: { collegeName: 'IIT Madras', graduationYear: 2016, degree: 'B.Tech', branch: 'Computer Science', currentCompany: 'Salesforce', currentDesignation: 'Lead Engineer', experience: 9, expertise: ['CRM', 'Cloud Computing', 'Integration'], linkedinProfile: 'https://linkedin.com/in/harshagarwal', mentorshipAvailable: false } },
    { email: 'alumni12@example.com', password: 'alumni123', firstName: 'Nisha', lastName: 'Rao', role: 'alumni', isEmailVerified: true, alumniDetails: { collegeName: 'Manipal Institute', graduationYear: 2019, degree: 'B.Tech', branch: 'Information Technology', currentCompany: 'PayPal', currentDesignation: 'Software Engineer', experience: 6, expertise: ['Payment Systems', 'Security', 'Java'], linkedinProfile: 'https://linkedin.com/in/nisharao', mentorshipAvailable: true } },
    { email: 'alumni13@example.com', password: 'alumni123', firstName: 'Yash', lastName: 'Thakur', role: 'alumni', isEmailVerified: true, alumniDetails: { collegeName: 'NIT Surathkal', graduationYear: 2015, degree: 'B.Tech', branch: 'Computer Science', currentCompany: 'Oracle', currentDesignation: 'Principal Consultant', experience: 10, expertise: ['Database', 'SQL', 'Performance Tuning'], linkedinProfile: 'https://linkedin.com/in/yashthakur', mentorshipAvailable: true } },
    { email: 'alumni14@example.com', password: 'alumni123', firstName: 'Megha', lastName: 'Deshmukh', role: 'alumni', isEmailVerified: true, alumniDetails: { collegeName: 'Thapar University', graduationYear: 2018, degree: 'B.Tech', branch: 'Computer Science', currentCompany: 'Flipkart', currentDesignation: 'Senior SDE', experience: 7, expertise: ['E-commerce', 'Distributed Systems', 'Scala'], linkedinProfile: 'https://linkedin.com/in/meghadeshmukh', mentorshipAvailable: true } },
    { email: 'alumni15@example.com', password: 'alumni123', firstName: 'Aakash', lastName: 'Mishra', role: 'alumni', isEmailVerified: true, alumniDetails: { collegeName: 'Jadavpur University', graduationYear: 2017, degree: 'B.Tech', branch: 'Information Technology', currentCompany: 'IBM', currentDesignation: 'Staff Engineer', experience: 8, expertise: ['Blockchain', 'Hyperledger', 'Enterprise Solutions'], linkedinProfile: 'https://linkedin.com/in/aakashmishra', mentorshipAvailable: false } },

    // 15 TPOs
    { email: 'tpo@iitdelhi.ac.in', password: 'tpo12345', firstName: 'Dr. Anil', lastName: 'Gupta', role: 'tpo', isEmailVerified: true, tpoDetails: { collegeName: 'IIT Delhi', collegeCode: 'IIT-D', designation: 'Training & Placement Officer', department: 'Career Services', contactNumber: '+91-9876543230', officeAddress: 'Career Development Centre, IIT Delhi', collegeWebsite: 'https://iitd.ac.in', affiliatedUniversity: 'IIT Delhi' } },
    { email: 'tpo@bits.ac.in', password: 'tpo12345', firstName: 'Prof. Sunita', lastName: 'Rao', role: 'tpo', isEmailVerified: true, tpoDetails: { collegeName: 'BITS Pilani', collegeCode: 'BITS-PIL', designation: 'Placement Coordinator', department: 'Career Services', contactNumber: '+91-9876543231', officeAddress: 'Placement Cell, BITS Pilani', collegeWebsite: 'https://bits-pilani.ac.in', affiliatedUniversity: 'BITS Pilani' } },
    { email: 'tpo@iitbombay.ac.in', password: 'tpo12345', firstName: 'Dr. Rajesh', lastName: 'Kumar', role: 'tpo', isEmailVerified: true, tpoDetails: { collegeName: 'IIT Bombay', collegeCode: 'IITB', designation: 'Placement Head', department: 'Training & Placement Cell', contactNumber: '+91-9876543232', officeAddress: 'IIT Bombay Campus', collegeWebsite: 'https://iitb.ac.in', affiliatedUniversity: 'IIT Bombay' } },
    { email: 'tpo@nittrichy.ac.in', password: 'tpo12345', firstName: 'Prof. Meena', lastName: 'Iyer', role: 'tpo', isEmailVerified: true, tpoDetails: { collegeName: 'NIT Trichy', collegeCode: 'NITT', designation: 'TPO', department: 'Placement Office', contactNumber: '+91-9876543233', officeAddress: 'NIT Trichy Campus', collegeWebsite: 'https://nitt.ac.in', affiliatedUniversity: 'NIT Trichy' } },
    { email: 'tpo@iiith.ac.in', password: 'tpo12345', firstName: 'Dr. Suresh', lastName: 'Reddy', role: 'tpo', isEmailVerified: true, tpoDetails: { collegeName: 'IIIT Hyderabad', collegeCode: 'IIITH', designation: 'Training & Placement Officer', department: 'Career Development', contactNumber: '+91-9876543234', officeAddress: 'IIIT Hyderabad Campus', collegeWebsite: 'https://iiit.ac.in', affiliatedUniversity: 'IIIT Hyderabad' } },
    { email: 'tpo@dtu.ac.in', password: 'tpo12345', firstName: 'Prof. Alok', lastName: 'Singh', role: 'tpo', isEmailVerified: true, tpoDetails: { collegeName: 'DTU Delhi', collegeCode: 'DTU', designation: 'Placement Coordinator', department: 'Training & Placement', contactNumber: '+91-9876543235', officeAddress: 'DTU Main Campus', collegeWebsite: 'https://dtu.ac.in', affiliatedUniversity: 'Delhi Technological University' } },
    { email: 'tpo@vit.ac.in', password: 'tpo12345', firstName: 'Dr. Lakshmi', lastName: 'Narayan', role: 'tpo', isEmailVerified: true, tpoDetails: { collegeName: 'VIT Vellore', collegeCode: 'VIT', designation: 'Placement Director', department: 'Career Development Centre', contactNumber: '+91-9876543236', officeAddress: 'VIT University Campus', collegeWebsite: 'https://vit.ac.in', affiliatedUniversity: 'VIT University' } },
    { email: 'tpo@nitw.ac.in', password: 'tpo12345', firstName: 'Prof. Madhavi', lastName: 'Sharma', role: 'tpo', isEmailVerified: true, tpoDetails: { collegeName: 'NIT Warangal', collegeCode: 'NITW', designation: 'TPO', department: 'Placement Cell', contactNumber: '+91-9876543237', officeAddress: 'NIT Warangal Campus', collegeWebsite: 'https://nitw.ac.in', affiliatedUniversity: 'NIT Warangal' } },
    { email: 'tpo@bitsgoa.ac.in', password: 'tpo12345', firstName: 'Dr. Prakash', lastName: 'Joshi', role: 'tpo', isEmailVerified: true, tpoDetails: { collegeName: 'BITS Goa', collegeCode: 'BITS-GOA', designation: 'Placement Coordinator', department: 'Career Services', contactNumber: '+91-9876543238', officeAddress: 'BITS Goa Campus', collegeWebsite: 'https://bits-goa.ac.in', affiliatedUniversity: 'BITS Pilani' } },
    { email: 'tpo@pec.ac.in', password: 'tpo12345', firstName: 'Prof. Harpreet', lastName: 'Kaur', role: 'tpo', isEmailVerified: true, tpoDetails: { collegeName: 'PEC Chandigarh', collegeCode: 'PEC', designation: 'Training & Placement Officer', department: 'T&P Cell', contactNumber: '+91-9876543239', officeAddress: 'PEC Campus, Chandigarh', collegeWebsite: 'https://pec.ac.in', affiliatedUniversity: 'Punjab Engineering College' } },
    { email: 'tpo@manipal.ac.in', password: 'tpo12345', firstName: 'Dr. Venkat', lastName: 'Rao', role: 'tpo', isEmailVerified: true, tpoDetails: { collegeName: 'Manipal Institute', collegeCode: 'MIT', designation: 'Placement Head', department: 'Career Resource Centre', contactNumber: '+91-9876543240', officeAddress: 'MIT Campus, Manipal', collegeWebsite: 'https://manipal.edu', affiliatedUniversity: 'Manipal Academy' } },
    { email: 'tpo@nits.ac.in', password: 'tpo12345', firstName: 'Prof. Ashok', lastName: 'Nair', role: 'tpo', isEmailVerified: true, tpoDetails: { collegeName: 'NIT Surathkal', collegeCode: 'NITS', designation: 'TPO', department: 'Training & Placement', contactNumber: '+91-9876543241', officeAddress: 'NITK Surathkal Campus', collegeWebsite: 'https://nitk.ac.in', affiliatedUniversity: 'NIT Surathkal' } },
    { email: 'tpo@thapar.ac.in', password: 'tpo12345', firstName: 'Dr. Renu', lastName: 'Gupta', role: 'tpo', isEmailVerified: true, tpoDetails: { collegeName: 'Thapar University', collegeCode: 'TIET', designation: 'Placement Coordinator', department: 'Career Services', contactNumber: '+91-9876543242', officeAddress: 'Thapar Institute Campus', collegeWebsite: 'https://thapar.edu', affiliatedUniversity: 'Thapar Institute' } },
    { email: 'tpo@jadavpur.ac.in', password: 'tpo12345', firstName: 'Prof. Subrata', lastName: 'Bose', role: 'tpo', isEmailVerified: true, tpoDetails: { collegeName: 'Jadavpur University', collegeCode: 'JU', designation: 'Training & Placement Officer', department: 'Placement Cell', contactNumber: '+91-9876543243', officeAddress: 'Jadavpur University Campus', collegeWebsite: 'https://jadavpuruniversity.in', affiliatedUniversity: 'Jadavpur University' } },
    { email: 'tpo@nsit.ac.in', password: 'tpo12345', firstName: 'Dr. Kavita', lastName: 'Mehta', role: 'tpo', isEmailVerified: true, tpoDetails: { collegeName: 'NSIT Delhi', collegeCode: 'NSIT', designation: 'Placement Head', department: 'Training & Placement', contactNumber: '+91-9876543244', officeAddress: 'NSIT Campus, Delhi', collegeWebsite: 'https://nsit.ac.in', affiliatedUniversity: 'NSUT Delhi' } },
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/national_tpo_portal');
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await User.deleteMany({});
        await Job.deleteMany({});
        await Event.deleteMany({});
        await Application.deleteMany({});

        // Create users
        console.log('👥 Creating demo users...');
        const createdUsers = await User.insertMany(demoUsers);
        console.log(`✅ Created ${createdUsers.length} users`);

        // Get company and student IDs
        const companies = createdUsers.filter(u => u.role === 'company');
        const students = createdUsers.filter(u => u.role === 'student');
        const alumni = createdUsers.filter(u => u.role === 'alumni');

        // Create Jobs
        console.log('💼 Creating demo jobs...');
        const demoJobs = [
            {
                companyId: companies[0]._id,
                title: 'Full Stack Developer',
                description: 'Looking for a talented full-stack developer with expertise in MERN stack. You will work on cutting-edge web applications and collaborate with cross-functional teams.',
                jobType: 'full_time',
                location: 'Bangalore, Karnataka',
                salary: { min: 600000, max: 1200000, currency: 'INR' },
                eligibility: {
                    minCGPA: 7.0,
                    degrees: ['B.Tech', 'M.Tech', 'MCA'],
                    branches: ['Computer Science', 'Information Technology'],
                    yearOfStudy: [3, 4],
                    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB']
                },
                requirements: [
                    'Strong knowledge of JavaScript and modern frameworks',
                    'Experience with RESTful APIs',
                    'Good understanding of database systems',
                    'Excellent problem-solving skills'
                ],
                benefits: ['Health Insurance', 'Work from Home', 'Learning Budget', 'Flexible Hours'],
                applicationDeadline: new Date('2025-02-28'),
                isActive: true
            },
            {
                companyId: companies[1]._id,
                title: 'Backend Developer Intern',
                description: 'Exciting internship opportunity for backend development enthusiasts. Work with Java Spring Boot and learn enterprise application development.',
                jobType: 'internship',
                location: 'Pune, Maharashtra',
                salary: { min: 25000, max: 40000, currency: 'INR' },
                eligibility: {
                    minCGPA: 6.5,
                    degrees: ['B.Tech', 'BE'],
                    branches: ['Computer Science', 'Information Technology', 'Electronics'],
                    yearOfStudy: [2, 3],
                    skills: ['Java', 'Spring Boot', 'SQL']
                },
                requirements: [
                    'Basic understanding of Java programming',
                    'Familiarity with databases',
                    'Eagerness to learn and grow'
                ],
                benefits: ['Stipend', 'Certificate', 'Mentorship', 'PPO Opportunity'],
                applicationDeadline: new Date('2025-01-31'),
                isActive: true
            },
            {
                companyId: companies[2]._id,
                title: 'Data Analyst',
                description: 'Join our data team to analyze financial data and provide insights for business decisions. Great opportunity in the fintech domain.',
                jobType: 'full_time',
                location: 'Mumbai, Maharashtra',
                salary: { min: 500000, max: 800000, currency: 'INR' },
                eligibility: {
                    minCGPA: 7.5,
                    degrees: ['B.Tech', 'M.Tech', 'MBA'],
                    branches: ['Computer Science', 'Information Technology', 'Statistics'],
                    yearOfStudy: [4],
                    skills: ['Python', 'SQL', 'Excel', 'Data Visualization']
                },
                requirements: [
                    'Strong analytical skills',
                    'Experience with Python and SQL',
                    'Knowledge of statistical methods',
                    'Good communication skills'
                ],
                benefits: ['ESOP', 'Health Insurance', 'Performance Bonus', 'Learning Budget'],
                applicationDeadline: new Date('2025-03-15'),
                isActive: true
            },
            {
                companyId: companies[0]._id,
                title: 'DevOps Engineer',
                description: 'Build and maintain CI/CD pipelines, manage cloud infrastructure, and ensure high availability of services.',
                jobType: 'full_time',
                location: 'Bangalore, Karnataka',
                salary: { min: 700000, max: 1500000, currency: 'INR' },
                eligibility: {
                    minCGPA: 7.0,
                    degrees: ['B.Tech', 'M.Tech'],
                    branches: ['Computer Science', 'Information Technology'],
                    yearOfStudy: [4],
                    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Linux']
                },
                requirements: [
                    'Experience with cloud platforms (AWS/Azure)',
                    'Knowledge of containerization',
                    'Understanding of CI/CD concepts',
                    'Scripting skills (Python/Bash)'
                ],
                benefits: ['Stock Options', 'Remote Work', 'Conference Budget', 'Team Outings'],
                applicationDeadline: new Date('2025-02-15'),
                isActive: true
            },
            {
                companyId: companies[1]._id,
                title: 'UI/UX Designer Intern',
                description: 'Creative internship for designing beautiful and intuitive user interfaces. Work with product and engineering teams.',
                jobType: 'internship',
                location: 'Remote',
                salary: { min: 20000, max: 35000, currency: 'INR' },
                eligibility: {
                    minCGPA: 6.0,
                    degrees: ['B.Des', 'B.Tech', 'BFA'],
                    branches: ['Design', 'Computer Science', 'Fine Arts'],
                    yearOfStudy: [2, 3, 4],
                    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping']
                },
                requirements: [
                    'Portfolio showcasing design work',
                    'Understanding of design principles',
                    'Passion for user experience'
                ],
                benefits: ['Remote Work', 'Flexible Hours', 'Mentorship', 'Portfolio Building'],
                applicationDeadline: new Date('2025-01-25'),
                isActive: true
            }
        ];

        const createdJobs = await Job.insertMany(demoJobs);
        console.log(`✅ Created ${createdJobs.length} jobs`);

        // Create Events
        console.log('🎉 Creating demo events...');
        const demoEvents = [
            {
                organizerId: companies[0]._id,
                title: 'TechCorp Hackathon 2025',
                description: 'Join us for an exciting 48-hour hackathon! Build innovative solutions, win prizes worth ₹5 lakhs, and get direct interview opportunities.',
                eventType: 'hackathon',
                startDate: new Date('2025-02-15T09:00:00'),
                endDate: new Date('2025-02-17T18:00:00'),
                location: {
                    venue: 'TechCorp Campus',
                    city: 'Bangalore',
                    isOnline: false
                },
                eligibility: {
                    degrees: ['B.Tech', 'M.Tech', 'MCA'],
                    branches: ['Computer Science', 'Information Technology', 'Electronics'],
                    yearOfStudy: [2, 3, 4]
                },
                registrationDeadline: new Date('2025-02-10'),
                maxParticipants: 200,
                currentParticipants: 45,
                tags: ['hackathon', 'coding', 'innovation', 'prizes'],
                isActive: true
            },
            {
                organizerId: companies[1]._id,
                title: 'Web Development Workshop',
                description: 'Learn modern web development with React and Node.js from industry experts. Hands-on sessions with real-world projects.',
                eventType: 'workshop',
                startDate: new Date('2025-01-20T10:00:00'),
                endDate: new Date('2025-01-20T17:00:00'),
                location: {
                    venue: 'Online',
                    city: 'Virtual',
                    isOnline: true,
                    meetingLink: 'https://meet.google.com/xyz-demo-link'
                },
                eligibility: {
                    degrees: ['B.Tech', 'BE', 'MCA'],
                    branches: ['Computer Science', 'Information Technology'],
                    yearOfStudy: [1, 2, 3, 4]
                },
                registrationDeadline: new Date('2025-01-18'),
                maxParticipants: 100,
                currentParticipants: 67,
                tags: ['workshop', 'web development', 'react', 'nodejs'],
                isActive: true
            },
            {
                organizerId: alumni[0]._id,
                title: 'Career Guidance Webinar',
                description: 'Alumni interaction session on career paths in tech industry. Learn from Google engineer about career growth, interview preparation, and industry insights.',
                eventType: 'webinar',
                startDate: new Date('2025-01-25T18:00:00'),
                endDate: new Date('2025-01-25T20:00:00'),
                location: {
                    venue: 'Zoom',
                    city: 'Virtual',
                    isOnline: true,
                    meetingLink: 'https://zoom.us/j/demo-career-webinar'
                },
                eligibility: {
                    degrees: ['B.Tech', 'M.Tech', 'BE', 'MCA'],
                    branches: ['All'],
                    yearOfStudy: [3, 4]
                },
                registrationDeadline: new Date('2025-01-24'),
                maxParticipants: 500,
                currentParticipants: 234,
                tags: ['career', 'guidance', 'alumni', 'google'],
                isActive: true
            },
            {
                organizerId: companies[2]._id,
                title: 'FinTech Career Fair',
                description: 'Exclusive placement drive by leading fintech companies. Direct interviews, resume reviews, and networking opportunities.',
                eventType: 'career_fair',
                startDate: new Date('2025-03-01T09:00:00'),
                endDate: new Date('2025-03-01T17:00:00'),
                location: {
                    venue: 'Hotel Grand Plaza',
                    city: 'Mumbai',
                    isOnline: false
                },
                eligibility: {
                    degrees: ['B.Tech', 'M.Tech', 'MBA', 'MCA'],
                    branches: ['Computer Science', 'Information Technology', 'Finance'],
                    yearOfStudy: [4]
                },
                registrationDeadline: new Date('2025-02-25'),
                maxParticipants: 300,
                currentParticipants: 89,
                tags: ['placement', 'career fair', 'fintech', 'jobs'],
                isActive: true
            }
        ];

        const createdEvents = await Event.insertMany(demoEvents);
        console.log(`✅ Created ${createdEvents.length} events`);

        // Create some applications
        console.log('📝 Creating demo applications...');
        const demoApplications = [
            {
                studentId: students[0]._id,
                jobId: createdJobs[0]._id,
                companyId: companies[0]._id,
                status: 'shortlisted',
                coverLetter: 'I am excited to apply for the Full Stack Developer position. My experience with MERN stack aligns perfectly with the requirements.',
                resume: 'https://example.com/resume/rahul-sharma.pdf',
                statusHistory: [
                    { status: 'pending', updatedAt: new Date('2025-01-10') },
                    { status: 'reviewed', updatedAt: new Date('2025-01-12') },
                    { status: 'shortlisted', updatedAt: new Date('2025-01-15') }
                ]
            },
            {
                studentId: students[1]._id,
                jobId: createdJobs[1]._id,
                companyId: companies[1]._id,
                status: 'reviewed',
                coverLetter: 'Enthusiastic about backend development and eager to learn Spring Boot in a professional environment.',
                resume: 'https://example.com/resume/priya-patel.pdf',
                statusHistory: [
                    { status: 'pending', updatedAt: new Date('2025-01-11') },
                    { status: 'reviewed', updatedAt: new Date('2025-01-14') }
                ]
            },
            {
                studentId: students[0]._id,
                jobId: createdJobs[3]._id,
                companyId: companies[0]._id,
                status: 'pending',
                coverLetter: 'Passionate about DevOps and cloud technologies. Have hands-on experience with AWS and Docker.',
                resume: 'https://example.com/resume/rahul-sharma.pdf',
                statusHistory: [
                    { status: 'pending', updatedAt: new Date('2025-01-18') }
                ]
            }
        ];

        const createdApplications = await Application.insertMany(demoApplications);
        console.log(`✅ Created ${createdApplications.length} applications`);

        // Register students for events
        console.log('🎟️ Registering students for events...');
        await Event.findByIdAndUpdate(createdEvents[0]._id, {
            $push: {
                registeredStudents: [
                    { studentId: students[0]._id, registeredAt: new Date() },
                    { studentId: students[1]._id, registeredAt: new Date() }
                ]
            },
            $inc: { currentParticipants: 2 }
        });

        await Event.findByIdAndUpdate(createdEvents[1]._id, {
            $push: {
                registeredStudents: [
                    { studentId: students[2]._id, registeredAt: new Date() }
                ]
            },
            $inc: { currentParticipants: 1 }
        });

        console.log('\n✅ Database seeded successfully!');
        console.log('\n📊 Demo Accounts Created:');
        console.log('\n👨‍🎓 Students (15):');
        console.log('   📧 student1@example.com to student15@example.com');
        console.log('   🔑 Password: student123');
        console.log('\n🏢 Companies (15):');
        console.log('   📧 hr@techcorp.com, recruit@innovate.com, jobs@fintech.com, etc.');
        console.log('   🔑 Password: company123');
        console.log('\n🎓 Alumni (15):');
        console.log('   📧 alumni1@example.com to alumni15@example.com');
        console.log('   🔑 Password: alumni123');
        console.log('\n👔 TPO (15):');
        console.log('   📧 tpo@iitdelhi.ac.in, tpo@bits.ac.in, tpo@iitbombay.ac.in, etc.');
        console.log('   🔑 Password: tpo12345');
        console.log('\n💼 Jobs Created: 5');
        console.log('🎉 Events Created: 4');
        console.log('📝 Applications Created: 3');
        console.log('\n💡 Total Users: 60 (15 of each role)\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
