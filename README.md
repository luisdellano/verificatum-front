# 🗳️ Verificatum Voting Frontend

This repository contains the **frontend** of a secure voting system built with **React**, **Vite**, **Tailwind CSS**, and **Flowbite**.  
It communicates with an **external Flask backend** that serves as a middleware for the Verificatum cryptographic engine.

---

## 🚀 Features

- Wizard-style interface for step-by-step voting
- Integration-ready with a Flask API
- Styled using Tailwind CSS and Flowbite components

---

## 📦 Tech Stack

- React + Vite
- Tailwind CSS
- Flowbite
- Fetch API for backend communication

---

## 🧪 Running Locally

### 1. Install dependencies

```bash
npm install
```

2. Start development server
```
npm run dev
```

The app will be available at:
➡️ http://localhost:5173

    Make sure the backend Flask API is running at http://localhost:5000
    or enable demo mode to simulate responses.

🧱 Structure

```
src/
├── components/        # Reusable UI components (e.g., WordsMock, Stepper)
├── pages/             # Optional: separate wizard pages
├── App.tsx            # Core app logic (wizard flow)
├── main.tsx           # Vite entry point
└── index.css          # Tailwind and Flowbite styles
```
