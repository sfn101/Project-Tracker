# API Testing Instructions

## Prerequisites
1. Make sure your server is running: `pnpm run dev`
2. Install the REST Client extension for VS Code if you haven't already
3. Ensure MongoDB is connected and running

## Test Files Overview
- `auth.rest` - Authentication endpoints (register/login)
- `users.rest` - User management endpoints
- `projects.rest` - Project management endpoints  
- `tasks.rest` - Task management endpoints
- `complete-flow.rest` - End-to-end testing workflow

## How to Use REST Files

### 1. Start with Authentication (`auth.rest`)
- Register admin and user accounts
- Login to get JWT tokens
- Copy the tokens from responses for use in other tests

### 2. Update Variables
After getting tokens and IDs from responses, update the variables at the top of each file:
```
@adminToken = your_actual_admin_token
@userToken = your_actual_user_token
@userId = actual_user_id
@projectId = actual_project_id
@taskId = actual_task_id
```

### 3. Test User Management (`users.rest`)
- Test getting all users (admin only)
- Test user CRUD operations
- Test authorization and permissions

### 4. Test Project Management (`projects.rest`)
- Create projects for users
- Test project CRUD operations
- Test ownership permissions

### 5. Test Task Management (`tasks.rest`)
- Create tasks within projects
- Test task CRUD operations
- Test nested resource permissions

### 6. Complete Flow Testing (`complete-flow.rest`)
- Follow the numbered steps in order
- This provides an end-to-end test of your entire API
- Update variables as you go through each step

## Expected Responses

### Successful Login Response Example:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "67203f8a8d5c123456789abc",
      "name": "John Doe",
      "email": "john@test.com",
      "role": "user"
    }
  }
}
```

### Error Response Example:
```json
{
  "success": false,
  "error": "ValidationError",
  "message": "Email already exists"
}
```

## Testing Tips

1. **Use the REST Client Extension**: Install the REST Client extension by Huachao Mao for VS Code
2. **Click "Send Request"**: Click the "Send Request" link above each request
3. **Copy Values**: Copy tokens and IDs from responses to use in subsequent requests
4. **Check Status Codes**: 
   - 200: Success (GET, PUT, DELETE)
   - 201: Created (POST)
   - 400: Bad Request
   - 401: Unauthorized
   - 403: Forbidden
   - 404: Not Found
   - 500: Server Error

5. **Test Edge Cases**: Try invalid data, missing tokens, wrong permissions
6. **Monitor Server Logs**: Watch the terminal running your dev server for detailed error messages

## API Endpoints Summary

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Users
- GET `/api/users` - Get all users (admin only)
- POST `/api/users` - Create user (admin only)
- GET `/api/users/:userId` - Get user by ID
- PUT `/api/users/:userId` - Update user
- DELETE `/api/users/:userId` - Delete user

### Projects  
- GET `/api/users/:userId/projects` - Get user's projects
- POST `/api/users/:userId/projects` - Create project
- GET `/api/users/:userId/projects/:projectId` - Get project by ID
- PUT `/api/users/:userId/projects/:projectId` - Update project
- DELETE `/api/users/:userId/projects/:projectId` - Delete project

### Tasks
- GET `/api/users/:userId/projects/:projectId/tasks` - Get project's tasks  
- POST `/api/users/:userId/projects/:projectId/tasks` - Create task
- GET `/api/users/:userId/projects/:projectId/tasks/:taskId` - Get task by ID
- PUT `/api/users/:userId/projects/:projectId/tasks/:taskId` - Update task
- DELETE `/api/users/:userId/projects/:projectId/tasks/:taskId` - Delete task

## Troubleshooting

1. **"Cannot find module" errors**: Make sure your server is running
2. **401 Unauthorized**: Check if your token is valid and properly formatted
3. **403 Forbidden**: Check if you have the right permissions for the operation
4. **500 Server Error**: Check server logs for detailed error information
5. **Connection refused**: Make sure server is running on the correct port (4000)