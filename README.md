# Client Project Tracker API

A modular REST API built with Express.js and MongoDB for managing client projects and tasks, featuring authentication, role-based authorization, and scoped data access.

## 🚀 Features

- **User Authentication**: JWT-based login and registration
- **Role-Based Access Control**: Admin and member roles with different permissions
- **Project Management**: Create, read, update, and delete projects
- **Task Management**: Manage tasks within projects
- **Scoped Data Access**: Users can only access their own data (admins see all)
- **Modular Architecture**: Clean service-driven design with import maps

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcrypt for password hashing
- **Development**: Nodemon for hot reloading

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or remote)
- npm or yarn

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd men-crud
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Update the following variables:
     ```env
     MONGO_DB_URI=mongodb://localhost:27017/project_tracker_db
     PORT=4000
     JWT_SECRET=your_super_secret_jwt_key_here
     ```

4. **Start MongoDB**
   Ensure MongoDB is running on your system (default port 27017)

5. **Seed the database** (optional, for testing)
   ```bash
   npm run seed
   ```
   This creates sample users, projects, and tasks.

6. **Start the development server**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:4000`

## 🔐 Authentication & Roles

### User Roles

- **Admin**: Full access to all resources and user management
- **Member**: Can manage only their own projects and tasks

### Authentication Flow

1. Register a new user: `POST /api/auth/register`
2. Login to get JWT token: `POST /api/auth/login`
3. Include token in Authorization header: `Bearer <token>`

## 📚 API Endpoints

All endpoints are prefixed with `/api`

### Authentication

| Method | Endpoint         | Description       | Auth Required |
| ------ | ---------------- | ----------------- | ------------- |
| POST   | `/auth/register` | Register new user | No            |
| POST   | `/auth/login`    | User login        | No            |

**Register Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "member"
}
```

**Login Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### User Management

| Method | Endpoint         | Description    | Auth Required | Role        |
| ------ | ---------------- | -------------- | ------------- | ----------- |
| GET    | `/users`         | Get all users  | Yes           | Admin       |
| POST   | `/users`         | Create user    | Yes           | Admin       |
| GET    | `/users/:userId` | Get user by ID | Yes           | Owner/Admin |
| PUT    | `/users/:userId` | Update user    | Yes           | Owner/Admin |
| DELETE | `/users/:userId` | Delete user    | Yes           | Owner/Admin |

### Project Management

| Method | Endpoint                             | Description         | Auth Required | Role        |
| ------ | ------------------------------------ | ------------------- | ------------- | ----------- |
| GET    | `/users/:userId/projects`            | Get user's projects | Yes           | Owner/Admin |
| POST   | `/users/:userId/projects`            | Create project      | Yes           | Owner/Admin |
| GET    | `/users/:userId/projects/:projectId` | Get project by ID   | Yes           | Owner/Admin |
| PUT    | `/users/:userId/projects/:projectId` | Update project      | Yes           | Owner/Admin |
| DELETE | `/users/:userId/projects/:projectId` | Delete project      | Yes           | Owner/Admin |

**Project Request Body:**
```json
{
  "name": "E-commerce Website",
  "description": "Building an online store",
  "status": "pending"
}
```

### Task Management

| Method | Endpoint                                           | Description         | Auth Required | Role        |
| ------ | -------------------------------------------------- | ------------------- | ------------- | ----------- |
| GET    | `/users/:userId/projects/:projectId/tasks`         | Get project's tasks | Yes           | Owner/Admin |
| POST   | `/users/:userId/projects/:projectId/tasks`         | Create task         | Yes           | Owner/Admin |
| GET    | `/users/:userId/projects/:projectId/tasks/:taskId` | Get task by ID      | Yes           | Owner/Admin |
| PUT    | `/users/:userId/projects/:projectId/tasks/:taskId` | Update task         | Yes           | Owner/Admin |
| DELETE | `/users/:userId/projects/:projectId/tasks/:taskId` | Delete task         | Yes           | Owner/Admin |

**Task Request Body:**
```json
{
  "name": "Setup development environment",
  "status": "pending"
}
```

## 📊 Data Models

### User
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['admin', 'member']),
  status: String (enum: ['active', 'inactive']),
  createdAt: Date,
  updatedAt: Date
}
```

### Project
```javascript
{
  userId: ObjectId (ref: User),
  name: String (required),
  description: String (required),
  status: String (enum: ['pending', 'in_progress', 'completed']),
  createdAt: Date,
  updatedAt: Date
}
```

### Task
```javascript
{
  projectId: ObjectId (ref: Project),
  name: String (required),
  status: String (enum: ['pending', 'in_progress', 'completed']),
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

### Using REST Client (VS Code)

1. Install the "REST Client" extension by Huachao Mao
2. Open files in `test/` directory (`.rest` files)
3. Click "Send Request" above each request
4. Update variables with actual tokens/IDs from responses

### Test Files

- `test/auth.rest` - Authentication tests
- `test/users.rest` - User management tests
- `test/projects.rest` - Project management tests
- `test/tasks.rest` - Task management tests
- `test/complete-flow.rest` - End-to-end workflow

### Sample Test Data (after seeding)

**Admin Account:**
- Email: `admin@test.com`
- Password: `admin123`

**Member Accounts:**
- Email: `john@test.com` / Password: `password123`
- Email: `jane@test.com` / Password: `password123`

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "ErrorType",
  "message": "Error description"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": {
    "data": [...],
    "pagination": {
      "total": 25,
      "totalPages": 3,
      "page": 1,
      "limit": 10,
      "hasNext": true,
      "hasPrevious": false
    }
  }
}
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token expiration (1 hour)
- Role-based access control
- Input validation and sanitization
- CORS enabled
- Error handling middleware

## 📁 Project Structure

```
src/
├── main.js                 # Application entry point
├── databases/
│   └── connect-mongo.js    # MongoDB connection
├── middlewares/
│   ├── auth.js            # JWT authentication
│   └── roles.js           # Role-based permissions
├── modules/
│   ├── auth/              # Authentication module
│   ├── user/              # User management
│   ├── project/           # Project management
│   ├── task/              # Task management
│   └── _shared/           # Shared utilities
├── routes/                # API routes
│   ├── auth/
│   ├── users/
│   └── index.js
└── _shared/
    └── enums/
        └── httpStatusCodes.js
```

## 🚀 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload
- `npm run seed` - Populate database with sample data