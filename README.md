"# vastraaa" 
# 🛍️ Vastraa – E-Commerce Web App

**Vastraa** is a full-stack e-commerce application that allows users to browse products, add them to cart, and securely complete their orders using PayPal. It features a powerful admin dashboard for managing products and orders. Built as a capstone project at Fynd Academy, Vastraa uses the MERN stack (MongoDB, Express.js, React.js, Node.js) and is fully deployed.

---

## 🌐 Live Demo

- **Frontend**: [https://vastraaa.vercel.app](https://vastraaa.vercel.app)
- **Backend**: Deployed on Render (`https://your-backend-url.onrender.com`)

---

## ⚙️ Tech Stack

### Frontend
- React + Vite
- Zustand for Cart State
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js + Express.js
- MongoDB Atlas (via Mongoose)
- JWT Authentication
- CORS, dotenv
- PayPal API for payment
- Twilio (or similar) for OTP

---

## 📦 Features

### 👤 User
- Product listing with sorting and filtering
- View single product details
- Add and remove products from cart
- Checkout and order confirmation
- PayPal integration
- OTP-based SMS login
- Responsive UI (mobile-first)

### 🛠️ Admin
- Admin dashboard
- Add/Edit/Delete products
- View and manage user orders

---

## 📁 Folder Structure

vastraa/
├── client/ # React Frontend
│ ├── components/ # Reusable UI components
│ ├── pages/ # Route pages (Home, Product, Cart)
│ ├── stores/ # Zustand store (cartStore.js)
│ └── App.jsx
│
├── server/ # Express Backend
│ ├── config/ # DB connection
│ ├── models/ # Mongoose models (User, Product, Order, Cart)
│ ├── routes/ # API routes
│ ├── controllers/ # Route logic
│ ├── middleware/ # Auth, error handling
│ └── server.js
│
├── .env # Environment Variables
└── README.md
