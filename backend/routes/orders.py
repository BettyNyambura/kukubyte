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
        "kgs": getattr(order, "weight", None),  # Optional: include if added to model
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

        print(f"Creating order for user {current_user_id}: kgs={kgs}, count={count}, location={location}")

        if not all([kgs, count, location]):
            return jsonify({"error": "Missing required fields"}), 400

        chicken = Chicken.query.first()
        if not chicken:
            return jsonify({"error": "Chicken not found"}), 404

        quantity = int(count)
        weight = float(kgs)

        # Check per-weight stock
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
            location=location
        )
       
        order.weight = weight

        db.session.add(order)
        db.session.commit()

        print(f"Order created successfully with ID: {order.id}")
        return jsonify({"message": "Order created", "order_id": order.id}), 201

    except Exception as e:
        print(f"Error creating order: {str(e)}")
        return jsonify({"error": "Failed to create order"}), 500


@orders_bp.route('/<int:order_id>/status', methods=['PATCH'])
@jwt_required()
def update_order_status(order_id):
    current_user_id = int(get_jwt_identity())
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


