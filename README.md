# Kukubyte

Kukubyte is a full-stack web application designed to streamline the process of ordering farm-fresh chicken directly from the source. It features a Flask-based RESTful backend and a modern React frontend built with Vite and styled with Tailwind CSS.

## ✨ Features

- **User Authentication**: Secure user registration and login system using JWT for protected routes.
- **Customer Dashboard**: A personalized dashboard for users to view order statistics, recent activity, and manage their account.
- **Chicken Ordering**: Simple interface for customers to select chicken weight and quantity, calculate the total price, and place an order.
- **Order Confirmation**: Instant confirmation upon successful order placement.
- **Admin Capabilities**: Backend is equipped with admin-level access to view all customer orders and update their status (e.g., pending, confirmed, delivered).
- **RESTful API**: A well-structured backend API to handle all data operations for users, chickens, and bookings.

## 🛠️ Tech Stack

- **Backend**: Python, Flask, Flask-SQLAlchemy, Flask-Migrate, Flask-JWT-Extended
- **Frontend**: React, Vite, Tailwind CSS, Axios, React Router
- **Database**: SQLite

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

- Python 3.8+ and `pip`
- Node.js and `npm`

### Backend Setup

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Create and activate a virtual environment:**

    ```bash
    # For Windows
    python -m venv venv
    .\venv\Scripts\activate

    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Install the required Python packages:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Initialize the database:**
    The project uses Flask-Migrate to manage database schema. Run the following command to apply the existing migrations and create the `chicken_ordering.db` file.

    ```bash
    flask db upgrade
    ```

5.  **Run the Flask application:**
    ```bash
    python app.py
    ```
    The backend server will start on `http://127.0.0.1:5000`.

### Frontend Setup

1.  **Navigate to the frontend directory in a new terminal:**

    ```bash
    cd frontend-new
    ```

2.  **Install the required Node modules:**

    ```bash
    npm install
    ```

3.  **Run the frontend development server:**
    ```bash
    npm run dev
    ```
    The React application will be available at `http://localhost:5173`.

## 📖 Usage

Once both the backend and frontend servers are running:

1.  Open your browser and navigate to `http://localhost:5173`.
2.  Create a new account via the **Sign Up** page or log in with existing credentials.
3.  Upon successful login, you will be redirected to your personal dashboard.
4.  From the dashboard, click **Book Now** to go to the ordering page.
5.  Select the desired chicken weight and quantity, fill in your location, and place your order.
6.  You will be redirected to a confirmation page. You can return to your dashboard to view your order history and statistics.

## 🔌 API Endpoints

The backend provides the following API endpoints.

| Method  | Endpoint                        | Description                                  | Access       |
| :------ | :------------------------------ | :------------------------------------------- | :----------- |
| `POST`  | `/api/auth/register`            | Creates a new user account.                  | Public       |
| `POST`  | `/api/auth/login`               | Logs in a user and returns a JWT.            | Public       |
| `GET`   | `/api/auth/profile`             | Retrieves the profile of the logged-in user. | User         |
| `GET`   | `/api/auth/dashboard`           | Fetches dashboard statistics for the user.   | User         |
| `GET`   | `/api/chickens`                 | Retrieves a list of available chickens.      | Public       |
| `POST`  | `/api/orders`                   | Creates a new chicken order.                 | User         |
| `GET`   | `/api/orders`                   | Retrieves order history for the user.        | User / Admin |
| `PATCH` | `/api/orders/<order_id>/status` | Updates the status of a specific order.      | Admin        |
