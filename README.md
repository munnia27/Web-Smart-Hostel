# SmartStay – Indian College Student Hostel Management System
### Modern, Realistic & Practical Campus Portal (2026 Edition)

SmartStay has been crafted to combine the **attractive, modern dark visual style** (deep dark background, electric cyan/blue/indigo glow, and glassmorphic cards) with **authentic Indian college hostel life and student utilities** (such as IIT, NIT, and state technical university hostels).

The entire application is completely self-contained in a single master file: [index.html](file:///c:/website/website/smart%20hostel/index.html).

---

## 🎨 Visual Design System & Aesthetics

* **Deep Modern Background**: Layered rich dark tones (`#05070c`, `#090d16`, `#0f1626`).
* **Vibrant Accent Colors**: Electric Cyan (`#38bdf8`), Blue (`#3b82f6`), Indigo (`#6366f1`), Purple glow (`#a855f7`), and semantic Amber/Emerald badges.
* **Translucent Glassmorphic Cards**: `backdrop-filter: blur(16px)` with subtle cyan borders and smooth hover lifts.
* **Realistic Indian College Atmosphere**: Grounded, academic, disciplined, and student-friendly — avoiding international 5-star hotel/resort styling.

---

## ⚡ Key Highlights & Sections

### 1. 🎬 Hero Section
* **HD Hostel Building Background**: High-resolution campus exterior with dark radial gradient overlay.
* **Branding & Headline**:
  * **SMARTSTAY** – Indian College Student Hostel
  * *"A Better Place to Stay, Study & Grow"*
  * Subtext describing safe, community-driven accommodation for engineering, medical, and university scholars.
* **Action Buttons**: **Explore Hostel Rooms**, **Student Login**, and **Dashboard Preview**.
* **Smooth Entrance Animations**: Triggered when the webpage opens.

### 2. 🔢 Animated Statistics / Live Counters (0 &rarr; Target)
* Positioned directly below the hero section.
* Counters start from **0** and smoothly count up over ~1.8 seconds using an `easeOutCubic` curve:
  * **120+** Hostel Rooms
  * **450+** Resident Students
  * **520+** Allocated Beds
  * **4** Residential Blocks (Aryabhatta, Raman, Kalpana, Freshers Wing)
* Automatically triggered using an `IntersectionObserver` when the section becomes visible on screen.

### 3. 📢 Daily Hostel Updates (4 Ticker Cards)
* **💧 Water Supply Hours**: Morning (6:00 AM – 9:30 AM) & Evening (5:00 PM – 8:30 PM) with active solar water heaters.
* **🍽️ Today's Mess Special**: *Paneer Butter Masala, Arhar Dal Tadka, Fresh Chapati, Jeera Rice, Curd & Warm Gulab Jamun*.
* **⚡ Maintenance Notice**: Filter replacement completed on 2nd Floor Block A; electrician on duty.
* **📢 Warden Advisory**: Exam study quiet hours enforced from 10 PM. Gate biometric scan closes at 9:30 PM sharp.

### 4. 🛏️ Practical College Hostel Rooms
* **Double Sharing Room (2 Sharing)**: Dual study desks, individual cots, 2 steel almirahs, attached balcony, ceiling fan, and 1 Gbps LAN ports (*₹32,000 / Semester*).
* **Triple Sharing Room (3 Sharing)**: Sturdy cots with storage, 3 study tables, lockable wardrobes (*₹28,000 / Semester*).
* **Four Sharing Room (4 Sharing)**: Economical, collaborative accommodation for 1st-year freshers (*₹24,000 / Semester*).
* Each card includes number of beds, availability badge, facilities, and a **"View Details"** button opening an interactive specs modal.

### 5. 🛠️ Hostel Facilities (10 Practical Cards)
1. 🛏️ **Comfortable Rooms**: Cot with storage, study table & chair, Godrej steel almirah.
2. 📶 **High-Speed Wi-Fi**: NKN Gigabit campus network & individual LAN ports.
3. 🍛 **Mess & Dining**: Hygienic 4-meal daily menu with North & South Indian dishes.
4. 📚 **24x7 Study Room**: Air-cooled quiet reading hall with power outlets.
5. 🚿 **Clean RO Water**: Industrial RO purifiers & cold dispensers with TDS checks.
6. 🧺 **Laundry Service**: Semi-automatic washing machines & rooftop drying terraces.
7. 🔒 **CCTV & Security**: Facial recognition biometric gate turnstiles & 24/7 security.
8. ⚡ **Power Backup**: Heavy-duty DG generator sets ensuring fans, lights & Wi-Fi never shut off.
9. 🏸 **Sports & Recreation**: Volleyball court, badminton court, table tennis, carrom & cricket nets.
10. 🧑‍💼 **Warden Support**: Resident wardens, caretaker desk & emergency ambulance on call.

### 6. 🍛 Weekly Indian Mess Menu
* Interactive Monday to Sunday tabs with:
  * **Breakfast** (07:30 – 09:15 AM): *Poha with peanuts, Aloo Paratha with white butter & curd, Idli-Vada Sambar, Rava Upma, Puri Bhaji, Chai & Milk*.
  * **Lunch** (12:30 – 02:15 PM): *Arhar Dal Fry, Rajma Chawal, Kadhi Pakoda, Seasonal Sabzi, Tawa Chapati, Curd/Chhach, Salad & Papad*.
  * **Dinner** (07:45 – 09:30 PM): *Dal Makhani, Kadai Paneer, Hyderabadi Dum Biryani, Egg Curry, Hot Phulkas, Rice Kheer, Gulab Jamun*.
* **Dietary Tagging**: Pure Vegetarian (`green dot`) and Non-Veg / Egg options (`red dot`).
* **Mess Feedback Modal**: 5-star food taste rating and comments box.

### 7. 📢 Notice Board (Badges: NEW / IMPORTANT / UPDATE)
* **IMPORTANT**: Night Curfew & Biometric In-Time Compliance (9:30 PM).
* **NEW**: Mid-Semester Examination Quiet Study Hours (10 PM – 6 AM).
* **UPDATE**: Sunday Grand Feast & Mess Review Committee meeting.
* **UPDATE**: Diwali & Vacation Hostel Leave Outpass Advisory.

### 8. 💻 Student Dashboard Preview
* **Resident Profile Card**: Student name (*Aditya Verma*), roll number (*22CSE042*), department (*B.Tech CSE*), room (*A-204, Bed 2*).
* **KPI Metrics**: Allocated Room, Biometric Attendance (91.4% with 75% rule compliance), Active Leave Status, Pending Complaints.
* **Live Applications Table**: Interactive tracking of registered outpasses and maintenance tickets.

### 9. 🛠️ 12 Unique Indian College Student Features
1. **Room Availability**: Live vacancy counters per block and sharing type.
2. **Student Dashboard**: Live profile, room details, and attendance meter.
3. **Online Leave Outpass**: Night outpass application with parent mobile SMS verification.
4. **Complaint Management**: Log electrical, plumbing, carpentry, or Wi-Fi tickets.
5. **Mess Weekly Menu**: 7-day breakfast, lunch, and dinner dietary schedules.
6. **Hostel Notice Board**: Official circulars with urgency badges.
7. **Visitor Entry Pass**: Pre-register parents and guardians for gate clearance.
8. **Room Change Request**: Apply for room shift or wing exchange for the upcoming term.
9. **Maintenance Tracking**: Live SLA status (`Pending` &rarr; `Under Repair` &rarr; `Resolved`).
10. **Emergency SOS**: Immediate hotline for Chief Warden, Security, and Anti-Ragging Helpline.
11. **Student Feedback**: Rate mess food quality and cleanliness.
12. **Daily Hostel Updates**: Live water timings, dinner special, and warden circulars.

---

## 🚀 How to Run in VS Code

The application is completely self-contained in a single file:

1. Open **Visual Studio Code**.
2. Open the folder: `c:\website\website\smart hostel`
3. Right-click on [index.html](file:///c:/website/website/smart%20hostel/index.html) and select **"Open with Live Server"**, or double-click `index.html` in Windows Explorer to open directly in Google Chrome, Microsoft Edge, or Firefox.

### 🔑 Demo Login Credentials

| Role | Username / Roll No | Password |
| :--- | :--- | :--- |
| **Student** | `22CSE042` | `student123` |
| **Chief Warden** | `warden.rajesh@college.edu` | `admin123` |

*(You can also click the one-click **"Fill Student"** / **"Fill Warden"** buttons inside the sign-in modal to test in seconds!)*
