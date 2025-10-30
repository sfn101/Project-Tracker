# Project Tracker

A comprehensive full-stack project management application built with Express.js, MongoDB, and Handlebars. Features user authentication, role-based authorization, complete web interface, and powerful admin controls for managing projects and tasks across teams.

## 🚀 Features

### Core Functionality
- **User Authentication**: JWT-based login and registration with localStorage token management
- **Role-Based Access Control**: Admin and user roles with comprehensive permission system
- **Project Management**: Complete CRUD operations for projects with status tracking
- **Task Management**: Full task lifecycle management within projects
- **Real-time Updates**: Auto-refreshing dashboards and data synchronization

### Web Interface
- **Complete Web Application**: Full frontend with Handlebars templating
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Dark Mode Support**: System-wide theme switching capability
- **Guest Experience**: Professional landing page with features and about sections
- **User Dashboard**: Personalized dashboard showing user's projects and tasks
- **Admin Dashboard**: Comprehensive system overview with real-time statistics

### Advanced Admin Features
- **User Management**: Complete admin interface for managing all system users
- **System-wide Project View**: Admin access to all projects across all users
- **Global Task Management**: Admin oversight of all tasks with filtering and management
- **Real-time Analytics**: Live dashboard with auto-refresh every 10 seconds
- **Advanced Filtering**: Multi-criteria filtering for projects and tasks
- **Bulk Operations**: Admin capabilities for system-wide management

### User Experience
- **Intuitive Navigation**: Context-aware navigation with guest and authenticated states
- **Toast Notifications**: User-friendly feedback system for all operations
- **Loading States**: Clear loading indicators and error handling
- **Accessibility**: Proper focus states and semantic HTML structure

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js (v16+)
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose ODM 8.19.2
- **Authentication**: JWT (jsonwebtoken) with bcrypt password hashing
- **Template Engine**: Handlebars (express-handlebars)
- **Security**: CORS, input validation, role-based authorization

### Frontend
- **Styling**: Tailwind CSS (CDN)
- **JavaScript**: Vanilla ES6+ with async/await
- **Theme**: Dark/Light mode with system preference detection
- **Icons**: Heroicons (SVG)
- **Responsive**: Mobile-first design approach

### Development
- **Hot Reloading**: Nodemon for development
- **Package Manager**: npm/pnpm support
- **Testing**: REST client files for API testing
- **Code Organization**: Modular architecture with import maps

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
   This creates sample users, projects, and tasks with the following test accounts:
   - **Admin**: `admin@test.com` / `admin123`
   - **Users**: `john@test.com` / `password123`, `jane@test.com` / `password123`

6. **Start the development server**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:4000`

7. **Access the Application**
   - **Home Page**: `http://localhost:4000/` (Guest experience)
   - **Login**: `http://localhost:4000/login`
   - **Register**: `http://localhost:4000/register`
   - **Dashboard**: `http://localhost:4000/dashboard` (After login)

## 🌐 Web Application Features

### Landing Page (`/`)
- **Professional Homepage**: Welcome section with clear value proposition
- **Features Section**: Comprehensive overview of platform capabilities
- **About Section**: Target audience breakdown and use cases
- **Guest Navigation**: Clean navbar with smooth scrolling to sections
- **Call-to-Action**: Multiple conversion opportunities throughout

### User Experience
- **Dashboard Views**: Personalized dashboards based on user role
- **Project Management**: Complete web interface for project CRUD operations
- **Task Management**: Intuitive task creation, status updates, and organization
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Mode**: System-wide theme switching with user preference persistence

### Admin Features
- **User Management** (`/admin/users`): Complete user administration interface
- **All Projects View** (`/admin/projects`): System-wide project oversight
- **All Tasks View** (`/admin/tasks`): Global task management with advanced filtering
- **Real-time Dashboard**: Auto-refreshing statistics and recent activity
- **Advanced Controls**: User role management, status updates, bulk operations

## 🔐 Authentication & Roles

### User Roles

- **Admin**: 
  - Full system access and user management
  - View/manage all projects and tasks across all users
  - Access to admin dashboard and management interfaces
  - User creation, role assignment, and account management

- **User**: 
  - Manage personal projects and tasks
  - Access to personal dashboard and statistics
  - Create, update, and delete own content
  - Collaborative features within assigned projects

### Authentication Flow

**Web Application:**
1. Visit homepage or register: `http://localhost:4000/register`
2. Login with credentials: `http://localhost:4000/login`
3. Token stored in localStorage with automatic session management
4. Redirected to appropriate dashboard based on role

**API Access:**
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
  "role": "user"
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

## 🎯 User Workflows

### For Regular Users
1. **Getting Started**: Register → Login → Personal Dashboard
2. **Project Creation**: Dashboard → Create Project → Add Tasks
3. **Task Management**: View Projects → Project Detail → Manage Tasks
4. **Progress Tracking**: Dashboard Statistics → Project Status → Task Completion

### For Administrators
1. **System Overview**: Admin Dashboard → Real-time Statistics
2. **User Management**: Admin Panel → Manage Users → Role Assignment
3. **Project Oversight**: All Projects View → Filter/Sort → Project Details
4. **Task Administration**: All Tasks View → Status Updates → Bulk Operations

## 📊 Data Models

### User
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed with bcrypt),
  role: String (enum: ['admin', 'user'], default: 'user'),
  status: String (enum: ['active', 'inactive'], default: 'active'),
  createdAt: Date,
  updatedAt: Date
}
```

### Project
```javascript
{
  userId: ObjectId (ref: User, required),
  name: String (required),
  description: String (required),
  status: String (enum: ['pending', 'in_progress', 'completed'], default: 'pending'),
  createdAt: Date,
  updatedAt: Date
}
```

### Task
```javascript
{
  projectId: ObjectId (ref: Project, required),
  name: String (required),
  description: String (optional),
  status: String (enum: ['pending', 'in_progress', 'completed'], default: 'pending'),
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

**User Accounts:**
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
Project-Tracker/
├── src/
│   ├── main.js                 # Application entry point
│   ├── databases/
│   │   └── connect-mongo.js    # MongoDB connection
│   ├── middlewares/
│   │   ├── auth.js            # JWT authentication middleware
│   │   ├── auth-pages.js      # Page authentication middleware
│   │   └── roles.js           # Role-based permissions
│   ├── modules/               # Business logic modules
│   │   ├── auth/              # Authentication services
│   │   ├── user/              # User management
│   │   ├── project/           # Project management
│   │   ├── task/              # Task management
│   │   └── _shared/           # Shared utilities
│   ├── routes/                # Route definitions
│   │   ├── api/               # API endpoints
│   │   │   ├── auth/          # Authentication routes
│   │   │   └── users/         # User/project/task routes
│   │   ├── pages/             # Web page routes
│   │   │   ├── admin.js       # Admin page routes
│   │   │   ├── auth.js        # Auth page routes
│   │   │   └── dashboard.js   # Dashboard routes
│   │   └── index.js           # Route aggregation
│   ├── views/                 # Handlebars templates
│   │   ├── layouts/
│   │   │   └── main.hbs       # Main layout with navbar
│   │   ├── home.hbs           # Landing page
│   │   ├── login.hbs          # Login page
│   │   ├── register.hbs       # Registration page
│   │   ├── dashboard-user.hbs # User dashboard
│   │   ├── dashboard-admin.hbs# Admin dashboard
│   │   ├── projects.hbs       # User projects view
│   │   ├── tasks.hbs          # User tasks view
│   │   ├── users.hbs          # Admin user management
│   │   ├── admin-projects.hbs # Admin all projects view
│   │   ├── admin-tasks.hbs    # Admin all tasks view
│   │   └── project-detail.hbs # Project detail view
│   └── _shared/
│       └── enums/
│           └── httpStatusCodes.js
├── public/                    # Static assets
│   ├── css/
│   │   └── styles.css        # Custom styles
│   └── js/
│       └── app.js            # Client-side utilities
├── test/                     # API test files
│   ├── auth.rest
│   ├── users.rest
│   ├── projects.rest
│   └── tasks.rest
├── seed/
│   └── seed.js               # Database seeding script
└── package.json              # Dependencies and scripts
```

## 🚀 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload
- `npm run seed` - Populate database with sample data
- `pnpm run dev` - Alternative package manager support

## 🔧 Configuration

### Environment Variables
```env
# Database
MONGO_DB_URI=mongodb://localhost:27017/project_tracker_db

# Server
PORT=4000

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=1h

# Optional: For production
NODE_ENV=production
```

### Features Configuration
- **Auto-refresh Interval**: Dashboard refreshes every 10 seconds
- **JWT Expiration**: Tokens expire after 1 hour
- **Session Management**: Automatic token refresh and logout
- **Theme Persistence**: User theme preferences saved in localStorage
- **Cache Control**: API responses include no-cache headers for real-time data

## 🎨 UI/UX Features

### Design System
- **Color Scheme**: Primary (#14b8a6), Secondary (#0f766e)
- **Typography**: System fonts with proper hierarchy
- **Spacing**: Consistent Tailwind spacing scale
- **Components**: Reusable button, form, and card components

### Responsive Breakpoints
- **Mobile**: < 640px (Stack layout, compact navigation)
- **Tablet**: 640px - 1024px (Grid adjustments, expanded views)
- **Desktop**: > 1024px (Full feature layout, side navigation)

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Focus States**: Clear focus indicators
- **ARIA Labels**: Screen reader support
- **Color Contrast**: WCAG 2.1 AA compliant
- **Semantic HTML**: Proper heading hierarchy and landmarks

## 🚀 Deployment

### Production Checklist
1. Set `NODE_ENV=production` in environment
2. Use production MongoDB instance
3. Generate secure JWT secret
4. Configure CORS for production domain
5. Enable HTTPS in production
6. Set up proper logging and monitoring

### Recommended Hosting
- **Backend**: Railway, Render, or Heroku
- **Database**: MongoDB Atlas (cloud)
- **Static Assets**: CDN for optimal performance

## 📈 Performance

### Optimization Features
- **Efficient Queries**: Optimized MongoDB queries with proper indexing
- **Caching Strategy**: Client-side caching with cache-busting
- **Lazy Loading**: Progressive content loading
- **Minification**: Production asset optimization
- **CDN Assets**: Tailwind CSS loaded via CDN

### Monitoring
- **Real-time Updates**: Live dashboard statistics
- **Error Handling**: Comprehensive error tracking
- **Performance Metrics**: Response time monitoring
- **User Analytics**: Session and usage tracking