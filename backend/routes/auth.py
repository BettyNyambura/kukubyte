from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from database import db
from models import User, Booking, Chicken
from werkzeug.security import check_password_hash
from datetime import datetime
from sqlalchemy import extract
import logging

logging.basicConfig(level=logging.DEBUG)

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    location = data.get('location')
    role = data.get('role', 'user')
    
    if not all([username, email, password]):
        return jsonify({"error": "Missing required fields"}), 400
    if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
        return jsonify({"error": "Username or email already exists"}), 400
    
    user = User(username=username, email=email, location=location, role=role)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        print(f"Login attempt for email: {email}")
        
        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            print("Invalid credentials")
            return jsonify({"error": "Invalid credentials"}), 401
        
        print(f"Creating token for user ID: {user.id}")
        # Convert user.id to string to fix "Subject must be a string" error
        access_token = create_access_token(identity=str(user.id))
        print(f"Token created successfully")
        
        return jsonify({"access_token": access_token, "role": user.role}), 200
        
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({"error": "Login failed"}), 500

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        print("=== PROFILE ENDPOINT CALLED ===")
        print("Headers:", dict(request.headers))
        
        user_id = get_jwt_identity()
        print(f"User ID from JWT: {user_id}")
        
        if not user_id:
            print("No user ID found in JWT")
            return jsonify({"error": "Invalid token"}), 401
        
        # Convert string back to int for database query
        user = User.query.get(int(user_id))
        if not user:
            print(f"User with ID {user_id} not found in database")
            return jsonify({"error": "User not found"}), 404
        
        print(f"User found: {user.username}")
        return jsonify({
            "username": user.username,
            "email": user.email,
            "location": user.location,
            "role": user.role
        }), 200
        
    except Exception as e:
        print(f"Profile endpoint error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "Email not found"}), 404
    # Placeholder: Implement email sending logic here
    return jsonify({"message": "Password reset link sent (placeholder)"}), 200

@auth_bp.route('/is_admin', methods=['GET'])
@jwt_required()
def is_admin():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user and user.role == 'admin':
        return jsonify({"admin": True}), 200
    return jsonify({"admin": False}), 403

@auth_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard_stats():
    try:
        print("=== DASHBOARD ENDPOINT CALLED ===")
        user_id = get_jwt_identity()
        print(f"User ID from JWT: {user_id}")
        
        if not user_id:
            print("No user ID found in JWT")
            return jsonify({"error": "Invalid token"}), 401
        
        # Convert string back to int for database query
        user_id = int(user_id)
        now = datetime.utcnow()

        # Fetch all bookings for this user
        orders = Booking.query.filter_by(user_id=user_id).all()
        print(f"Found {len(orders)} orders for user {user_id}")

        total_chickens_ordered = sum(o.quantity for o in orders)
        total_orders = len(orders)
        this_month_orders = len([o for o in orders if o.order_date.month == now.month and o.order_date.year == now.year])
        total_spent = sum(o.quantity * o.chicken.price for o in orders if o.chicken)  # Added safety check
        active_orders = len([o for o in orders if o.status in ['pending', 'confirmed']])

        # Sort by order_date descending and take 5 recent
        recent_orders = sorted(orders, key=lambda o: o.order_date, reverse=True)[:5]

        return jsonify({
            "total_orders": total_orders,
            "this_month_orders": this_month_orders,
            "total_chickens_ordered": total_chickens_ordered,
            "total_spent": total_spent,
            "active_orders": active_orders,
            "recent_orders": [
                {
                    "id": o.id,
                    "order_date": o.order_date.isoformat(),
                    "quantity": o.quantity,
                    "status": o.status,
                    "chicken": {
                        "name": o.chicken.name
                    }
                }
                for o in recent_orders if o.chicken  # Added safety check
            ]
        })
        
    except Exception as e:
        print(f"Dashboard endpoint error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500