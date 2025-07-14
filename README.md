# 🎓 Faculty Incentive Management System

Faculty Incentive Management System is a full-stack web application built using the MERN (MongoDB, Express, React, Node.js) stack, tailored specifically for academic institutions. It simplifies and streamlines the entire process of managing faculty incentives — including study leaves, 
journal publications, patents, conference participation, and PhD milestones. With secure authentication, structured data handling, and an intuitive interface, faculty members can easily submit applications, while administrators can review, approve, and monitor progress in a centralized system.


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  [![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://reactjs.org)  [![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)](https://nodejs.org)  [![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)](https://mongodb.com)

---

## 📂 Project Structure

```
Faculty_Incentive_Management-main/
│
├── Faculty_Incentive_Backend/   # Node.js/Express backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── index.js
│   └── package.json
│
└── Faculty_Incentive_Frontend/  # React + Vite frontend
    ├── public/
    ├── src/
    ├── .env
    ├── index.html
    └── package.json
```

---

## ✅ Features

- 👨‍🏫 Faculty registration & secure login
- 🔐 Admin dashboard for approvals
- 📄 Submission of:
  - Study Leaves  
  - Journals  
  - Conferences  
  - Patents  
  - PhD Milestones
- 📤 PDF uploads for verification
- 🛡️ JWT-based authentication
- 📊 Track submission status (Approved / Pending)

---

## ⚙️ Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd Faculty_Incentive_Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   PORT=5000
   MONGO_URL=mongodb://127.0.0.1:27017/User
   JWT_SECRET=your_jwt_secret
   ```

4. Start backend:
   ```bash
   npm start
   ```

---

## 💻 Frontend Setup

1. Navigate to frontend folder:
   ```bash
   cd Faculty_Incentive_Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start frontend:
   ```bash
   npm run dev
   ```

---


## 🧰 Tech Stack

| Layer     | Technology                   |
|-----------|------------------------------|
| Frontend  | React.js, Vite, Axios, React Router |
| Backend   | Node.js, Express.js          |
| Database  | MongoDB, Mongoose            |
| Auth      | JSON Web Tokens (JWT)        |
| Uploads   | Multer, PDF-lib              |
| Emails    | Nodemailer (Gmail SMTP)      |

---

## 📝 Notes

- Ensure MongoDB is running locally or configure a remote URI.
- Don’t forget to fill in email credentials for password reset (Gmail app password recommended).
- Adjust CORS and .env settings for deployment.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for full details.

---

## 👨‍💻 Author

Developed by **Md Meraj Alam**  
