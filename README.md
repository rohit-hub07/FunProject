# Momment's

It's a project for my own personal use where I can upload pictures. It's like having your own mini instagram

## Deployed Url
- **https://codearena.live**

## ✨ Features

- **User Authentication**: Secure signup/login system using Passport.js with local strategy
- **Image Upload**: Upload images directly to Cloudinary with automatic optimization
- **Post Management**: Create, edit, and delete your image posts with titles and descriptions
- **User Roles**: Support for both regular users and admin roles
- **Authorization**: Only post owners can edit or delete their content
- **Session Management**: Persistent sessions with cookie-based authentication
- **Flash Messages**: User-friendly notifications for actions and errors
- **Responsive Design**: Clean UI built with EJS templates

## 🛠️ Tech Stack

### Backend

- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database and ODM
- **Passport.js** - Authentication middleware
- **Cloudinary** - Image hosting and management
- **Multer** - File upload handling
- **bcryptjs** - Password hashing

### Frontend

- **EJS** - Templating engine
- **EJS-Mate** - Layout support
- **CSS** - Custom styling

### Security & Middleware

- **express-session** - Session management
- **cookie-parser** - Cookie handling
- **connect-flash** - Flash messages
- **method-override** - HTTP method override for RESTful routes
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- Cloudinary account

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd WebsiteForFun
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory using the provided `env.example`:

   ```env
   DATABASE_URL=your_mongodb_connection_string
   SECRET=your_session_secret_key
   BASE_URL=http://localhost:5000
   PORT=5000
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API=your_cloudinary_api_key
   CLOUDINARY_SECRET=your_cloudinary_api_secret
   CREATE_ADMIN_SECRET=your_admin_secret_for_registration
   ```

4. **Start the application**

   ```bash
   npm start
   ```

   The application will run on `http://localhost:5000` (or your configured PORT)

## 📁 Project Structure

```
WebsiteForFun/
├── controllers/          # Request handlers
│   ├── post.controller.js
│   └── user.controller.js
├── dataBase/            # Database configuration
│   └── db.js
├── models/              # Mongoose schemas
│   ├── Post.model.js
│   └── User.model.js
├── router/              # Express routes
│   ├── post.router.js
│   └── user.router.js
├── utils/               # Utility functions
│   └── auth.user.js
├── views/               # EJS templates
│   ├── layout/
│   ├── posts/
│   └── user/
├── public/              # Static assets
│   ├── script.js
│   └── style.css
├── cloudinary.config.js # Cloudinary setup
└── index.js            # Application entry point
```

## 🔑 API Routes

### Post Routes (`/moments/v1`)

- `GET /home` - View all posts
- `GET /post` - New post form (authenticated)
- `POST /post` - Create new post (authenticated)
- `GET /show/:id` - View single post
- `GET /edit/:id` - Edit post form (owner only)
- `PATCH /post/:id` - Update post (owner only)
- `DELETE /delete/:id` - Delete post (owner only)
- `GET /order/:id` - Order/arrange posts (authenticated)

### User Routes (`/moments/v1`)

- `POST /signup` - To register a new user you have to hit the /signup endpoint via postman or any services you like and also you have to provide the "CREATE_ADMIN_SECRET" in the req headers
- `GET /login` - Login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

## 🔒 Authentication & Authorization

- Users must be logged in to create, edit, or delete posts
- Only the post owner can edit or delete their content
- Admin role support for elevated permissions
- Session-based authentication with 7-day cookie expiry

## 🎨 Models

### User Model

- `username` (String, required)
- `email` (String, required)
- `role` (String: 'user' or 'admin', default: 'user')
- Password (hashed, managed by passport-local-mongoose)

### Post Model

- `imageUrl` (String, required) - Cloudinary URL
- `title` (String, required)
- `description` (String, required)
- `owner` (ObjectId, ref: User)
- `ownername` (String)
- `timestamps` (createdAt, updatedAt)

## 👤 Author

**Rohit**


---

_Built with ❤️ for personal photo management_
