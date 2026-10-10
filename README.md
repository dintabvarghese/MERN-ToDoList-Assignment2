# MERN To-Do List Application

A full-stack To-Do List application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It allows users to manage tasks through a simple, interactive interface.

## Features

- Add new tasks.
- View the task list.
- Mark tasks as completed.
- Delete tasks.
- Store task data in MongoDB.
- Communicate between the React frontend and the Express backend through an API.

## Technologies Used

- **MongoDB** – NoSQL database for storing tasks.
- **Express.js** – Backend web framework.
- **React.js** – Frontend user interface.
- **Node.js** – JavaScript runtime for the backend.
- **Vite** – Frontend development server.

## Project Structure

```text
MERN-ToDoList-Assignment2/
├── backend/
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── tasks.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
├── screenshots/
├── .gitignore
└── README.md
```

## Prerequisites

Install the following before running the application:

- Node.js and npm
- MongoDB, either locally or through MongoDB Atlas
- Git

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/dintabvarghese/MERN-ToDoList-Assignment2.git
cd MERN-ToDoList-Assignment2
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory using `.env.example` as a reference.

Configure the following variables with your own values:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Ensure that your MongoDB database is accessible before starting the server.

Start the backend:

```bash
npm start
```

The backend runs on port 5000 with the configuration shown above.

### 3. Configure the frontend

Open a separate terminal:

```bash
cd frontend
npm install
```

Refer to `frontend/.env.example` for any frontend environment variables required by the application.

Start the frontend development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal. The current project configuration uses `http://localhost:3000/`.

## Screenshots

### To-Do List Interface

![To-Do List](screenshots/To-Do%20List.png)

### Adding a Task

![Add Task](screenshots/Add%20Task.png)

### Completing a Task

![Complete Task](screenshots/Complete%20Task.png)

### Deleting a Task

![Delete Task](screenshots/Delete%20Task.png)

## Version Control

The project uses Git and GitHub for version control. Development work is organized into feature branches and integrated into `main` through pull requests.

## Security

- Real environment files (`.env`) are excluded through `.gitignore`.
- Environment variable names are provided in `.env.example`.
- Never commit database credentials, passwords, or other secrets to GitHub.

## Author

**Dinta B. Varghese**

B.Tech Computer Science and Engineering