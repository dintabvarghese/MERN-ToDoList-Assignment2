# MERN To-Do List

A full-stack To-Do List built with **MongoDB, Express.js, React (Vite) and Node.js**.
Tasks are stored in MongoDB, served by a REST API, and managed from a React interface
(add, view, complete/incomplete, edit, delete) without page reloads.

## Project structure

```
backend/                 Express + Mongoose API
  models/Task.js         Task schema (title, completed, createdAt)
  routes/tasks.js        GET / POST / PUT / DELETE /api/tasks
  server.js              App setup: CORS, JSON, MongoDB connection
  .env.example           Required environment variables (no secrets)
frontend/                React app (Vite)
  src/api.js             fetch calls to the backend
  src/App.jsx            State + handlers (useState / useEffect)
  src/components/        TaskForm, TaskList, TaskItem
screenshots/             Screenshots of the working app
```

## Prerequisites

- Node.js 18 or newer
- MongoDB: either a local MongoDB server or a free MongoDB Atlas cluster

How to run

1. Backend

```bash
cd backend
npm install
cp .env.example .env      # on Windows: copy .env.example .env
```

Edit .env and fill in the values:

`MONGO_URI` | MongoDB connection string                | `mongodb://127.0.0.1:27017/todo-mern`     
`PORT`      | Port for the API (optional, default 5000)| `5000`           
                         
For Atlas, use the `mongodb+srv://...` string from the Atlas "Connect" dialog.

Start the server:

```bash
npm start        # or: npm run dev   (auto-restart with nodemon)
```

You should see `Connected to MongoDB` and `Server running on port 5000`.

2. Frontend

In a second terminal:

```bash
cd frontend
npm install
npm start
```

Open **http://localhost:3000**. The frontend must run on port 3000 because the
backend only allows that origin through CORS.

Optional: if your API is not at `http://localhost:5000`, copy `frontend/.env.example`
to `frontend/.env` and set `VITE_API_URL`.

## REST API

| Method | Endpoint          | Description                              | Success | Errors                    |
|--------|-------------------|------------------------------------------|---------|---------------------------|
| GET    | `/api/tasks`      | Fetch all tasks (newest first)           | 200     | 500                       |
| POST   | `/api/tasks`      | Add a task. Body: `{ "title": "..." }`   | 201     | 400 empty title           |
| PUT    | `/api/tasks/:id`  | Update `title` and/or `completed`        | 200     | 400 invalid, 404 not found|
| DELETE | `/api/tasks/:id`  | Delete a task                            | 200     | 404 not found             |

Validation: in POST and PUT the title is converted with `String()`, trimmed, and an
empty title is rejected with `400`.

Task document:

```json
{ "_id": "...", "title": "Buy milk", "completed": false, "createdAt": "2026-10-08T..." }
```

Quick API test (curl)

```bash
curl -X POST http://localhost:5000/api/tasks -H "Content-Type: application/json" -d '{"title":"Test task"}'
curl http://localhost:5000/api/tasks
curl -X PUT http://localhost:5000/api/tasks/<id> -H "Content-Type: application/json" -d '{"completed":true}'
curl -X DELETE http://localhost:5000/api/tasks/<id>
```

Security notes

- Secrets live in `.env`, which is git-ignored. Only `.env.example` is committed.
- CORS is restricted to `http://localhost:3000`.

Git workflow

- `feature/backend` and `feature/frontend` branches, each merged into `main` through a pull request.

Screenshots

See the `screenshots/` folder.
