# Kukubyte Chicken Ordering System

Welcome to the Kukubyte Chicken Ordering System, a web application for managing chicken orders. This project includes a Flask-based backend API and a React frontend for user interaction.

## Overview

- **Backend**: A RESTful API built with Flask, handling authentication, chicken management, and order processing.
- **Frontend**: A React application for user registration, login, and order placement, integrated with the backend API.
- **Database**: SQLite (`chicken_ordering.db`) for storing users, chickens, and orders.

## Project Structure

kukubyte/
│
├── backend/
│ ├── app.py # Main Flask application
│ ├── config.py # Configuration settings
│ ├── database.py # Database initialization
│ ├── models.py # Database models (e.g., User, Chicken, Booking)
│ ├── routes/
│ │ ├── init.py # Blueprint initialization
│ │ ├── auth.py # Authentication routes
│ │ ├── chickens.py # Chicken management routes
│ │ ├── orders.py # Order management routes
│ ├── venv/ # Virtual environment
│ └── .env # Environment variables (e.g., SECRET_KEY, JWT_SECRET_KEY)
│
├── frontend-new/
│ ├── src/
│ │ ├── components/ # React components (e.g., BookChicken.js)
│ │ ├── images/ # Static images (e.g., logo.jpg)
│ │ ├── App.jsx # Main React app
│ │ └── index.js # Entry point
│ ├── package.json # Node.js dependencies
│ └── node_modules/ # Dependency directory
│
└── README.md # This file

## Prerequisites

- **Python 3.x**
- **Node.js and npm**
- **pip** and **virtualenv**

## Installation

### Backend

1. Navigate to the backend directory:
   ```bash
   cd \kukubyte\backend
    Create and activate a virtual environment:
   ```
2. Run
   python -m venv venv
   .\venv\Scripts\activate
   Install dependencies:
3. Run
   pip install -r requirements.txt
   (Create requirements.txt with: flask flask-cors flask-migrate flask-sqlalchemy flask-jwt-extended python-dotenv if not present.)
   Set up environment variables in .env:
4. Config
   SECRET_KEY=your-secret-key
   DATABASE_URL=sqlite:///chicken_ordering.db
   JWT_SECRET_KEY=your-jwt-secret-key
   Initialize the database:
5. Run

   flask db init
   flask db migrate -m "Initial migration"
   flask db upgrade

6. Run the backend:
   python app.py
7. Frontend
   Navigate to the frontend directory:
   cd C:\Users\Administrator\Desktop\kukutest\frontend-new
   Install dependencies:

## Run the frontend:

Run
npm start

## Usage

Register/Login: Use the frontend to register a new user or log in at http://localhost:5173.
Order Chicken: Navigate to the order page, select weight and quantity, and place an order.
Admin Features: Admins can view all orders and update statuses via the API.

## API Endpoints:

        /api/auth/register: Register a user (POST)
        /api/auth/login: Log in and get a JWT token (POST)
        /api/chickens/: List or create chickens (GET, POST)
        /api/orders/: List or create orders (GET, POST)
        /api/orders/<int:order_id>/status
        Update order status (PATCH)
