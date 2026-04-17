# 🍔 KDK College Canteen Management System

A full-stack MERN application for managing college canteen orders online with real-time order tracking and email notifications.

## 🌐 Live Demo

- **Frontend**: https://canteen-ayush-chanores-projects.vercel.app
- **Backend**: https://canteen-six-beta.vercel.app

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM
- React Hot Toast
- Context API

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- Nodemailer (Gmail)
- Bcryptjs

### Deployment
- Vercel (Frontend + Backend)
- MongoDB Atlas (Database)

---

## ✨ Features

### User
- Sign up / Login
- Browse menu by category (Food, Beverages, Snacks, Desserts)
- Add items to cart with quantity control
- Place orders with Cash on Delivery
- View order history with real-time status
- Receive email notification when order is ready for pickup
- Order history auto-clears when order is delivered

### Admin
- Secure admin login (single admin account)
- Add / Edit / Delete menu items
- View all orders
- Update order status (Pending → Preparing → Completed → Delivered)
- Email automatically sent to user when status set to Completed

---

## 📁 Project Structure

```
miniproject/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── menuController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Admin.js
│   │   ├── MenuItem.js
│   │   ├── Order.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── menuRoutes.js
│   │   └── orderRoutes.js
│   ├── utils/
│   │   └── sendEmail.js
│   ├── seedAdmin.js
│   ├── server.js
│   └── vercel.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── utils/
│   └── vercel.json
└── README.md
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js v14+
- MongoDB (local or Atlas)
- Git

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_USER=your_jwt_secret_user
JWT_SECRET_ADMIN=your_jwt_secret_admin
PORT=5000
NODE_ENV=development
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in frontend folder:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

```bash
npm run dev
```

### Create Default Admin

```bash
cd backend
node seedAdmin.js
```

Default admin credentials:
- Email: `admin@college.com`
- Password: `admin123`

---

## 📚 API Endpoints

### Auth
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/user/signup` | Register user | Public |
| POST | `/api/auth/user/login` | Login user | Public |
| POST | `/api/auth/admin/login` | Login admin | Public |
| GET | `/api/auth/user/me` | Get user profile | Private |
| GET | `/api/auth/admin/me` | Get admin profile | Private |

### Menu
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/menu` | Get all menu items | Public |
| GET | `/api/menu/:id` | Get single item | Public |
| POST | `/api/menu` | Create menu item | Admin |
| PUT | `/api/menu/:id` | Update menu item | Admin |
| DELETE | `/api/menu/:id` | Delete menu item | Admin |

### Orders
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/orders/user` | Get user orders | User |
| GET | `/api/orders/admin/all` | Get all orders | Admin |
| POST | `/api/orders` | Place order (COD) | User |
| PUT | `/api/orders/:id/status` | Update order status | Admin |
| DELETE | `/api/orders/:id` | Cancel order | User |

---

## 📧 Email Notification

When admin marks an order as **Completed**, the user automatically receives an email with:
- Order summary (items, quantities, prices)
- Total amount
- Pickup instructions

### Gmail App Password Setup
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Security → 2-Step Verification → Enable
3. Security → App Passwords → Create
4. Use the 16-digit password as `EMAIL_PASS`

---

## 🌍 Deployment on Vercel

### Backend
1. Import repo on Vercel → set Root Directory to `backend`
2. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET_USER`
   - `JWT_SECRET_ADMIN`
   - `NODE_ENV=production`
   - `EMAIL_USER`
   - `EMAIL_PASS`

### Frontend
1. Import repo on Vercel → set Root Directory to `frontend`
2. Add environment variable:
   - `VITE_API_BASE_URL=https://your-backend.vercel.app/api`

---

## 💳 Payment

- Default: **Cash on Delivery**
- Stripe integration available (optional)

---

## 👤 Default Admin

| Field | Value |
|-------|-------|
| Email | `admin@college.com` |
| Password | `admin123` |

> ⚠️ Change the admin password after first login in production.

---

## 📝 License

MIT License © 2024 KDK College Canteen
