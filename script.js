/**
 * SmartStay – Smart Hostel Management System
 * Core JavaScript Application Controller
 */

// ==========================================
// 1. Initial Mock Database & LocalStorage Setup
// ==========================================
const DEFAULT_DATABASE = {
  currentUser: {
    role: 'student', // 'student' or 'admin'
    id: 'STU-2024-042',
    name: 'Aditya Verma',
    email: 'aditya.verma@college.edu',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
    registerNo: 'RA2211003010482',
    dept: 'Computer Science & Engineering',
    year: '3rd Year (VI Semester)',
    hostel: 'SmartStay Campus Residence',
    block: 'Block A - Nilgiri',
    room: 'A-204',
    bed: 'Bed 2 (Window Side)',
    parentName: 'Ramesh Verma',
    emergencyContact: '+91 98765 00112'
  },
  adminUser: {
    role: 'admin',
    id: 'ADM-001',
    name: 'Dr. Rajesh Sharma',
    title: 'Chief Hostel Warden',
    email: 'warden.rajesh@college.edu',
    phone: '+91 94123 99881',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80'
  },
  theme: 'light',
  notifications: [
    { id: 1, title: 'Leave Approved', desc: 'Weekend Home leave for Oct 12-14 has been approved by Warden.', time: '10 mins ago', unread: true, icon: 'fa-calendar-check', type: 'success' },
    { id: 2, title: 'Mess Menu Updated', desc: 'Special South-Indian Feast scheduled for this Sunday lunch.', time: '1 hour ago', unread: true, icon: 'fa-utensils', type: 'info' },
    { id: 3, title: 'Fee Due Reminder', desc: 'Second installment fee of ₹30,000 is due on 15th Nov.', time: '1 day ago', unread: true, icon: 'fa-receipt', type: 'warning' },
    { id: 4, title: 'Maintenance Notice', desc: 'High-speed Wi-Fi router upgrade tonight between 12 AM - 3 AM.', time: '2 days ago', unread: false, icon: 'fa-wifi', type: 'info' }
  ],
  attendance: {
    overall: 92.5,
    presentDays: 74,
    absentDays: 4,
    leaveDays: 6,
    totalDays: 84,
    monthly: [
      { month: 'Jan', percent: 94 },
      { month: 'Feb', percent: 89 },
      { month: 'Mar', percent: 95 },
      { month: 'Apr', percent: 91 },
      { month: 'May', percent: 93 },
      { month: 'Jun', percent: 96 }
    ],
    logs: [
      { date: '2026-10-02', day: 'Friday', time: '08:15 AM', status: 'Present', mode: 'Biometric' },
      { date: '2026-10-01', day: 'Thursday', time: '08:22 AM', status: 'Present', mode: 'Biometric' },
      { date: '2026-09-30', day: 'Wednesday', time: '08:10 AM', status: 'Present', mode: 'Biometric' },
      { date: '2026-09-29', day: 'Tuesday', time: '08:45 AM', status: 'Present', mode: 'Biometric' },
      { date: '2026-09-28', day: 'Monday', time: '-', status: 'Leave', mode: 'Approved Pass' },
      { date: '2026-09-27', day: 'Sunday', time: '-', status: 'Holiday', mode: 'Weekend' },
      { date: '2026-09-26', day: 'Saturday', time: '09:05 AM', status: 'Present', mode: 'Biometric' }
    ]
  },
  roomDetails: {
    block: 'Block A - Nilgiri',
    roomNo: 'A-204',
    floor: '2nd Floor',
    type: '4-Bed Air-Conditioned Deluxe',
    capacity: 4,
    occupiedCount: 3,
    availableCount: 1,
    status: 'Partially Occupied',
    beds: [
      { bedId: 'Bed 1', occupant: 'Alex Chen', regNo: 'RA2211003010451', dept: 'CSE', status: 'occupied' },
      { bedId: 'Bed 2', occupant: 'Aditya Verma (You)', regNo: 'RA2211003010482', dept: 'CSE', status: 'current-user' },
      { bedId: 'Bed 3', occupant: 'Vacant Bed', regNo: '-', dept: '-', status: 'available' },
      { bedId: 'Bed 4', occupant: 'Rahul Sharma', regNo: 'RA2211003010502', dept: 'ECE', status: 'occupied' }
    ],
    amenities: [
      { icon: 'fa-wifi', name: 'High-speed Wi-Fi (1 Gbps)' },
      { icon: 'fa-snowflake', name: 'Individual Air Conditioning' },
      { icon: 'fa-bolt', name: '24/7 Power Backup' },
      { icon: 'fa-shower', name: 'Attached Western Washroom' },
      { icon: 'fa-book-reader', name: 'Ergonomic Study Desk & Lamp' },
      { icon: 'fa-shield-halved', name: 'Smart RFID Door Lock' }
    ]
  },
  leaves: [
    { id: 'LEV-1042', type: 'Weekend Outing', from: '2026-10-12', to: '2026-10-14', days: 2, destination: 'Bangalore City', reason: 'Family gathering & festival celebration', contact: '+91 98765 00112', status: 'Approved', appliedOn: '2026-10-01' },
    { id: 'LEV-1038', type: 'Academic / Hackathon', from: '2026-09-20', to: '2026-09-22', days: 2, destination: 'IIT Madras', reason: 'Smart India Hackathon Finals participation', contact: '+91 98765 00112', status: 'Approved', appliedOn: '2026-09-15' },
    { id: 'LEV-1025', type: 'Home Leave', from: '2026-08-14', to: '2026-08-18', days: 4, destination: 'Mysore', reason: 'Independence Day long weekend visit home', contact: '+91 98765 00112', status: 'Approved', appliedOn: '2026-08-10' },
    { id: 'LEV-1011', type: 'Medical Leave', from: '2026-07-05', to: '2026-07-08', days: 3, destination: 'Apollo Hospital', reason: 'Viral fever rest as prescribed by campus doctor', contact: '+91 98765 00112', status: 'Approved', appliedOn: '2026-07-04' }
  ],
  complaints: [
    { id: 'CMP-2026-089', category: 'Wi-Fi', subject: 'Slow upload speed on 2nd floor router', priority: 'Medium', room: 'A-204', desc: 'Frequent disconnections noticed during evening hours (8 PM - 11 PM).', status: 'In Progress', filedDate: '2026-10-01' },
    { id: 'CMP-2026-072', category: 'Electrical', subject: 'Balcony tube light flickering', priority: 'Low', room: 'A-204', desc: 'The external balcony light is continuously blinking.', status: 'Resolved', filedDate: '2026-09-22' },
    { id: 'CMP-2026-054', category: 'Plumbing', subject: 'Washroom hot water tap leaking', priority: 'High', room: 'A-204', desc: 'Hot water tap dripping constantly, wasting water.', status: 'Resolved', filedDate: '2026-09-10' }
  ],
  messMenu: {
    Monday: {
      breakfast: ['Idli & Sambar', 'Coconut & Tomato Chutneys', 'Boiled Eggs / Bananas', 'Tea & Coffee'],
      lunch: ['Steamed Basmati Rice', 'Paneer Butter Masala', 'Yellow Dal Tadka', 'Chapati', 'Fresh Salad & Curd'],
      snacks: ['Veg Samosa & Mint Chutney', 'Masala Tea', 'Biscuits'],
      dinner: ['Vegetable Biryani', 'Chicken Curry (Non-Veg)', 'Paneer Tikka (Veg Option)', 'Raita & Gulab Jamun']
    },
    Tuesday: {
      breakfast: ['Poha with Roasted Peanuts', 'Upma with Chutney', 'Boiled Eggs / Fruits', 'Tea & Filter Coffee'],
      lunch: ['Jeera Rice', 'Aloo Gobi Matar', 'Rajma Masala', 'Tandoori Roti', 'Boondi Raita'],
      snacks: ['Pav Bhaji', 'Lemon Iced Tea'],
      dinner: ['Phulka / Chapati', 'Dal Makhani', 'Kadai Paneer / Egg Curry', 'Cucumber Salad', 'Rice Kheer']
    },
    Wednesday: {
      breakfast: ['Medu Vada & Sambar', 'Mysore Masala Dosa', 'Fresh Cut Papaya', 'Tea & Coffee'],
      lunch: ['Lemon Rice & Curd Rice', 'Mix Veg Curry', 'Tomato Rasam', 'Papad & Pickle'],
      snacks: ['Veg Cutlet with Green Sauce', 'Ginger Tea'],
      dinner: ['Fried Rice & Veg Manchurian', 'Chilli Chicken (Non-Veg)', 'Sweet Corn Soup', 'Ice Cream Cup']
    },
    Thursday: {
      breakfast: ['Aloo Paratha with White Butter', 'Curd & Pickle', 'Boiled Eggs / Sprouts', 'Tea & Coffee'],
      lunch: ['Steamed Rice', 'Chole Masala', 'Bhature & Poori', 'Boondi Raita', 'Green Salad'],
      snacks: ['Onion Pakoda', 'Masala Chai'],
      dinner: ['Jeera Rice', 'Dal Palak', 'Kadhai Chicken / Shahi Paneer', 'Roti', 'Fruit Custard']
    },
    Friday: {
      breakfast: ['Rava Dosa with Coconut Chutney', 'Sambar', 'Boiled Eggs / Bananas', 'Tea & Coffee'],
      lunch: ['South Indian Thali: Rice', 'Drumstick Sambar', 'Avial / Cabbage Poriyal', 'Rasam & Buttermilk'],
      snacks: ['Dhokla & Green Chutney', 'Cardamom Tea'],
      dinner: ['Hyderabadi Veg Dum Biryani', 'Chicken Biryani (Non-Veg)', 'Mirchi Ka Salan', 'Double Ka Meetha']
    },
    Saturday: {
      breakfast: ['Puri Bhaji with Halwa', 'Boiled Eggs / Seasonal Fruit', 'Tea & Coffee'],
      lunch: ['Vegetable Pulao', 'Kadhi Pakoda', 'Aloo Methi Sukha', 'Chapati', 'Roasted Papad'],
      snacks: ['Bhel Puri / Sev Puri', 'Cold Coffee'],
      dinner: ['Paneer Lababdar / Butter Chicken', 'Naan & Kulcha', 'Dal Tadka', 'Jeera Rice', 'Moong Dal Halwa']
    },
    Sunday: {
      breakfast: ['Chole Kulche', 'Sweet Lassi', 'Boiled Eggs / Fresh Fruits', 'Tea & Coffee'],
      lunch: ['Sunday Grand Feast: Dum Biryani', 'Paneer Pasanda', 'Mutton Sukka (Special)', 'Raita, Salad & Rasgulla'],
      snacks: ['Veg Sandwich Grilled', 'Hot Chocolate / Tea'],
      dinner: ['Light Khichdi / Roti', 'Moong Dal & Aloo Jeera', 'Papad, Pickle & Fresh Curd']
    }
  },
  fees: {
    total: 95000,
    paid: 65000,
    pending: 30000,
    dueDate: '2026-11-15',
    status: 'Partially Paid',
    history: [
      { receiptNo: 'REC-2026-081', date: '2026-07-28', desc: 'Semester 1st Installment (Room + Mess)', amount: 65000, method: 'UPI (GPay / PhonePe)', status: 'Success' },
      { receiptNo: 'REC-2025-412', date: '2025-12-10', desc: 'Hostel Caution Security Deposit', amount: 10000, method: 'Net Banking HDFC', status: 'Success' },
      { receiptNo: 'REC-2025-108', date: '2025-07-15', desc: 'Annual Maintenance & Amenity Charge', amount: 15000, method: 'Debit Card', status: 'Success' }
    ]
  },
  notices: [
    { id: 1, title: 'Hostel Wi-Fi Network Maintenance & Speed Upgrade', category: 'Maintenance', date: 'Oct 02, 2026', author: 'IT & Infrastructure Cell', urgent: true, desc: 'All hostel access points will undergo routine firmware patch upgrade between 12:00 AM and 03:00 AM tonight. Internet connectivity will resume normally by 3:30 AM.' },
    { id: 2, title: 'Grand Sunday Feast & Mess Advisory Committee Meeting', category: 'Mess', date: 'Oct 01, 2026', author: 'Chief Mess Warden', urgent: false, desc: 'A special South & North Indian festive dinner will be served this Sunday. Resident student representatives are requested to join the monthly feedback session at 5:00 PM in Hall 2.' },
    { id: 3, title: 'End Semester Practical Examinations & Study Hours', category: 'Exam', date: 'Sep 28, 2026', author: 'Dean of Student Affairs', urgent: false, desc: 'Quiet study hours will be strictly enforced from 10:00 PM to 6:00 AM daily in all hostel blocks during the upcoming practical and theoretical semester examinations.' },
    { id: 4, title: 'Diwali & Mid-Semester Vacation Leave Guidelines', category: 'Holidays', date: 'Sep 25, 2026', author: 'Warden Office', urgent: false, desc: 'Students intending to travel home for the festive vacation must submit their online leave requests through SmartStay portal at least 48 hours prior to departure.' }
  ],
  visitors: [
    { id: 'VIS-901', name: 'Ramesh Verma', relationship: 'Father', phone: '+91 98765 00112', date: '2026-10-04', time: '04:00 PM', purpose: 'Delivering books and medical supplements', passCode: 'PASS-8841', status: 'Approved' },
    { id: 'VIS-855', name: 'Karthik Rao', relationship: 'Cousin', phone: '+91 98450 12398', date: '2026-09-18', time: '02:30 PM', purpose: 'Campus visit and semester greeting', passCode: 'PASS-7612', status: 'Checked-out' }
  ],
  adminStudents: [
    { id: 'STU-2024-042', name: 'Aditya Verma', regNo: 'RA2211003010482', dept: 'CSE', year: '3rd Year', block: 'Block A', room: 'A-204', phone: '+91 98765 43210', feeStatus: 'Partial', status: 'Active' },
    { id: 'STU-2024-019', name: 'Priya Sundaram', regNo: 'RA2211003010114', dept: 'AI & Data Science', year: '2nd Year', block: 'Block C (Girls)', room: 'C-102', phone: '+91 97123 45678', feeStatus: 'Paid', status: 'Active' },
    { id: 'STU-2024-088', name: 'Rahul Sharma', regNo: 'RA2211003010502', dept: 'ECE', year: '3rd Year', block: 'Block A', room: 'A-204', phone: '+91 99887 66554', feeStatus: 'Paid', status: 'Active' },
    { id: 'STU-2024-055', name: 'Sneha Patel', regNo: 'RA2211003010330', dept: 'IT', year: '4th Year', block: 'Block C (Girls)', room: 'C-305', phone: '+91 94321 87654', feeStatus: 'Pending', status: 'Active' },
    { id: 'STU-2024-033', name: 'Alex Chen', regNo: 'RA2211003010451', dept: 'CSE', year: '3rd Year', block: 'Block A', room: 'A-204', phone: '+91 91234 56789', feeStatus: 'Paid', status: 'Active' },
    { id: 'STU-2024-099', name: 'Vikramaditya Roy', regNo: 'RA2211003010619', dept: 'Mechanical', year: '1st Year', block: 'Block B', room: 'B-110', phone: '+91 98760 11223', feeStatus: 'Paid', status: 'Active' },
    { id: 'STU-2024-071', name: 'Ananya Deshmukh', regNo: 'RA2211003010278', dept: 'Biotech', year: '2nd Year', block: 'Block C (Girls)', room: 'C-214', phone: '+91 99001 22334', feeStatus: 'Partial', status: 'Active' }
  ],
  adminRooms: [
    { block: 'Block A', roomNo: 'A-204', floor: '2nd Floor', type: '4-Sharing AC', capacity: 4, occupied: 3, available: 1, status: 'Available' },
    { block: 'Block A', roomNo: 'A-205', floor: '2nd Floor', type: '4-Sharing AC', capacity: 4, occupied: 4, available: 0, status: 'Full' },
    { block: 'Block B', roomNo: 'B-110', floor: '1st Floor', type: '2-Sharing Non-AC', capacity: 2, occupied: 2, available: 0, status: 'Full' },
    { block: 'Block B', roomNo: 'B-112', floor: '1st Floor', type: '3-Sharing Non-AC', capacity: 3, occupied: 1, available: 2, status: 'Available' },
    { block: 'Block C', roomNo: 'C-102', floor: '1st Floor', type: '2-Sharing AC', capacity: 2, occupied: 2, available: 0, status: 'Full' },
    { block: 'Block C', roomNo: 'C-305', floor: '3rd Floor', type: '4-Sharing AC', capacity: 4, occupied: 3, available: 1, status: 'Available' }
  ]
};

// State Store with LocalStorage Synchronization
class SmartHostelStore {
  constructor() {
    this.storageKey = 'smartstay_hostel_db_v1';
    this.state = this.loadData();
  }

  loadData() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('LocalStorage load failed, using default database', e);
    }
    this.saveData(DEFAULT_DATABASE);
    return JSON.parse(JSON.stringify(DEFAULT_DATABASE));
  }

  saveData(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data || this.state));
    } catch (e) {
      console.error('LocalStorage save failed', e);
    }
  }

  resetDemo() {
    this.state = JSON.parse(JSON.stringify(DEFAULT_DATABASE));
    this.saveData();
    window.location.reload();
  }
}

const store = new SmartHostelStore();
let db = store.state;

// Keep helper references for Charts
let attendanceChartInstance = null;
let adminOccupancyChartInstance = null;
let adminFeeChartInstance = null;
let adminComplaintChartInstance = null;

// ==========================================
// 2. UI Helpers & Toast Notifications
// ==========================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  let iconClass = 'fa-circle-check';
  if (type === 'error') iconClass = 'fa-circle-xmark';
  if (type === 'info') iconClass = 'fa-circle-info';
  if (type === 'warning') iconClass = 'fa-triangle-exclamation';

  toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Global modal backdrop close
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ESC key closes active modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => {
      m.classList.remove('active');
      document.body.style.overflow = '';
    });
    // Close notifications if open
    const notifDrop = document.getElementById('notifications-dropdown');
    if (notifDrop) notifDrop.style.display = 'none';
  }
});

// ==========================================
// 3. Theme & Dark Mode Controller
// ==========================================
function initTheme() {
  const currentTheme = db.theme || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  db.theme = newTheme;
  store.saveData();
  updateThemeIcon(newTheme);
  showToast(`Switched to ${newTheme} mode`, 'info');
  // Re-render charts with theme palette
  setTimeout(() => {
    initCharts();
  }, 100);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun text-warning"></i>' : '<i class="fa-solid fa-moon"></i>';
  }
}

// ==========================================
// 4. Authentication & Role Switching
// ==========================================
let currentRole = 'student';

function setLoginRole(role) {
  currentRole = role;
  document.querySelectorAll('.role-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-role') === role);
  });
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  if (role === 'admin') {
    if (emailInput) emailInput.placeholder = 'Admin ID or warden.email@college.edu';
    if (passwordInput) passwordInput.value = 'admin123';
  } else {
    if (emailInput) emailInput.placeholder = 'Student ID / Reg No (e.g. RA2211003010482)';
    if (passwordInput) passwordInput.value = 'student123';
  }
}

function quickFillDemo(role) {
  setLoginRole(role);
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  if (role === 'admin') {
    if (emailInput) emailInput.value = 'warden.rajesh@college.edu';
    if (passwordInput) passwordInput.value = 'admin123';
  } else {
    if (emailInput) emailInput.value = 'RA2211003010482';
    if (passwordInput) passwordInput.value = 'student123';
  }
  showToast(`Demo credentials filled for ${role.toUpperCase()}`, 'info');
}

function togglePasswordVisibility() {
  const passInput = document.getElementById('login-password');
  const eyeIcon = document.getElementById('password-toggle-icon');
  if (!passInput) return;
  if (passInput.type === 'password') {
    passInput.type = 'text';
    if (eyeIcon) eyeIcon.className = 'fa-solid fa-eye-slash';
  } else {
    passInput.type = 'password';
    if (eyeIcon) eyeIcon.className = 'fa-solid fa-eye';
  }
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const emailVal = document.getElementById('login-email').value.trim();
  const passVal = document.getElementById('login-password').value.trim();

  if (!emailVal || !passVal) {
    showToast('Please enter both Email/ID and Password', 'error');
    return;
  }

  // Switch to application shell
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('app-section').style.display = 'block';

  // Apply user state
  if (currentRole === 'admin') {
    applyAdminView();
    navigateTo('admin-dashboard');
    showToast('Welcome, Chief Warden Dr. Rajesh Sharma!', 'success');
  } else {
    applyStudentView();
    navigateTo('student-dashboard');
    showToast(`Welcome back, ${db.currentUser.name}!`, 'success');
  }

  initAppHeader();
  renderAllSections();
}

function handleLogout() {
  if (confirm('Are you sure you want to log out of SmartStay?')) {
    document.getElementById('app-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'flex';
    showToast('You have been logged out successfully.', 'info');
  }
}

function switchPortal(role) {
  currentRole = role;
  if (role === 'admin') {
    applyAdminView();
    navigateTo('admin-dashboard');
    showToast('Switched to Admin Portal', 'info');
  } else {
    applyStudentView();
    navigateTo('student-dashboard');
    showToast('Switched to Student Portal', 'info');
  }
  initAppHeader();
  renderAllSections();
}

function applyStudentView() {
  currentRole = 'student';
  document.body.classList.remove('role-admin');
  document.body.classList.add('role-student');

  document.querySelectorAll('.student-only-nav').forEach(el => el.style.display = 'flex');
  document.querySelectorAll('.admin-only-nav').forEach(el => el.style.display = 'none');

  // Update pills
  const pillStudent = document.getElementById('pill-student');
  const pillAdmin = document.getElementById('pill-admin');
  if (pillStudent) pillStudent.classList.add('active');
  if (pillAdmin) pillAdmin.classList.remove('active');

  // Update header and footer widget
  const headerName = document.getElementById('header-user-name');
  const headerRole = document.getElementById('header-user-role');
  const headerAvatar = document.getElementById('header-user-avatar');
  const sidebarAvatar = document.getElementById('sidebar-user-avatar');
  const sidebarName = document.getElementById('sidebar-user-name');
  const sidebarRole = document.getElementById('sidebar-user-role');

  if (headerName) headerName.textContent = db.currentUser.name;
  if (headerRole) headerRole.textContent = 'Student';
  if (headerAvatar) headerAvatar.src = db.currentUser.avatar;
  if (sidebarAvatar) sidebarAvatar.src = db.currentUser.avatar;
  if (sidebarName) sidebarName.textContent = db.currentUser.name;
  if (sidebarRole) sidebarRole.textContent = `${db.currentUser.block} • ${db.currentUser.room}`;
}

function applyAdminView() {
  currentRole = 'admin';
  document.body.classList.remove('role-student');
  document.body.classList.add('role-admin');

  document.querySelectorAll('.student-only-nav').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.admin-only-nav').forEach(el => el.style.display = 'flex');

  // Update pills
  const pillStudent = document.getElementById('pill-student');
  const pillAdmin = document.getElementById('pill-admin');
  if (pillStudent) pillStudent.classList.remove('active');
  if (pillAdmin) pillAdmin.classList.add('active');

  // Update header and footer widget
  const headerName = document.getElementById('header-user-name');
  const headerRole = document.getElementById('header-user-role');
  const headerAvatar = document.getElementById('header-user-avatar');
  const sidebarAvatar = document.getElementById('sidebar-user-avatar');
  const sidebarName = document.getElementById('sidebar-user-name');
  const sidebarRole = document.getElementById('sidebar-user-role');

  if (headerName) headerName.textContent = db.adminUser.name;
  if (headerRole) headerRole.textContent = 'Admin / Warden';
  if (headerAvatar) headerAvatar.src = db.adminUser.avatar;
  if (sidebarAvatar) sidebarAvatar.src = db.adminUser.avatar;
  if (sidebarName) sidebarName.textContent = db.adminUser.name;
  if (sidebarRole) sidebarRole.textContent = db.adminUser.title;
}

// ==========================================
// 5. Navigation Router
// ==========================================
function navigateTo(sectionId) {
  // Hide all sections
  document.querySelectorAll('.view-section').forEach(sec => {
    sec.classList.remove('active');
  });

  // Activate target section
  const targetSection = document.getElementById(`view-${sectionId}`);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  // Update nav item active states
  document.querySelectorAll('.nav-item').forEach(item => {
    const target = item.getAttribute('data-target');
    if (target === sectionId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Close mobile sidebar if open
  closeMobileSidebar();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Re-trigger chart render if charts section became visible
  if (sectionId === 'student-attendance' || sectionId === 'admin-dashboard' || sectionId === 'admin-reports') {
    setTimeout(initCharts, 120);
  }
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.toggle('mobile-open');
  if (overlay) overlay.classList.toggle('active');
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('mobile-open');
  if (overlay) overlay.classList.remove('active');
}

// ==========================================
// 6. Header Notification Dropdown & Search
// ==========================================
function toggleNotificationsDropdown() {
  const drop = document.getElementById('notifications-dropdown');
  if (!drop) return;
  const isShown = drop.style.display === 'block';
  drop.style.display = isShown ? 'none' : 'block';
}

function markAllNotificationsRead() {
  db.notifications.forEach(n => n.unread = false);
  store.saveData();
  renderNotifications();
  showToast('All notifications marked as read', 'info');
}

function renderNotifications() {
  const listEl = document.getElementById('notifications-list');
  const unreadBadge = document.getElementById('notification-dot');
  if (!listEl) return;

  const unreadCount = db.notifications.filter(n => n.unread).length;
  if (unreadBadge) {
    unreadBadge.style.display = unreadCount > 0 ? 'block' : 'none';
  }

  if (db.notifications.length === 0) {
    listEl.innerHTML = '<div style="padding: 1.5rem; text-align: center; color: var(--text-subtle);">No notifications</div>';
    return;
  }

  listEl.innerHTML = db.notifications.map(n => `
    <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="markNotifAsRead(${n.id})">
      <div class="notif-icon stat-icon ${n.type || 'info'}">
        <i class="fa-solid ${n.icon}"></i>
      </div>
      <div class="notif-item-body">
        <h5>${n.title}</h5>
        <p>${n.desc}</p>
        <div class="notif-time">${n.time}</div>
      </div>
    </div>
  `).join('');
}

function markNotifAsRead(id) {
  const item = db.notifications.find(n => n.id === id);
  if (item) {
    item.unread = false;
    store.saveData();
    renderNotifications();
  }
}

// Global Header Search functionality
function handleGlobalSearch(query) {
  const drop = document.getElementById('search-results-dropdown');
  if (!drop) return;
  const q = query.trim().toLowerCase();

  if (q.length < 2) {
    drop.style.display = 'none';
    return;
  }

  const results = [];

  // Search Students
  db.adminStudents.forEach(stu => {
    if (stu.name.toLowerCase().includes(q) || stu.regNo.toLowerCase().includes(q) || stu.room.toLowerCase().includes(q)) {
      results.push({
        title: `${stu.name} (${stu.room})`,
        subtitle: `Student • ${stu.regNo} • ${stu.dept}`,
        icon: 'fa-user-graduate',
        action: () => {
          if (currentRole === 'admin') navigateTo('admin-students');
          else navigateTo('student-room');
        }
      });
    }
  });

  // Search Notices
  db.notices.forEach(n => {
    if (n.title.toLowerCase().includes(q) || n.desc.toLowerCase().includes(q)) {
      results.push({
        title: n.title,
        subtitle: `Notice • ${n.category} • ${n.date}`,
        icon: 'fa-bullhorn',
        action: () => navigateTo('student-notices')
      });
    }
  });

  // Search Complaints
  db.complaints.forEach(c => {
    if (c.subject.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)) {
      results.push({
        title: `${c.id}: ${c.subject}`,
        subtitle: `Complaint • ${c.status} • Priority ${c.priority}`,
        icon: 'fa-circle-exclamation',
        action: () => {
          if (currentRole === 'admin') navigateTo('admin-complaints');
          else navigateTo('student-complaints');
        }
      });
    }
  });

  if (results.length === 0) {
    drop.innerHTML = '<div style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No matching results found</div>';
  } else {
    drop.innerHTML = results.slice(0, 5).map((r, idx) => `
      <div class="search-result-item" id="search-res-${idx}">
        <div class="search-result-icon"><i class="fa-solid ${r.icon}"></i></div>
        <div class="search-result-info">
          <h4>${r.title}</h4>
          <p>${r.subtitle}</p>
        </div>
      </div>
    `).join('');

    results.slice(0, 5).forEach((r, idx) => {
      const el = document.getElementById(`search-res-${idx}`);
      if (el) {
        el.addEventListener('click', () => {
          r.action();
          drop.style.display = 'none';
          document.getElementById('global-search-input').value = '';
        });
      }
    });
  }

  drop.style.display = 'block';
}

// Close global search dropdown on outside click
document.addEventListener('click', (e) => {
  const searchBox = document.querySelector('.header-search-box');
  const drop = document.getElementById('search-results-dropdown');
  if (searchBox && !searchBox.contains(e.target) && drop) {
    drop.style.display = 'none';
  }
  const notifBox = document.querySelector('.notifications-wrapper');
  const notifDrop = document.getElementById('notifications-dropdown');
  if (notifBox && !notifBox.contains(e.target) && notifDrop) {
    notifDrop.style.display = 'none';
  }
});

// ==========================================
// 7. Student Modules: Rendering & Handlers
// ==========================================

// Render Student Dashboard
function renderStudentDashboard() {
  const stu = db.currentUser;
  const nameEl = document.getElementById('dash-student-name');
  const roomEl = document.getElementById('dash-room-badge');
  const blockEl = document.getElementById('dash-block-text');
  const attEl = document.getElementById('dash-attendance-percent');
  const pendingLeavesEl = document.getElementById('dash-pending-leaves');
  const pendingCmpEl = document.getElementById('dash-pending-complaints');
  const feeStatusEl = document.getElementById('dash-fee-status');

  if (nameEl) nameEl.textContent = stu.name;
  if (roomEl) roomEl.textContent = `${stu.block} • Room ${stu.room}`;
  if (blockEl) blockEl.textContent = stu.dept;
  if (attEl) attEl.textContent = `${db.attendance.overall}%`;

  const pendingLeavesCount = db.leaves.filter(l => l.status === 'Pending').length;
  if (pendingLeavesEl) pendingLeavesEl.textContent = pendingLeavesCount;

  const activeCmpCount = db.complaints.filter(c => c.status !== 'Resolved').length;
  if (pendingCmpEl) pendingCmpEl.textContent = activeCmpCount;

  if (feeStatusEl) {
    feeStatusEl.textContent = db.fees.status;
    feeStatusEl.className = `badge badge-${db.fees.status === 'Paid' ? 'success' : 'warning'}`;
  }

  // Quick Today's Mess
  const todayName = new Intl.DateTimeFormat('en-US', { weekday: 'Long' }).format(new Date());
  const todayMenu = db.messMenu[todayName] || db.messMenu.Monday;
  const todayMessEl = document.getElementById('dash-today-mess');
  if (todayMessEl) {
    todayMessEl.innerHTML = `
      <div style="font-weight: 700; color: var(--text-main); margin-bottom: 0.35rem;">
        <i class="fa-solid fa-utensils text-primary" style="margin-right: 0.4rem;"></i> Today's Lunch (${todayName})
      </div>
      <p style="font-size: 0.85rem; color: var(--text-muted);">${todayMenu.lunch.slice(0, 3).join(', ')} & more</p>
    `;
  }
}

// Render Student Profile Section
function renderStudentProfile() {
  const stu = db.currentUser;
  const mapping = {
    'prof-name': stu.name,
    'prof-reg': stu.registerNo,
    'prof-dept': stu.dept,
    'prof-year': stu.year,
    'prof-email': stu.email,
    'prof-phone': stu.phone,
    'prof-hostel': stu.hostel,
    'prof-block': stu.block,
    'prof-room': stu.room,
    'prof-bed': stu.bed,
    'prof-parent': stu.parentName,
    'prof-emergency': stu.emergencyContact
  };

  for (const [id, val] of Object.entries(mapping)) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  const avatarEl = document.getElementById('prof-avatar-img');
  if (avatarEl) avatarEl.src = stu.avatar;
}

function openEditProfileModal() {
  const stu = db.currentUser;
  document.getElementById('edit-prof-name').value = stu.name;
  document.getElementById('edit-prof-email').value = stu.email;
  document.getElementById('edit-prof-phone').value = stu.phone;
  document.getElementById('edit-prof-parent').value = stu.parentName;
  document.getElementById('edit-prof-emergency').value = stu.emergencyContact;
  openModal('modal-edit-profile');
}

function handleSaveProfile(event) {
  event.preventDefault();
  db.currentUser.name = document.getElementById('edit-prof-name').value.trim();
  db.currentUser.email = document.getElementById('edit-prof-email').value.trim();
  db.currentUser.phone = document.getElementById('edit-prof-phone').value.trim();
  db.currentUser.parentName = document.getElementById('edit-prof-parent').value.trim();
  db.currentUser.emergencyContact = document.getElementById('edit-prof-emergency').value.trim();

  store.saveData();
  closeModal('modal-edit-profile');
  renderStudentProfile();
  renderStudentDashboard();
  initAppHeader();
  showToast('Profile information updated successfully!', 'success');
}

// Render Room Details & Bed Layout
function renderRoomSection() {
  const rm = db.roomDetails;
  document.getElementById('room-block-no').textContent = rm.block;
  document.getElementById('room-number-display').textContent = rm.roomNo;
  document.getElementById('room-type-text').textContent = rm.type;
  document.getElementById('room-capacity-text').textContent = `${rm.capacity} Beds`;
  document.getElementById('room-occupied-count').textContent = `${rm.occupiedCount} Occupied`;
  document.getElementById('room-vacant-count').textContent = `${rm.availableCount} Available`;

  const bedGrid = document.getElementById('bed-layout-container');
  if (!bedGrid) return;

  bedGrid.innerHTML = rm.beds.map(bed => {
    let statusClass = bed.status;
    let badgeHtml = '';
    if (bed.status === 'occupied') {
      badgeHtml = '<span class="badge badge-neutral"><i class="fa-solid fa-lock"></i> Occupied</span>';
    } else if (bed.status === 'available') {
      badgeHtml = '<span class="badge badge-success"><i class="fa-solid fa-check"></i> Available</span>';
    } else if (bed.status === 'current-user') {
      badgeHtml = '<span class="badge badge-primary"><i class="fa-solid fa-user-check"></i> Your Bed</span>';
    }

    return `
      <div class="bed-card ${statusClass}">
        <div class="bed-icon"><i class="fa-solid fa-bed"></i></div>
        <div class="bed-number">${bed.bedId}</div>
        <div class="bed-occupant-name">${bed.occupant}</div>
        <div class="bed-badge">${badgeHtml}</div>
      </div>
    `;
  }).join('');
}

// Render Attendance Section & Table
function renderAttendanceSection() {
  const att = db.attendance;
  document.getElementById('att-overall-stat').textContent = `${att.overall}%`;
  document.getElementById('att-present-days').textContent = `${att.presentDays} Days`;
  document.getElementById('att-absent-days').textContent = `${att.absentDays} Days`;
  document.getElementById('att-leave-days').textContent = `${att.leaveDays} Days`;

  const tableBody = document.getElementById('attendance-logs-table');
  if (!tableBody) return;

  tableBody.innerHTML = att.logs.map(log => {
    let badgeClass = 'badge-neutral';
    if (log.status === 'Present') badgeClass = 'badge-success';
    if (log.status === 'Absent') badgeClass = 'badge-danger';
    if (log.status === 'Leave') badgeClass = 'badge-warning';

    return `
      <tr>
        <td><strong>${log.date}</strong></td>
        <td>${log.day}</td>
        <td>${log.time}</td>
        <td><span class="badge ${badgeClass}">${log.status}</span></td>
        <td><i class="fa-solid fa-fingerprint text-primary" style="margin-right: 0.35rem;"></i> ${log.mode}</td>
      </tr>
    `;
  }).join('');
}

// Render Leave Management Section
function renderLeavesSection() {
  const tableBody = document.getElementById('leave-history-table');
  if (!tableBody) return;

  if (db.leaves.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 2rem; color: var(--text-muted);">No leave requests found</td></tr>';
    return;
  }

  tableBody.innerHTML = db.leaves.map(l => {
    let badgeClass = 'badge-warning';
    if (l.status === 'Approved') badgeClass = 'badge-success';
    if (l.status === 'Rejected') badgeClass = 'badge-danger';

    return `
      <tr>
        <td><strong>${l.id}</strong></td>
        <td><span class="badge badge-neutral">${l.type}</span></td>
        <td>${l.from} &rarr; ${l.to} <small style="color:var(--text-subtle);">(${l.days}d)</small></td>
        <td>${l.destination}</td>
        <td style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${l.reason}">${l.reason}</td>
        <td><span class="badge ${badgeClass}">${l.status}</span></td>
        <td><small style="color:var(--text-muted);">${l.appliedOn}</small></td>
      </tr>
    `;
  }).join('');
}

function handleLeaveSubmit(event) {
  event.preventDefault();
  const type = document.getElementById('leave-type-select').value;
  const from = document.getElementById('leave-from-date').value;
  const to = document.getElementById('leave-to-date').value;
  const destination = document.getElementById('leave-dest-input').value.trim();
  const reason = document.getElementById('leave-reason-input').value.trim();
  const contact = document.getElementById('leave-contact-input').value.trim();

  if (!from || !to || !destination || !reason) {
    showToast('Please fill in all required leave fields', 'error');
    return;
  }

  const d1 = new Date(from);
  const d2 = new Date(to);
  const daysDiff = Math.max(1, Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)) + 1);

  const newLeave = {
    id: `LEV-${Math.floor(1000 + Math.random() * 9000)}`,
    type: type,
    from: from,
    to: to,
    days: daysDiff,
    destination: destination,
    reason: reason,
    contact: contact || db.currentUser.emergencyContact,
    status: 'Pending',
    appliedOn: new Date().toISOString().split('T')[0]
  };

  db.leaves.unshift(newLeave);

  // Add notification
  db.notifications.unshift({
    id: Date.now(),
    title: 'Leave Submitted',
    desc: `Leave request ${newLeave.id} submitted for Warden verification.`,
    time: 'Just now',
    unread: true,
    icon: 'fa-calendar-days',
    type: 'info'
  });

  store.saveData();
  renderLeavesSection();
  renderStudentDashboard();
  renderNotifications();
  closeModal('modal-apply-leave');
  document.getElementById('leave-apply-form').reset();
  showToast(`Leave request ${newLeave.id} submitted successfully!`, 'success');
}

// Render Complaint Management Section
function renderComplaintsSection() {
  const tableBody = document.getElementById('complaints-history-table');
  if (!tableBody) return;

  if (db.complaints.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 2rem; color: var(--text-muted);">No complaints logged</td></tr>';
    return;
  }

  tableBody.innerHTML = db.complaints.map(c => {
    let prioClass = 'badge-neutral';
    if (c.priority === 'High' || c.priority === 'Urgent') prioClass = 'badge-danger';
    if (c.priority === 'Medium') prioClass = 'badge-warning';

    let statusClass = 'badge-warning';
    if (c.status === 'Resolved') statusClass = 'badge-success';
    if (c.status === 'In Progress') statusClass = 'badge-info';

    return `
      <tr>
        <td><strong>${c.id}</strong></td>
        <td><span class="badge badge-neutral"><i class="fa-solid fa-tag"></i> ${c.category}</span></td>
        <td><strong>${c.subject}</strong><br><small style="color:var(--text-muted);">${c.desc}</small></td>
        <td>${c.room}</td>
        <td><span class="badge ${prioClass}">${c.priority}</span></td>
        <td><span class="badge ${statusClass}">${c.status}</span></td>
        <td><small style="color:var(--text-muted);">${c.filedDate}</small></td>
      </tr>
    `;
  }).join('');
}

function handleComplaintSubmit(event) {
  event.preventDefault();
  const category = document.getElementById('cmp-category-select').value;
  const priority = document.getElementById('cmp-priority-select').value;
  const room = document.getElementById('cmp-room-input').value.trim() || db.currentUser.room;
  const subject = document.getElementById('cmp-subject-input').value.trim();
  const desc = document.getElementById('cmp-desc-input').value.trim();

  if (!subject || !desc) {
    showToast('Please provide a subject and detailed description', 'error');
    return;
  }

  const newCmp = {
    id: `CMP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    category: category,
    priority: priority,
    room: room,
    subject: subject,
    desc: desc,
    status: 'Pending',
    filedDate: new Date().toISOString().split('T')[0]
  };

  db.complaints.unshift(newCmp);

  // Add notification
  db.notifications.unshift({
    id: Date.now(),
    title: 'Complaint Registered',
    desc: `Ticket ${newCmp.id} assigned to Maintenance Dept.`,
    time: 'Just now',
    unread: true,
    icon: 'fa-screwdriver-wrench',
    type: 'warning'
  });

  store.saveData();
  renderComplaintsSection();
  renderStudentDashboard();
  renderNotifications();
  closeModal('modal-add-complaint');
  document.getElementById('complaint-form').reset();
  showToast(`Complaint ticket ${newCmp.id} lodged successfully!`, 'success');
}

// Render Mess Menu Section
let currentMessDay = 'Monday';

function selectMessDay(day) {
  currentMessDay = day;
  document.querySelectorAll('.mess-day-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-day') === day);
  });
  renderMessCards(day);
}

function renderMessCards(day) {
  const container = document.getElementById('mess-cards-container');
  if (!container) return;

  const menu = db.messMenu[day] || db.messMenu.Monday;

  const mealSections = [
    { title: 'Breakfast', timing: '07:30 AM – 09:30 AM', icon: 'fa-mug-hot', items: menu.breakfast },
    { title: 'Lunch', timing: '12:30 PM – 02:30 PM', icon: 'fa-bowl-food', items: menu.lunch },
    { title: 'Evening Snacks', timing: '04:30 PM – 06:00 PM', icon: 'fa-cookie-bite', items: menu.snacks },
    { title: 'Dinner', timing: '07:45 PM – 09:45 PM', icon: 'fa-utensils', items: menu.dinner }
  ];

  container.innerHTML = mealSections.map(sec => `
    <div class="meal-card">
      <div class="meal-header">
        <div class="meal-title">
          <i class="fa-solid ${sec.icon}"></i>
          <h4>${sec.title}</h4>
        </div>
        <span class="meal-timing">${sec.timing}</span>
      </div>
      <ul class="meal-items-list">
        ${sec.items.map(item => {
          const isNonVeg = item.toLowerCase().includes('chicken') || item.toLowerCase().includes('egg') || item.toLowerCase().includes('mutton');
          return `
            <li class="meal-item">
              <span>${item}</span>
              <span class="meal-diet-tag ${isNonVeg ? 'non-veg' : 'veg'}" title="${isNonVeg ? 'Non-Vegetarian' : 'Pure Vegetarian'}"></span>
            </li>
          `;
        }).join('')}
      </ul>
    </div>
  `).join('');
}

function handleMessFeedbackSubmit(event) {
  event.preventDefault();
  const meal = document.getElementById('fb-meal-select').value;
  const rating = document.getElementById('fb-rating-select').value;
  const comments = document.getElementById('fb-comment-text').value.trim();

  closeModal('modal-mess-feedback');
  showToast(`Thank you for rating ${meal} with ${rating} stars! Feedback submitted to Mess Committee.`, 'success');
  document.getElementById('mess-feedback-form').reset();
}

// Render Hostel Fees Section
function renderFeesSection() {
  const f = db.fees;
  document.getElementById('fee-total-amount').textContent = `₹${f.total.toLocaleString()}`;
  document.getElementById('fee-paid-amount').textContent = `₹${f.paid.toLocaleString()}`;
  document.getElementById('fee-pending-amount').textContent = `₹${f.pending.toLocaleString()}`;
  document.getElementById('fee-due-date').textContent = f.dueDate;

  const percent = Math.min(100, Math.round((f.paid / f.total) * 100));
  const progressFill = document.getElementById('fee-progress-fill');
  if (progressFill) progressFill.style.width = `${percent}%`;

  const percentText = document.getElementById('fee-percent-text');
  if (percentText) percentText.textContent = `${percent}% Cleared`;

  const tableBody = document.getElementById('fee-history-table');
  if (!tableBody) return;

  tableBody.innerHTML = f.history.map(rec => `
    <tr>
      <td><strong>${rec.receiptNo}</strong></td>
      <td>${rec.date}</td>
      <td>${rec.desc}</td>
      <td><strong>₹${rec.amount.toLocaleString()}</strong></td>
      <td><span class="badge badge-neutral">${rec.method}</span></td>
      <td><span class="badge badge-success"><i class="fa-solid fa-check"></i> ${rec.status}</span></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="viewPrintReceipt('${rec.receiptNo}')">
          <i class="fa-solid fa-receipt"></i> Receipt
        </button>
      </td>
    </tr>
  `).join('');
}

function openPayFeeModal() {
  if (db.fees.pending <= 0) {
    showToast('Congratulations! All hostel dues have been fully cleared.', 'success');
    return;
  }
  document.getElementById('pay-amount-input').value = db.fees.pending;
  openModal('modal-pay-fee');
}

function handlePaymentProcess(event) {
  event.preventDefault();
  const amt = parseFloat(document.getElementById('pay-amount-input').value) || 0;
  const method = document.getElementById('pay-method-select').value;

  if (amt <= 0) {
    showToast('Please enter a valid payment amount', 'error');
    return;
  }

  // Generate Receipt
  const recNo = `REC-2026-${Math.floor(100 + Math.random() * 900)}`;
  const dateStr = new Date().toISOString().split('T')[0];

  db.fees.paid += amt;
  db.fees.pending = Math.max(0, db.fees.total - db.fees.paid);
  db.fees.status = db.fees.pending === 0 ? 'Paid' : 'Partially Paid';

  db.fees.history.unshift({
    receiptNo: recNo,
    date: dateStr,
    desc: 'Hostel Term Installment Fee Payment',
    amount: amt,
    method: method,
    status: 'Success'
  });

  // Notification
  db.notifications.unshift({
    id: Date.now(),
    title: 'Payment Confirmed',
    desc: `Payment of ₹${amt.toLocaleString()} received. Receipt #${recNo} generated.`,
    time: 'Just now',
    unread: true,
    icon: 'fa-circle-check',
    type: 'success'
  });

  store.saveData();
  closeModal('modal-pay-fee');
  renderFeesSection();
  renderStudentDashboard();
  renderNotifications();
  showToast(`Payment of ₹${amt.toLocaleString()} successful! Receipt #${recNo} created.`, 'success');
  viewPrintReceipt(recNo);
}

function viewPrintReceipt(receiptNo) {
  const rec = db.fees.history.find(r => r.receiptNo === receiptNo);
  if (!rec) return;

  const stu = db.currentUser;
  const container = document.getElementById('receipt-modal-content');
  if (!container) return;

  container.innerHTML = `
    <div style="border: 2px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.75rem; background: var(--bg-surface);">
      <div style="display: flex; justify-content: space-between; border-bottom: 2px solid var(--primary); padding-bottom: 1rem; margin-bottom: 1.25rem;">
        <div>
          <h2 style="font-size: 1.4rem; color: var(--primary); font-weight: 800;">SmartStay Campus Residence</h2>
          <p style="font-size: 0.8rem; color: var(--text-muted);">College of Engineering & Technology, Campus 4</p>
        </div>
        <div style="text-align: right;">
          <h4 style="font-size: 1.1rem; color: var(--text-main); font-weight: 700;">FEE RECEIPT</h4>
          <p style="font-size: 0.82rem; color: var(--success); font-weight: 600;">PAID & VERIFIED</p>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.85rem; margin-bottom: 1.5rem;">
        <div>
          <p><strong>Receipt Number:</strong> ${rec.receiptNo}</p>
          <p><strong>Payment Date:</strong> ${rec.date}</p>
          <p><strong>Payment Method:</strong> ${rec.method}</p>
        </div>
        <div>
          <p><strong>Student Name:</strong> ${stu.name}</p>
          <p><strong>Register No:</strong> ${stu.registerNo}</p>
          <p><strong>Hostel Room:</strong> ${stu.block} • Room ${stu.room}</p>
        </div>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 0.85rem;">
        <tr style="background: var(--bg-surface-alt); border-bottom: 1px solid var(--border-color);">
          <th style="padding: 0.6rem; text-align: left;">Description</th>
          <th style="padding: 0.6rem; text-align: right;">Amount</th>
        </tr>
        <tr>
          <td style="padding: 0.75rem 0.6rem; border-bottom: 1px solid var(--border-light);">${rec.desc}</td>
          <td style="padding: 0.75rem 0.6rem; text-align: right; border-bottom: 1px solid var(--border-light); font-weight: 700;">₹${rec.amount.toLocaleString()}</td>
        </tr>
        <tr style="font-weight: 800; font-size: 0.95rem;">
          <td style="padding: 0.75rem 0.6rem; text-align: right;">Total Amount Paid:</td>
          <td style="padding: 0.75rem 0.6rem; text-align: right; color: var(--primary);">₹${rec.amount.toLocaleString()}</td>
        </tr>
      </table>
      <div style="text-align: center; font-size: 0.75rem; color: var(--text-subtle); border-top: 1px dashed var(--border-color); padding-top: 0.8rem;">
        This is an official system generated receipt from SmartStay Smart Hostel Management System.
      </div>
    </div>
  `;

  openModal('modal-view-receipt');
}

// Render Notice Board Section
let currentNoticeCategory = 'all';

function filterNotices(category) {
  currentNoticeCategory = category;
  document.querySelectorAll('.notice-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-cat') === category);
  });
  renderNotices();
}

function renderNotices() {
  const container = document.getElementById('notices-grid-container');
  if (!container) return;

  const filtered = currentNoticeCategory === 'all'
    ? db.notices
    : db.notices.filter(n => n.category.toLowerCase() === currentNoticeCategory.toLowerCase());

  if (filtered.length === 0) {
    container.innerHTML = '<div style="grid-column: 1/-1; padding: 2rem; text-align: center; color: var(--text-muted);">No notices under this category</div>';
    return;
  }

  container.innerHTML = filtered.map(n => `
    <div class="notice-card ${n.urgent ? 'urgent' : ''}">
      <div>
        <div class="notice-top">
          <span class="badge ${n.urgent ? 'badge-danger' : 'badge-primary'}">${n.category}</span>
          <span style="font-size: 0.78rem; color: var(--text-subtle);"><i class="fa-regular fa-calendar"></i> ${n.date}</span>
        </div>
        <h3>${n.title}</h3>
        <p>${n.desc}</p>
      </div>
      <div class="notice-footer">
        <span style="font-size: 0.75rem; color: var(--text-muted);"><i class="fa-solid fa-user-tie"></i> ${n.author}</span>
        <button class="btn btn-outline btn-sm" onclick="readNoticeModal(${n.id})">Read More</button>
      </div>
    </div>
  `).join('');
}

function readNoticeModal(id) {
  const n = db.notices.find(item => item.id === id);
  if (!n) return;

  document.getElementById('read-notice-title').textContent = n.title;
  document.getElementById('read-notice-meta').textContent = `${n.category} • Published on ${n.date} by ${n.author}`;
  document.getElementById('read-notice-body').textContent = n.desc;
  openModal('modal-read-notice');
}

// Render Visitor Management Section
function renderVisitorsSection() {
  const tableBody = document.getElementById('visitors-history-table');
  if (!tableBody) return;

  if (db.visitors.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 2rem; color: var(--text-muted);">No visitors logged</td></tr>';
    return;
  }

  tableBody.innerHTML = db.visitors.map(v => {
    let badgeClass = 'badge-neutral';
    if (v.status === 'Approved') badgeClass = 'badge-success';
    if (v.status === 'Checked-out') badgeClass = 'badge-info';

    return `
      <tr>
        <td><strong>${v.name}</strong></td>
        <td><span class="badge badge-neutral">${v.relationship}</span></td>
        <td>${v.phone}</td>
        <td>${v.date} at ${v.time}</td>
        <td style="max-width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${v.purpose}</td>
        <td><strong style="color:var(--primary);">${v.passCode}</strong></td>
        <td><span class="badge ${badgeClass}">${v.status}</span></td>
      </tr>
    `;
  }).join('');
}

function handleVisitorSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('vis-name-input').value.trim();
  const relation = document.getElementById('vis-relation-select').value;
  const phone = document.getElementById('vis-phone-input').value.trim();
  const date = document.getElementById('vis-date-input').value;
  const time = document.getElementById('vis-time-input').value;
  const purpose = document.getElementById('vis-purpose-input').value.trim();

  if (!name || !phone || !date || !purpose) {
    showToast('Please fill all required visitor fields', 'error');
    return;
  }

  const passCode = `PASS-${Math.floor(1000 + Math.random() * 9000)}`;
  const newVis = {
    id: `VIS-${Math.floor(100 + Math.random() * 900)}`,
    name: name,
    relationship: relation,
    phone: phone,
    date: date,
    time: time || '10:00 AM',
    purpose: purpose,
    passCode: passCode,
    status: 'Approved'
  };

  db.visitors.unshift(newVis);
  store.saveData();
  renderVisitorsSection();
  closeModal('modal-add-visitor');
  document.getElementById('visitor-form').reset();
  showToast(`Visitor gate pass ${passCode} generated for ${name}!`, 'success');
}

// ==========================================
// 8. Admin Modules: Rendering & Handlers
// ==========================================
function renderAdminDashboard() {
  const totalStudents = db.adminStudents.length;
  const totalRooms = db.adminRooms.length;
  const occupiedBeds = db.adminRooms.reduce((acc, r) => acc + r.occupied, 0);
  const availableBeds = db.adminRooms.reduce((acc, r) => acc + r.available, 0);
  const pendingLeaves = db.leaves.filter(l => l.status === 'Pending').length;
  const pendingComplaints = db.complaints.filter(c => c.status !== 'Resolved').length;

  document.getElementById('adm-stat-students').textContent = totalStudents * 40; // realistic campus scaling
  document.getElementById('adm-stat-rooms').textContent = totalRooms * 15;
  document.getElementById('adm-stat-avail-beds').textContent = availableBeds * 8;
  document.getElementById('adm-stat-occupied-beds').textContent = occupiedBeds * 8;
  document.getElementById('adm-stat-pending-leaves').textContent = pendingLeaves;
  document.getElementById('adm-stat-pending-complaints').textContent = pendingComplaints;
  document.getElementById('adm-stat-visitors').textContent = db.visitors.length + 8;
}

// Admin Student Management Table
let studentSearchQuery = '';
let studentBlockFilter = 'all';

function filterAdminStudents() {
  studentSearchQuery = (document.getElementById('admin-student-search-input')?.value || '').toLowerCase();
  studentBlockFilter = document.getElementById('admin-student-block-filter')?.value || 'all';
  renderAdminStudentTable();
}

function renderAdminStudentTable() {
  const tableBody = document.getElementById('admin-students-table-body');
  if (!tableBody) return;

  const filtered = db.adminStudents.filter(stu => {
    const matchesSearch = stu.name.toLowerCase().includes(studentSearchQuery) ||
                          stu.regNo.toLowerCase().includes(studentSearchQuery) ||
                          stu.room.toLowerCase().includes(studentSearchQuery) ||
                          stu.dept.toLowerCase().includes(studentSearchQuery);
    const matchesBlock = studentBlockFilter === 'all' || stu.block.includes(studentBlockFilter);
    return matchesSearch && matchesBlock;
  });

  if (filtered.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="9" style="text-align:center; padding: 2rem; color: var(--text-muted);">No matching students found</td></tr>';
    return;
  }

  tableBody.innerHTML = filtered.map(stu => `
    <tr>
      <td><strong>${stu.id}</strong></td>
      <td>
        <div class="user-cell">
          <div class="user-cell-avatar" style="background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: 700;">
            ${stu.name.charAt(0)}
          </div>
          <div class="user-cell-info">
            <h5>${stu.name}</h5>
            <p>${stu.regNo}</p>
          </div>
        </div>
      </td>
      <td>${stu.dept}</td>
      <td>${stu.year}</td>
      <td><span class="badge badge-neutral">${stu.block} • ${stu.room}</span></td>
      <td>${stu.phone}</td>
      <td><span class="badge badge-${stu.feeStatus === 'Paid' ? 'success' : 'warning'}">${stu.feeStatus}</span></td>
      <td><span class="badge badge-success">${stu.status}</span></td>
      <td>
        <div style="display: flex; gap: 0.4rem;">
          <button class="btn btn-secondary btn-sm btn-icon" title="Edit" onclick="editStudentModal('${stu.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="btn btn-danger btn-sm btn-icon" title="Delete" onclick="deleteStudent('${stu.id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function handleAddStudentSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('add-stu-name').value.trim();
  const regNo = document.getElementById('add-stu-reg').value.trim();
  const dept = document.getElementById('add-stu-dept').value;
  const year = document.getElementById('add-stu-year').value;
  const block = document.getElementById('add-stu-block').value;
  const room = document.getElementById('add-stu-room').value.trim();
  const phone = document.getElementById('add-stu-phone').value.trim();

  if (!name || !regNo || !room || !phone) {
    showToast('Please provide all required student details', 'error');
    return;
  }

  const newStu = {
    id: `STU-2024-${Math.floor(100 + Math.random() * 900)}`,
    name: name,
    regNo: regNo,
    dept: dept,
    year: year,
    block: block,
    room: room,
    phone: phone,
    feeStatus: 'Pending',
    status: 'Active'
  };

  db.adminStudents.unshift(newStu);
  store.saveData();
  renderAdminStudentTable();
  renderAdminDashboard();
  closeModal('modal-add-student');
  document.getElementById('add-student-form').reset();
  showToast(`Resident student ${name} enrolled successfully!`, 'success');
}

function deleteStudent(id) {
  const stu = db.adminStudents.find(s => s.id === id);
  if (!stu) return;

  if (confirm(`Are you sure you want to remove ${stu.name} (${stu.id}) from the hostel registry?`)) {
    db.adminStudents = db.adminStudents.filter(s => s.id !== id);
    store.saveData();
    renderAdminStudentTable();
    renderAdminDashboard();
    showToast(`Student record ${stu.name} removed.`, 'info');
  }
}

let activeEditStudentId = null;
function editStudentModal(id) {
  const stu = db.adminStudents.find(s => s.id === id);
  if (!stu) return;
  activeEditStudentId = id;

  document.getElementById('edit-stu-name').value = stu.name;
  document.getElementById('edit-stu-dept').value = stu.dept;
  document.getElementById('edit-stu-room').value = stu.room;
  document.getElementById('edit-stu-phone').value = stu.phone;
  openModal('modal-edit-student');
}

function handleEditStudentSubmit(event) {
  event.preventDefault();
  const stu = db.adminStudents.find(s => s.id === activeEditStudentId);
  if (!stu) return;

  stu.name = document.getElementById('edit-stu-name').value.trim();
  stu.dept = document.getElementById('edit-stu-dept').value;
  stu.room = document.getElementById('edit-stu-room').value.trim();
  stu.phone = document.getElementById('edit-stu-phone').value.trim();

  store.saveData();
  closeModal('modal-edit-student');
  renderAdminStudentTable();
  showToast('Student information successfully updated.', 'success');
}

// Admin Room Management
function renderAdminRoomTable() {
  const tableBody = document.getElementById('admin-rooms-table-body');
  if (!tableBody) return;

  tableBody.innerHTML = db.adminRooms.map((rm, idx) => `
    <tr>
      <td><strong>${rm.block}</strong></td>
      <td><strong>${rm.roomNo}</strong></td>
      <td>${rm.floor}</td>
      <td>${rm.type}</td>
      <td>${rm.capacity}</td>
      <td><span class="badge badge-neutral">${rm.occupied} Occupied</span></td>
      <td><span class="badge badge-success">${rm.available} Available</span></td>
      <td><span class="badge badge-${rm.status === 'Available' ? 'success' : 'neutral'}">${rm.status}</span></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="deleteRoom(${idx})"><i class="fa-solid fa-trash text-danger"></i></button>
      </td>
    </tr>
  `).join('');
}

function handleAddRoomSubmit(event) {
  event.preventDefault();
  const block = document.getElementById('add-room-block').value;
  const roomNo = document.getElementById('add-room-no').value.trim();
  const floor = document.getElementById('add-room-floor').value;
  const type = document.getElementById('add-room-type').value;
  const cap = parseInt(document.getElementById('add-room-cap').value) || 4;

  if (!roomNo) {
    showToast('Please specify Room Number', 'error');
    return;
  }

  db.adminRooms.push({
    block: block,
    roomNo: roomNo,
    floor: floor,
    type: type,
    capacity: cap,
    occupied: 0,
    available: cap,
    status: 'Available'
  });

  store.saveData();
  renderAdminRoomTable();
  renderAdminDashboard();
  closeModal('modal-add-room');
  document.getElementById('add-room-form').reset();
  showToast(`Room ${block} - ${roomNo} added to inventory.`, 'success');
}

function deleteRoom(index) {
  if (confirm('Delete this room from hostel records?')) {
    db.adminRooms.splice(index, 1);
    store.saveData();
    renderAdminRoomTable();
    renderAdminDashboard();
    showToast('Room deleted from records.', 'info');
  }
}

// Admin Leave Approvals
function renderAdminLeaveApprovals() {
  const tableBody = document.getElementById('admin-leaves-approval-table');
  if (!tableBody) return;

  tableBody.innerHTML = db.leaves.map(l => {
    let badgeClass = 'badge-warning';
    if (l.status === 'Approved') badgeClass = 'badge-success';
    if (l.status === 'Rejected') badgeClass = 'badge-danger';

    return `
      <tr>
        <td><strong>${l.id}</strong></td>
        <td>
          <strong>${db.currentUser.name}</strong><br>
          <small style="color:var(--text-muted);">${db.currentUser.room} • ${db.currentUser.regNo}</small>
        </td>
        <td><span class="badge badge-neutral">${l.type}</span></td>
        <td>${l.from} &rarr; ${l.to} (${l.days}d)</td>
        <td>${l.destination}<br><small style="color:var(--text-subtle);">${l.reason}</small></td>
        <td><span class="badge ${badgeClass}">${l.status}</span></td>
        <td>
          ${l.status === 'Pending' ? `
            <div style="display: flex; gap: 0.4rem;">
              <button class="btn btn-success btn-sm" onclick="setLeaveStatus('${l.id}', 'Approved')"><i class="fa-solid fa-check"></i> Approve</button>
              <button class="btn btn-danger btn-sm" onclick="setLeaveStatus('${l.id}', 'Rejected')"><i class="fa-solid fa-xmark"></i> Reject</button>
            </div>
          ` : `<small style="color:var(--text-subtle);">Action complete</small>`}
        </td>
      </tr>
    `;
  }).join('');
}

function setLeaveStatus(leaveId, newStatus) {
  const l = db.leaves.find(item => item.id === leaveId);
  if (!l) return;
  l.status = newStatus;

  // Dispatch student notification
  db.notifications.unshift({
    id: Date.now(),
    title: `Leave ${newStatus}`,
    desc: `Your leave request ${leaveId} has been marked as ${newStatus} by Chief Warden.`,
    time: 'Just now',
    unread: true,
    icon: newStatus === 'Approved' ? 'fa-calendar-check' : 'fa-calendar-xmark',
    type: newStatus === 'Approved' ? 'success' : 'danger'
  });

  store.saveData();
  renderAdminLeaveApprovals();
  renderLeavesSection();
  renderAdminDashboard();
  renderNotifications();
  showToast(`Leave request ${leaveId} ${newStatus.toLowerCase()}!`, newStatus === 'Approved' ? 'success' : 'warning');
}

// Admin Complaints Management
function renderAdminComplaintsTable() {
  const tableBody = document.getElementById('admin-complaints-management-table');
  if (!tableBody) return;

  tableBody.innerHTML = db.complaints.map(c => {
    let prioClass = 'badge-neutral';
    if (c.priority === 'High' || c.priority === 'Urgent') prioClass = 'badge-danger';
    if (c.priority === 'Medium') prioClass = 'badge-warning';

    let statusClass = 'badge-warning';
    if (c.status === 'Resolved') statusClass = 'badge-success';
    if (c.status === 'In Progress') statusClass = 'badge-info';

    return `
      <tr>
        <td><strong>${c.id}</strong></td>
        <td><span class="badge badge-neutral">${c.category}</span></td>
        <td><strong>${c.subject}</strong><br><small style="color:var(--text-muted);">${c.desc}</small></td>
        <td>${c.room}</td>
        <td><span class="badge ${prioClass}">${c.priority}</span></td>
        <td><span class="badge ${statusClass}">${c.status}</span></td>
        <td>
          <div style="display: flex; gap: 0.35rem; align-items: center;">
            <select style="padding: 0.35rem; font-size: 0.8rem; width: auto;" onchange="updateComplaintStatus('${c.id}', this.value)">
              <option value="Pending" ${c.status === 'Pending' ? 'selected' : ''}>Pending</option>
              <option value="In Progress" ${c.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
              <option value="Resolved" ${c.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
            </select>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function updateComplaintStatus(cmpId, status) {
  const c = db.complaints.find(item => item.id === cmpId);
  if (!c) return;
  c.status = status;

  db.notifications.unshift({
    id: Date.now(),
    title: `Ticket ${cmpId} Updated`,
    desc: `Complaint status updated to "${status}".`,
    time: 'Just now',
    unread: true,
    icon: 'fa-screwdriver-wrench',
    type: status === 'Resolved' ? 'success' : 'info'
  });

  store.saveData();
  renderAdminComplaintsTable();
  renderComplaintsSection();
  renderAdminDashboard();
  renderNotifications();
  showToast(`Ticket ${cmpId} set to "${status}".`, 'success');
}

// ==========================================
// 9. Interactive Chart.js Initializations
// ==========================================
function initCharts() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const gridColor = isDark ? '#26354a' : '#f1f5f9';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  // 1. Student Attendance Monthly Bar Chart
  const attCanvas = document.getElementById('student-attendance-chart');
  if (attCanvas && window.Chart) {
    if (attendanceChartInstance) attendanceChartInstance.destroy();
    attendanceChartInstance = new Chart(attCanvas, {
      type: 'bar',
      data: {
        labels: db.attendance.monthly.map(m => m.month),
        datasets: [{
          label: 'Attendance %',
          data: db.attendance.monthly.map(m => m.percent),
          backgroundColor: '#4f46e5',
          borderRadius: 8,
          barPercentage: 0.55
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            min: 70,
            max: 100,
            ticks: { color: textColor, callback: val => `${val}%` },
            grid: { color: gridColor }
          },
          x: {
            ticks: { color: textColor },
            grid: { display: false }
          }
        }
      }
    });
  }

  // 2. Admin Room Occupancy Chart
  const occCanvas = document.getElementById('admin-occupancy-chart');
  if (occCanvas && window.Chart) {
    if (adminOccupancyChartInstance) adminOccupancyChartInstance.destroy();
    adminOccupancyChartInstance = new Chart(occCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Occupied Beds', 'Vacant Beds', 'Under Maintenance'],
        datasets: [{
          data: [432, 48, 12],
          backgroundColor: ['#4f46e5', '#10b981', '#f59e0b'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: textColor, font: { family: 'Plus Jakarta Sans', weight: '600' } }
          }
        },
        cutout: '70%'
      }
    });
  }

  // 3. Admin Fee Collection Bar Chart
  const feeCanvas = document.getElementById('admin-fee-chart');
  if (feeCanvas && window.Chart) {
    if (adminFeeChartInstance) adminFeeChartInstance.destroy();
    adminFeeChartInstance = new Chart(feeCanvas, {
      type: 'line',
      data: {
        labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
        datasets: [{
          label: 'Fee Collection (₹ in Lakhs)',
          data: [6.5, 18.2, 14.0, 9.8, 4.5, 12.0],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          fill: true,
          tension: 0.35,
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            ticks: { color: textColor, callback: val => `₹${val}L` },
            grid: { color: gridColor }
          },
          x: {
            ticks: { color: textColor },
            grid: { display: false }
          }
        }
      }
    });
  }

  // 4. Admin Complaints Breakdown
  const cmpCanvas = document.getElementById('admin-complaints-chart');
  if (cmpCanvas && window.Chart) {
    if (adminComplaintChartInstance) adminComplaintChartInstance.destroy();
    adminComplaintChartInstance = new Chart(cmpCanvas, {
      type: 'polarArea',
      data: {
        labels: ['Wi-Fi / Internet', 'Electrical', 'Plumbing', 'Housekeeping', 'Mess'],
        datasets: [{
          data: [14, 8, 6, 11, 4],
          backgroundColor: [
            'rgba(79, 70, 229, 0.7)',
            'rgba(245, 158, 11, 0.7)',
            'rgba(14, 165, 233, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(239, 68, 68, 0.7)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: textColor }
          }
        },
        scales: {
          r: {
            ticks: { display: false },
            grid: { color: gridColor }
          }
        }
      }
    });
  }
}

// ==========================================
// 10. Master Initialization on DOM Load
// ==========================================
function initAppHeader() {
  const searchInput = document.getElementById('global-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => handleGlobalSearch(e.target.value));
  }
}

function renderAllSections() {
  renderStudentDashboard();
  renderStudentProfile();
  renderRoomSection();
  renderAttendanceSection();
  renderLeavesSection();
  renderComplaintsSection();
  renderMessCards(currentMessDay);
  renderFeesSection();
  renderNotices();
  renderVisitorsSection();
  renderNotifications();

  // Admin renders
  renderAdminDashboard();
  renderAdminStudentTable();
  renderAdminRoomTable();
  renderAdminLeaveApprovals();
  renderAdminComplaintsTable();

  // Charts
  setTimeout(initCharts, 150);
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  // Set default view
  setLoginRole('student');
});
