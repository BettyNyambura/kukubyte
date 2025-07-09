from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import db
from models import Booking, Chicken, User
from datetime import datetime

orders_bp = Blueprint('orders', __name__)

@orders_bp.route('', methods=['GET'])
@jwt_required()
def get_orders():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    if user.role == 'admin':
        orders = Booking.query.all()
    else:
        orders = Booking.query.filter_by(user_id=current_user_id).all()
    return jsonify([{
        "id": order.id,
        "chicken_name": order.chicken.name,
        "kgs": order.quantity,
        "location": order.location,
        "status": order.status,
        "order_date": order.order_date.isoformat()
    } for order in orders]), 200

@orders_bp.route('', methods=['POST'])
@jwt_required()
def create_order():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    chicken_id = data.get('chicken_id')
    quantity = data.get('quantity')
    location = data.get('location')
    
    if not all([chicken_id, quantity, location]):
        return jsonify({"error": "Missing required fields"}), 400
    
    chicken = Chicken.query.get(chicken_id)
    if not chicken:
        return jsonify({"error": "Chicken not found"}), 404
    if chicken.stock < quantity:
        return jsonify({"error": "Insufficient stock"}), 400
    
    order = Booking(
        user_id=current_user_id,
        chicken_id=chicken_id,
        quantity=quantity,
        location=location
    )
    chicken.stock -= quantity
    db.session.add(order)
    db.session.commit()
    return jsonify({"message": "Order created", "order_id": order.id}), 201

@orders_bp.route('/<int:order_id>/status', methods=['PATCH'])
@jwt_required()
def update_order_status(order_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or user.role != 'admin':
        return jsonify({"error": "Admin access required"}), 403
    
    data = request.get_json()
    status = data.get('status')
    if status not in ['pending', 'confirmed', 'delivered']:
        return jsonify({"error": "Invalid status"}), 400
    
    order = Booking.query.get(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404
    
    order.status = status
    db.session.commit()
    return jsonify({"message": "Status updated"}), 200