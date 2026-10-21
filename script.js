// ==========================================
// 1. FIREBASE INITIALIZATION & CONFIGURATION
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCudiGn6mRbOhrEObccDHdDWEd55fXmCp0",
  authDomain: "vbspuattend-portal.firebaseapp.com",
  projectId: "vbspuattend-portal",
  storageBucket: "vbspuattend-portal.firebasestorage.app",
  messagingSenderId: "128651010196",
  appId: "1:128651010196:web:2c5128bde6433e63ead481",
  measurementId: "G-0PR63QG738"
};

// Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
const dbStore = getFirestore(app);

// ==========================================
// 2. COMPREHENSIVE UNSIET DATABASE STRUCTURE
// ==========================================
let db = {
    currentUser: sessionStorage.getItem('current_user') || null,
    currentRoll: sessionStorage.getItem('current_roll') || null,
    role: sessionStorage.getItem('user_role') || null, // 'student' or 'admin'
    
    // All Department Subjects and Labs categorized properly
    subjects: [
        // --- 1. B.Tech CSE II Year (III Semester - Batch A & B) ---
        { id: 1, name: '[B.Tech CSE III Sem] BCS-301: Data Structure (DS)', type: 'Subject' },
        { id: 2, name: '[B.Tech CSE III Sem] BCS-302: Computer Organization & Architecture (COA)', type: 'Subject' },
        { id: 3, name: '[B.Tech CSE III Sem] BCS-303: Discrete Structures & Theory of Logic (DSTL)', type: 'Subject' },
        { id: 4, name: '[B.Tech CSE III Sem] BOE-032: Digital Electronics (DE)', type: 'Subject' },
        { id: 5, name: '[B.Tech CSE III Sem] BVE-301: Universal Human Values (UHV)', type: 'Subject' },
        { id: 6, name: '[B.Tech CSE III Sem] BCC-301: Cyber Security', type: 'Subject' },
        { id: 7, name: '[B.Tech CSE III Sem] BCS-351: Data Structure Lab (DS Lab)', type: 'Lab' },
        { id: 8, name: '[B.Tech CSE III Sem] BCS-352: COA Lab', type: 'Lab' },
        { id: 9, name: '[B.Tech CSE III Sem] BCC-351: Mini Project', type: 'Lab' },
        { id: 10, name: '[B.Tech CSE III Sem] BCS-353: WD Workshop Lab', type: 'Lab' },

        // --- 2. B.Tech CSE III Year (V Semester) ---
        { id: 11, name: '[B.Tech CSE V Sem] KCS-501: Database Management System (DBMS)', type: 'Subject' },
        { id: 12, name: '[B.Tech CSE V Sem] KCS-502: Compiler Design (CD)', type: 'Subject' },
        { id: 13, name: '[B.Tech CSE V Sem] KCS-503: Design & Analysis of Algorithms (DAA)', type: 'Subject' },
        { id: 14, name: '[B.Tech CSE V Sem] KCS-053: Computer Graphics (CG)', type: 'Subject' },
        { id: 15, name: '[B.Tech CSE V Sem] KCS-055: Machine Learning Techniques (MLT)', type: 'Subject' },
        { id: 16, name: '[B.Tech CSE V Sem] KNC-501: Constitution of India, Law & Engg. (COILE)', type: 'Subject' },
        { id: 17, name: '[B.Tech CSE V Sem] KCS-551: DBMS Lab', type: 'Lab' },
        { id: 18, name: '[B.Tech CSE V Sem] KCS-552: Compiler Design Lab (CD Lab)', type: 'Lab' },
        { id: 19, name: '[B.Tech CSE V Sem] KCS-553: DAA Lab', type: 'Lab' },
        { id: 20, name: '[B.Tech CSE V Sem] KCS-554: Mini Project', type: 'Lab' },

        // --- 3. B.Tech CSE IV Year (VII Semester) ---
        { id: 21, name: '[B.Tech CSE VII Sem] KCS-071: Artificial Intelligence (AI)', type: 'Subject' },
        { id: 22, name: '[B.Tech CSE VII Sem] KCS-081: Mobile Computing (MC)', type: 'Subject' },
        { id: 23, name: '[B.Tech CSE VII Sem] KOE-074: Renewable Energy Resources (RER)', type: 'Subject' },
        { id: 24, name: '[B.Tech CSE VII Sem] KHU-701: Rural Development: Admin. & Planning (RDAAP)', type: 'Subject' },
        { id: 25, name: '[B.Tech CSE VII Sem] KCS-751A: Artificial Intelligence Lab (AI Lab)', type: 'Lab' },
        { id: 26, name: '[B.Tech CSE VII Sem] KCS-752: Internship Assessment', type: 'Lab' },
        { id: 27, name: '[B.Tech CSE VII Sem] KCS-753: Project', type: 'Lab' },

        // --- 4. B.Tech IT (III, V & VII Semester) ---
        { id: 28, name: '[B.Tech IT III Sem] BCS-301 to 303 / DE / UHV / Cyber Sec', type: 'Subject' },
        { id: 29, name: '[B.Tech IT V Sem] KIT-501: Web Technology (WT)', type: 'Subject' },
        { id: 30, name: '[B.Tech IT V Sem] KIT-551: Web Technology Lab', type: 'Lab' },
        { id: 31, name: '[B.Tech IT VII Sem] KIT-753: Project', type: 'Lab' },

        // --- 5. B.Tech AI&ML and Data Science (III Semester) ---
        { id: 32, name: '[B.Tech AI&ML/DS III Sem] Core DS, COA, DSTL, DE & UHV', type: 'Subject' },
        { id: 33, name: '[B.Tech AI&ML/DS III Sem] Specialized Labs & Mini Project', type: 'Lab' },

        // --- 6. M.Tech CSE (I & III Semester) ---
        { id: 34, name: '[M.Tech CSE I Sem] CSEMT101: Foundation of Computer Science (FOCS)', type: 'Subject' },
        { id: 35, name: '[M.Tech CSE I Sem] CSEMT102: Advanced Algorithms', type: 'Subject' },
        { id: 36, name: '[M.Tech CSE I Sem] CSEMT103: Research Methodology & IPR', type: 'Subject' },
        { id: 37, name: '[M.Tech CSE III Sem] CSEMTE51: Internet of Things (IoT)', type: 'Subject' },
        { id: 38, name: '[M.Tech CSE III Sem] CSEMTL301: Dissertation-1', type: 'Lab' }
    ],
    
    // Separate Scheduled Slots
    sessions: [
        { id: 101, subId: 1, date: '2026-10-19', sessionName: '[B.Tech CSE III Sem] Monday - Period I (Data Structure)' },
        { id: 102, subId: 2, date: '2026-10-19', sessionName: '[B.Tech CSE III Sem] Monday - Period II (COA)' },
        { id: 103, subId: 7, date: '2026-10-20', sessionName: '[B.Tech CSE III Sem] Tuesday - Data Structure Lab' },
        { id: 104, subId: 8, date: '2026-10-21', sessionName: '[B.Tech CSE III Sem] Wednesday - COA Lab' },
        { id: 105, subId: 9, date: '2026-10-23', sessionName: '[B.Tech CSE III Sem] Friday - Mini Project' },
        { id: 106, subId: 11, date: '2026-10-19', sessionName: '[B.Tech CSE V Sem] Monday - Period I (DBMS)' },
        { id: 107, subId: 13, date: '2026-10-19', sessionName: '[B.Tech CSE V Sem] Monday - Period III (DAA)' },
        { id: 108, subId: 17, date: '2026-10-22', sessionName: '[B.Tech CSE V Sem] Thursday - DBMS Lab' },
        { id: 109, subId: 21, date: '2026-10-19', sessionName: '[B.Tech CSE VII Sem] Monday - Artificial Intelligence' },
        { id: 110, subId: 27, date: '2026-10-23', sessionName: '[B.Tech CSE VII Sem] Friday - Major Project Assessment' },
        { id: 111, subId: 29, date: '2026-10-19', sessionName: '[B.Tech IT V Sem] Monday - Web Technology (WT)' },
        { id: 112, subId: 30, date: '2026-10-21', sessionName: '[B.Tech IT V Sem] Wednesday - Web Technology Lab' },
        { id: 113, subId: 32, date: '2026-10-19', sessionName: '[B.Tech AI&ML/DS III Sem] Monday Core Classes' },
        { id: 114, subId: 34, date: '2026-10-19', sessionName: '[M.Tech CSE I Sem] Monday - Foundation of Computer Science' },
        { id: 115, subId: 38, date: '2026-10-20', sessionName: '[M.Tech CSE III Sem] Tuesday - Dissertation-1 Lab' }
    ]
};

// ==========================================
// 3. STORAGE & AUTH FUNCTIONS
// ==========================================
function saveData() {
    sessionStorage.setItem('current_user', db.currentUser);
    sessionStorage.setItem('current_roll', db.currentRoll);
    sessionStorage.setItem('user_role', db.role);
}

// Global Login Handler
window.handleLogin = function(e, role, studentName = "ashish kumar", rollNo = "25001303035") {
    if (e) e.preventDefault();
    
    if (role === 'admin') {
        db.currentUser = "Administrator";
        db.currentRoll = "ADMIN_01";
        db.role = 'admin';
        saveData();
        window.location.href = 'admin.html';
    } else {
        db.currentUser = studentName;
        db.currentRoll = rollNo;
        db.role = 'student';
        saveData();
        window.location.href = 'attendance.html';
    }
};

// Global Logout Handler
window.logout = function() {
    db.currentUser = null;
    db.currentRoll = null;
    db.role = null;
    sessionStorage.clear();
    window.location.href = 'index.html';
};

// Route Security Guard
window.checkAuth = function(requiredRole) {
    if (!db.currentUser || db.role !== requiredRole) {
        alert('Unauthorized access! Please login first.');
        window.location.href = 'index.html';
    }
};

// ==========================================
// 4. FIREBASE CLOUD DATABASE OPERATIONS
// ==========================================
// Attendance Save function (Replaces localStorage for logs)
window.saveAttendanceToCloud = async function(attendanceData) {
    try {
        await addDoc(collection(dbStore, "attendance_logs"), {
            rollNumber: attendanceData.rollNumber || db.currentRoll,
            studentName: attendanceData.studentName || db.currentUser,
            branch: attendanceData.branch || "CSE",
            semester: attendanceData.semester || "3rd Semester",
            distance: attendanceData.distance,
            timestamp: new Date().toLocaleString(),
            createdAt: new Date()
        });
        console.log("Attendance successfully written to Firebase Firestore!");
        return true;
    } catch (error) {
        console.error("Error saving attendance to cloud: ", error);
        alert("Failed to sync attendance with cloud database.");
        return false;
    }
};

// Notice Publish Function (Admin Panel)
window.publishNoticeToCloud = async function(title, description) {
    try {
        await addDoc(collection(dbStore, "notices"), {
            title: title,
            description: description,
            date: new Date().toLocaleDateString(),
            timestamp: new Date()
        });
        alert("Notice published live successfully!");
        return true;
    } catch (error) {
        console.error("Error publishing notice: ", error);
        return false;
    }
};