# JWT Authentication Setup

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install jsonwebtoken bcryptjs
```

### 2. Environment Variables
Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/oykus"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Logging
LOG_LEVEL=info
```

**Important**: Replace `your-super-secret-jwt-key-change-this-in-production` with a strong, unique secret key for production.

### 3. Database Migration
The User model already exists in your Prisma schema, so no additional migrations are needed.

## Frontend Setup

The frontend authentication is already implemented and integrated with your custom router.

## API Endpoints

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)
- `PUT /api/auth/change-password` - Change password (protected)
- `POST /api/auth/logout` - Logout user (protected)

### Protected Routes

All task-related endpoints now require authentication:
- `GET /api/tasks/users` - Get all users
- `GET /api/tasks/world/:worldId/tasks` - Get tasks for a world
- `PATCH /api/tasks/world/:worldId/tasks/:taskId/status` - Update task status
- `POST /api/tasks/world/:worldId/tasks/create` - Create new task
- And all other task endpoints...

## Usage

### Registration
```javascript
const userData = {
  email: "user@example.com",
  username: "username",
  password: "SecurePass123",
  playerName: "Player Name",
  abbr: "PN"
};

const response = await api.register(userData);
```

### Login
```javascript
const credentials = {
  email: "user@example.com",
  password: "SecurePass123"
};

const response = await api.login(credentials);
```

### Making Authenticated Requests
The API service automatically includes the JWT token in the Authorization header for all requests.

### Logout
```javascript
await api.logout();
```

## Frontend Routes

- `/en/login` - Login page
- `/fr/connexion` - Login page (French)
- `/en/register` - Registration page
- `/fr/inscription` - Registration page (French)

## Security Features

- Password hashing with bcrypt (12 salt rounds)
- JWT tokens with 24-hour expiration
- Input validation for all fields
- Unique constraint validation (email, username, playerName, abbr)
- Protected routes with middleware
- Automatic token inclusion in API requests
- Automatic logout on authentication errors

## Validation Rules

- **Email**: Standard email format
- **Username**: 3-20 characters, alphanumeric and underscores only
- **Password**: At least 8 characters, 1 uppercase, 1 lowercase, 1 number
- **Player Name**: 2-50 characters, letters, numbers, spaces, hyphens, apostrophes
- **Abbreviation**: 2-4 alphanumeric characters 