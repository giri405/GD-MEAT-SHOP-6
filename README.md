# Fresh Meat Shop Backend API

A comprehensive Node.js backend API with MongoDB integration for a meat shop e-commerce platform.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Registration, login, profile management
- **Product Management**: CRUD operations with categories, search, and filtering
- **Order Management**: Complete order lifecycle with status tracking
- **Security**: Helmet, rate limiting, input validation, password hashing
- **Database**: MongoDB with Mongoose ODM
- **Error Handling**: Comprehensive error handling and validation
- **API Documentation**: Built-in endpoint documentation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, bcryptjs, express-rate-limit
- **Validation**: express-validator
- **Environment**: dotenv

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   - Copy `.env` file and update with your MongoDB URI
   - Set JWT_SECRET to a secure random string
   - Configure other environment variables as needed

3. **Start MongoDB**
   - Local: Ensure MongoDB is running on your system
   - Cloud: Use MongoDB Atlas connection string

4. **Run the Server**
   ```bash
   npm start
   ```

5. **API Documentation**
   - Visit `http://localhost:3000/api` for endpoint documentation
   - Health check: `http://localhost:3000/health`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/cancel` - Cancel order
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

## Database Models

### User Model
- Personal information (name, email, password)
- Role-based access (user/admin)
- Profile information (avatar, bio, location)
- Authentication methods and last login tracking

### Product Model
- Product details (name, description, price)
- Categories (chicken, mutton, seafood, eggs, ready-to-cook)
- Stock management and units
- Images and nutritional information

### Order Model
- Order items with product references
- Delivery address and contact information
- Order status tracking (pending → delivered)
- Payment status and order notes

## Security Features

- **Password Hashing**: bcryptjs with configurable salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Comprehensive request validation
- **Security Headers**: Helmet.js for security headers
- **CORS Configuration**: Configurable cross-origin requests

## Error Handling

- Comprehensive error middleware
- Mongoose validation errors
- JWT token errors
- Custom error responses with proper HTTP status codes
- Development vs production error details

## Environment Variables

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
```

## Development

The API includes comprehensive logging, error handling, and development-friendly features:

- Morgan logging for request tracking
- Detailed error messages in development mode
- Health check endpoint for monitoring
- Built-in API documentation

## Production Considerations

- Set `NODE_ENV=production`
- Use strong JWT_SECRET
- Configure proper MongoDB connection
- Set up proper logging and monitoring
- Configure CORS for your frontend domain
- Use HTTPS in production