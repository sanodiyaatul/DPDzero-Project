# 📝 TeamPulse Feedback System

A lightweight performance feedback system where **managers** can give feedback to **employees**, and employees can view their feedback and acknowledge it.

---

## 🚀 Features

- 🔐 User Registration & Role-based Login (Manager / Employee)
- 📝 Manager can:
  - Submit feedback to employees
  - View feedback history
- 👥 Employee can:
  - View feedback received
  - Acknowledge feedback
- 📦 Full Docker support (backend & frontend)
- ⚡ FastAPI + React.js with Tailwind CSS

---

## 🛠 Tech Stack

| Layer       | Technology                |
|------------|----------------------------|
| Frontend   | React.js + Tailwind CSS    |
| Backend    | FastAPI + SQLAlchemy       |
| Database   | SQLite                     |
| Container  | Docker + Docker Compose    |

---

## 📁 Project Structure

```
feedback-system-project/
├── frontend/                      # React frontend
│   ├── src/
│   │   ├── pages/                 # Login, Register, Manager, Employee pages
│   │   └── App.jsx
│   └── Dockerfile
├── feedback-system-new/
│   └── teampulse-backend/
│       └── backend/
│           ├── app/
│           │   ├── main.py
│           │   ├── models.py
│           │   ├── schemas.py
│           │   ├── crud.py
│           │   └── database.py
│           └── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Setup Instructions

### 🧪 Local Development (Without Docker)

#### 1. Backend
```bash
cd feedback-system-new/teampulse-backend/backend
python -m venv venv
venv\Scripts\activate  # or source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

---

### 🐳 Run Using Docker

```bash
# Run containers
docker compose up --build

# Access frontend
http://localhost:5173

# Access backend
http://localhost:8000/docs
```

---

## 🔐 Default Roles

- Users must register first via the Register screen
- Select either **manager** or **employee**
- Managers can only submit feedback if employees are registered with their ID

---

## 📬 API Endpoints (FastAPI)

- `POST /register/` – Register a user
- `GET /user/{user_id}` – Get user by ID
- `POST /feedback/` – Submit feedback
- `GET /manager/{manager_id}/team_feedbacks` – Manager's submitted feedbacks
- `GET /employee/{employee_id}/feedbacks` – Employee’s received feedback
- `PUT /feedback/{id}/acknowledge` – Acknowledge a feedback

---

## 📌 To-Do (Future Scope)

- JWT Auth + Role Guards
- Manager dashboard with analytics
- Feedback edit/delete
- Better styling and validation

---

## 💡 Author

Made by **Atul** as part of a Fullstack Internship project.
## 🧠 How It Works

This feedback system is designed to facilitate streamlined and effective performance reviews within teams. Here’s how the components interact:

### 1. User Roles
- **Manager**: Can log in, select an employee, and submit feedback (strengths, improvements, sentiment).
- **Employee**: Can log in and view feedback received from their manager. Can also acknowledge it.

### 2. User Flow
- A user registers with a role (`manager` or `employee`). If an employee, they’re assigned a manager.
- On login, the system fetches user details and redirects them based on role.
- Managers submit feedback for employees using a simple form.
- Submitted feedback is saved in a PostgreSQL (or SQLite) database via FastAPI backend.
- Employees can view their received feedback.

### 3. API Communication
- The React frontend uses Axios to send/receive HTTP requests to/from the FastAPI backend.
- Backend routes are RESTful and handle user registration, feedback submission, retrieval, and acknowledgment.

### 4. Docker Setup
- The app is containerized using Docker Compose with separate containers for:
  - **Backend**: FastAPI + Uvicorn + SQLAlchemy
  - **Frontend**: React + Vite
- Containers communicate over the same Docker network.

This modular, scalable setup makes it easy to deploy in both development and production environments.
