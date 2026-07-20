# AgriTech Publishing Portal 🌾

![AgriTech Banner](https://img.shields.io/badge/AgriTech-Publishing_System-006633?style=for-the-badge)

AgriTech is a full-stack, comprehensive submission and review portal designed for academic and scientific publishing in the agricultural technology sector. It bridges the gap between authors and editorial administrators by providing tailored dashboards for submitting manuscripts, managing peer reviews, and streamlining the publication process.

## 🚀 Key Features

### For Authors
* **Intuitive Dashboard:** Track all active submissions and published papers at a glance.
* **Revision Management:** Easily upload new revisions based on reviewer feedback.
* **Transparent Timeline:** View exactly where your manuscript is in the review process via a dynamic status timeline.
* **Direct Feedback:** Read threaded feedback from editors and reviewers on specific revisions.

### For Administrators & Editors
* **Centralized Review Queue:** Manage all inbound manuscripts from a clean, data-rich table.
* **Status Workflows:** Move submissions fluidly through statuses (e.g., *Under Review*, *Major Revision*, *Accepted*).
* **Communication Engine:** Post threaded comments and notes assigned directly to specific manuscript revisions.
* **One-Click Publishing:** Transition accepted papers directly into the published public portal.

---

## 🛠️ Technology Stack

**Frontend:**
* [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/) - Lightning-fast UI rendering and build tooling.
* [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling for a highly responsive, custom design.
* [Lucide React](https://lucide.dev/) - Clean, consistent iconography.
* [React Router DOM](https://reactrouter.com/) - Client-side routing.

**Backend:**
* [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/) - Robust REST API framework.
* [Sequelize ORM](https://sequelize.org/) - Relational database mapping.
* **SQLite** - Lightweight relational database used for local development (production-ready for Postgres).
* **JWT & bcryptjs** - Secure, role-based authentication.

---

## 💻 Local Development Setup

To get this project running on your local machine, follow these steps.

### Prerequisites
* Node.js (v16+ recommended)
* npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/agritech.git
cd agritech
```

### 2. Install Dependencies
Instead of navigating to individual folders, install everything from the root directory:
```bash
npm run install:all
```

### 3. Start the Application
You can run both the frontend and backend simultaneously using the concurrently script:
```bash
npm run dev
```
* The backend will run on `http://localhost:5000` (and seed the DB automatically)
* The frontend will run on `http://localhost:5173`

---

## 🔑 Mock Credentials for Testing

Upon starting the backend for the first time, the database is seeded with mock users and dummy submissions to help you test the UI immediately.

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin123@agritech.com` | `password123` |
| **Author** | `author123@agritech.com` | `password123` |
| **Author 2**| `alice@agritech.com` | `password123` |

---

## 🗄️ Database Architecture

The system relies on a fully normalized relational schema:
* **`Users`**: Holds credentials, roles (admin/author), and profile data.
* **`Submissions`**: The core paper metadata (Title, Abstract, Category).
* **`Revisions`**: Tracks physical file uploads and version history.
* **`Comments`**: Threaded feedback linked to specific roles and revisions.
* **`SubmissionLogs`**: An immutable timeline tracking every status change over time.
* **`PublishedPapers`**: Papers that have completed the review cycle and are public.

---

## 🗺️ Roadmap & Future Enhancements

- [ ] **File Storage Integration:** Migrate from mock file strings to actual binary upload handling using Multer and AWS S3 / Cloudinary.
- [ ] **Email Notifications:** Integrate NodeMailer/SendGrid to automate email alerts to authors upon status changes.
- [ ] **Production Database:** Migrate the Sequelize configuration from SQLite to PostgreSQL.
- [ ] **Security Hardening:** Implement rate limiting and JWT refresh tokens.

---

*Designed and built for modern agricultural research dissemination.*
