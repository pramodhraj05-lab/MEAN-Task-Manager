# ✅ MEAN Task Manager

A full-stack Task Manager built with the **MEAN Stack**:
- **M**ongoDB — database
- **E**xpress.js — REST API backend
- **A**ngular — frontend SPA
- **N**ode.js — runtime

---

## 📁 Project Structure

```
mean-task-manager/
├── backend/              ← Express + MongoDB API
│   ├── models/
│   │   └── Task.js       ← Mongoose schema
│   ├── routes/
│   │   └── tasks.js      ← CRUD routes
│   ├── .env              ← MongoDB URI + port config
│   ├── server.js         ← Entry point
│   └── package.json
│
└── frontend/             ← Angular SPA
    ├── src/
    │   ├── app/
    │   │   ├── app.component.ts      ← Main component logic
    │   │   ├── app.component.html    ← Template
    │   │   ├── app.component.css     ← Styles
    │   │   ├── task.model.ts         ← TypeScript interfaces
    │   │   └── task.service.ts       ← HTTP service
    │   ├── environments/
    │   │   └── environment.ts
    │   ├── index.html
    │   └── main.ts
    ├── angular.json
    ├── tsconfig.json
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ and npm
- [Angular CLI](https://angular.io/cli): `npm install -g @angular/cli`
- [MongoDB](https://www.mongodb.com/) — local install **or** [MongoDB Atlas](https://cloud.mongodb.com/) (free)

---

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/mean-task-manager.git
cd mean-task-manager
```

---

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Edit `.env` with your MongoDB connection:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/taskmanager

# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/taskmanager
```

Start the server:

```bash
npm start
# OR for auto-reload during dev:
npm run dev
```

✅ You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:3000
```

Test the API:
```
GET http://localhost:3000/api/health
GET http://localhost:3000/api/tasks
```

---

### 3. Set Up the Frontend

```bash
cd ../frontend
npm install
ng serve
```

Open your browser at **http://localhost:4200**

---

## 🔌 API Endpoints

| Method | Endpoint             | Description                        |
|--------|----------------------|------------------------------------|
| GET    | /api/tasks           | Get all tasks (optional filters)   |
| GET    | /api/tasks/:id       | Get a single task                  |
| POST   | /api/tasks           | Create a new task                  |
| PUT    | /api/tasks/:id       | Update a task                      |
| DELETE | /api/tasks/:id       | Delete a task                      |
| GET    | /api/health          | Health check                       |

### Filter Examples

```
GET /api/tasks?status=pending
GET /api/tasks?priority=high
GET /api/tasks?status=in-progress&priority=medium
```

### Task Schema

```json
{
  "title": "Build MEAN app",
  "description": "Set up Express, Angular, and MongoDB",
  "status": "pending",        // pending | in-progress | completed
  "priority": "high",         // low | medium | high
  "dueDate": "2026-06-20"
}
```

---

## ✨ Features

- ✅ Create, Read, Update, Delete tasks
- 🔄 Cycle task status with one click (pending → in-progress → completed)
- 🔍 Filter tasks by status and priority
- 📅 Optional due dates
- 🎨 Clean responsive UI
- ✅ Input validation on both frontend and backend

---

## 📸 Screenshot Evidence (for class submission)

Take a screenshot showing:
1. Terminal with server running (`🚀 Server running on http://localhost:3000`)
2. Angular app open in browser at `http://localhost:4200`

Upload to the [MEAN Stack Exercise](https://elearning.dbs.ie/mod/assign/view.php?id=1823273) folder on Moodle.

---

## 🛠️ Tech Versions

| Tool       | Version |
|------------|---------|
| Node.js    | 18+     |
| Express    | 4.x     |
| Mongoose   | 8.x     |
| Angular    | 17.x    |
| MongoDB    | 7.x     |
