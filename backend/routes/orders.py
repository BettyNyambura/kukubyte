from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import db
from models import Booking, Chicken, User, ChickenWeightStock
from datetime import datetime

orders_bp = Blueprint('orders', __name__)

@orders_bp.route('', methods=['GET'])
@jwt_required()
def get_orders():
    current_user_id = int(get_jwt_identity())
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
        "weight": order.weight,
        "quantity": order.quantity,
        "location": order.location,
        "status": order.status,
        "order_date": order.order_date.isoformat()
    } for order in orders]), 200

@orders_bp.route('', methods=['POST'])
@jwt_required()
def create_order():
    try:
        current_user_id = int(get_jwt_identity())
        data = request.get_json()
        kgs = data.get('kgs')
        count = data.get('count')
        location = data.get('location')

        if not all([kgs, count, location]):
            return jsonify({"error": "Weight, quantity, and location are required"}), 400

        try:
            quantity = int(count)
            if quantity <= 0:
                return jsonify({"error": "Quantity must be positive"}), 400
            # Handle 'Over 2' by selecting the highest weight > 2 from ChickenWeightStock
            if kgs == 'Over 2':
                stock = ChickenWeightStock.query.filter(
                    ChickenWeightStock.weight > 2,
                    ChickenWeightStock.stock >= quantity
                ).order_by(ChickenWeightStock.weight.desc()).first()
                if not stock:
                    return jsonify({"error": "No stock available for weights over 2 kg"}), 404
                weight = stock.weight
            else:
                weight = float(kgs)
                if weight <= 0:
                    return jsonify({"error": "Weight must be positive"}), 400
        except (ValueError, TypeError):
            return jsonify({"error": "Invalid weight or quantity value"}), 400

        # Assume first chicken for compatibility with BookChicken.jsx
        chicken = Chicken.query.first()
        if not chicken:
            return jsonify({"error": "Chicken not found"}), 404

        # Validate weight against ChickenWeightStock
        weight_stock = ChickenWeightStock.query.filter_by(chicken_id=chicken.id, weight=weight).first()
        if not weight_stock:
            return jsonify({"error": f"No stock available for {weight} kg category"}), 404

        if weight_stock.stock < quantity:
            return jsonify({"error": "Insufficient stock for selected weight"}), 400

        # Deduct stock
        weight_stock.stock -= quantity

        # Create order
        order = Booking(
            user_id=current_user_id,
            chicken_id=chicken.id,
            quantity=quantity,
            weight=weight,
            location=location,
            status='pending',
            order_date=datetime.utcnow()
        )

        db.session.add(order)
        db.session.commit()

        return jsonify({"message": "Order created", "order_id": order.id}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Failed to create order: {str(e)}"}), 500