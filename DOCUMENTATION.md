# Blood Donor Connector - Application Documentation

## 1. Project Overview
The **Blood Donor Connector** is a modern, responsive web application designed to bridge the gap between blood donors and recipients. It features a premium **Glassmorphism UI**, intuitive workflows, and thematic animations to enhance user engagement.

### Key Features
- **Smart Donor Registration**: Step-by-step process with OTP verification.
- **Advanced Search**: Filter donors by Blood Group, State, City, Area, and Availability.
- **Admin Dashboard**: Comprehensive management of the donor network and system analytics.
- **Thematic UX**: Unique animations for different actions (Falling Blood Drops, Rising Hearts, System Pulse).

---

## 2. Technical Architecture

### Frontend Stack
- **Framework**: React.js 18
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS + Custom Glassmorphism System
- **HTTP Client**: Axios with Interceptors
- **State Management**: React Hooks (`useState`, `useEffect`, `useContext`)

### Folder Structure
```
src/
├── components/          # Reusable UI components
│   ├── BloodLoading.js  # "Blood Drops" animation (Search)
│   ├── HeartLoading.js  # "Rising Hearts" animation (Registration)
│   ├── PulseLoading.js  # "System Pulse" animation (Admin)
│   ├── SearchableSelect.js # Enhanced dropdown with search
│   └── Navbar.js        # Responsive navigation
├── pages/               # Main application views
│   ├── DonorRegistration.js # Registration logic
│   ├── SearchDonors.js      # Search interface
│   └── AdminDashboard.js    # Admin control panel
├── services/            # API communication layer
│   └── api.js           # Centralized Axios instance & endpoints
└── utils/               # Helper functions and constants
    └── constants.js     # Static data (Blood Groups, Cities, Areas)
```

---

## 3. Core Workflows & Implementation

### A. Donor Registration Process
**Objective**: Onboard new donors securely and efficiently.

1.  **Step 1: Information Collection**
    *   **User Action**: Fills out personal details, blood group, and contact info.
    *   **Features**:
        *   Uses `SearchableSelect` for State, City, and Specific Area.
        *   Validates phone number and email format.
    *   **Animation**: When submitting, the **"Rising Hearts"** (`HeartLoading`) animation plays, symbolizing the act of giving love/life.

2.  **Step 2: Verification (OTP)**
    *   **API Call**: `POST /donors/register/initiate`
    *   **Process**: The system sends an OTP to the provided contact method (handled by backend).
    *   **User Action**: Enters the OTP to confirm identity.

3.  **Step 3: Completion**
    *   **API Call**: `POST /donors/register/complete?otp={otp}`
    *   **Result**: Donor is added to the database and becomes searchable.

### B. Find Donors (Search)
**Objective**: Enable recipients to find compatible donors quickly.

1.  **Search Interface**
    *   **Filters**: Blood Group, State, City, Specific Area, Availability Status.
    *   **Logic**: Cascading dropdowns (Selecting State unlocks City -> Selecting City unlocks Area).

2.  **Execution**
    *   **Trigger**: User clicks "Search Donors".
    *   **Animation**: **"Blood Drops"** (`BloodLoading`) fall across the screen, creating a thematic waiting experience.
    *   **API Call**: `POST /donors/search` with the filter criteria.

3.  **Results**
    *   Displays a list of donors matching the criteria.
    *   Shows contact options and availability status.

### C. Admin Dashboard
**Objective**: Manage the system and monitor activity.

1.  **Login**
    *   **Endpoint**: `POST /admin/login` (JWT Authentication).
    *   **Security**: Stores JWT in `localStorage`. Access to dashboard is protected by `ProtectedRoute.js`.

2.  **Dashboard Features**
    *   **Animation**: **"System Pulse"** (`PulseLoading`) indicates data syncing/loading.
    *   **Donor Management**: View, Edit, Delete, or toggle Status (Active/Resting) of donors.
    *   **Analytics**: View total donor count and operational status.

---

## 4. Mailing & Communication Process
The application handles communication primarily through backend triggers ensuring reliability.

1.  **Registration Emails**:
    *   Triggered automatically by the backend upon successful call to `/donors/register/complete`.
    *   Welcome email sent to the donor confirming registration.

2.  **OTP Delivery**:
    *   Triggered by `/donors/register/initiate`.
    *   SMS/Email containing the One-Time Password for verification.

3.  **Contact Form**:
    *   The `Contact.js` page allows users to send inquiries.
    *   These are routed to the admin support email via the backend's notification service.

---

## 5. Deployment Process

### Prerequisites
- Node.js (v16+)
- NPM or Yarn
- Access to a hosting provider (Vercel, Netlify, AWS, Railway)

### Step-by-Step Deployment

1.  **Configuration**
    *   Ensure `src/services/api.js` points to the correct production backend URL:
        ```javascript
        const API_BASE_URL = 'https://blood-donor-app-production-ab11.up.railway.app/api';
        ```

2.  **Build the Application**
    Run the build command to generate static files:
    ```bash
    npm run build
    ```
    *   This creates a `build/` directory containing the optimized production code.

3.  **Deploy**
    *   **Option A: Static Hosting (Vercel/Netlify)**
        *   Upload the `build/` folder or connect your Git repository.
        *   Set the build command to `npm run build` and publish directory to `build`.
    *   **Option B: Serving via Backend**
        *   Copy the contents of `build/` to the backend's static resource folder (e.g., `src/main/resources/static` in Spring Boot).

4.  **Verification**
    *   Access the deployed URL.
    *   Test the **Registration** flow to ensure API connectivity.
    *   Verify animations load correctly on all devices.

---

## 6. Thematic Animations Guide

| Animation | Component | Logic | Meaning |
| :--- | :--- | :--- | :--- |
| **Rising Hearts** | `HeartLoading.js` | Particles float *upwards* with rotation. | Symbolizes uplifting spirits and giving life. Used in Registration. |
| **Blood Drops** | `BloodLoading.js` | Drops fall *downwards* with gravity effect. | Literal representation of blood donation. Used in Search. |
| **System Pulse** | `PulseLoading.js` | Concentric rings expand from center (Sonar). | Represents system monitoring and activity. Used in Admin Dashboard. |

---

*Documentation generated by Antigravity Assistant.*
