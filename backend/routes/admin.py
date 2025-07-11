from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import db
from models import Booking, ChickenWeightStock, User

admin_bp = Blueprint('admin', __name__)

# Middleware: Check if current user is admin
def admin_required():
    current_user = User.query.get(get_jwt_identity())
    if not current_user or current_user.role != 'admin':
        return None
    return current_user

# GET all orders (admin only)
@admin_bp.route('/orders', methods=['GET'])
@jwt_required()
def get_all_orders():
    if not admin_required():
        return jsonify({'error': 'Admin access required'}), 403

    orders = Booking.query.all()
    return jsonify([
        {
            "id": o.id,
            "username": o.user.username,
            "quantity": o.quantity,
            "weight": getattr(o, "weight", None),
            "location": o.location,
            "status": o.status,
            "order_date": o.order_date.isoformat(),
            "chicken_name": o.chicken.name
        } for o in orders
    ]), 200

# GET all weight-based stock entries
@admin_bp.route('/stocks', methods=['GET'])
@jwt_required()
def get_weight_stocks():
    if not admin_required():
        return jsonify({'error': 'Admin access required'}), 403

    stocks = ChickenWeightStock.query.all()
    return jsonify([
        {
            "id": s.id,
            "weight": s.weight,
            "stock": s.stock
        } for s in stocks
    ]), 200

# DELETE stock by ID
@admin_bp.route('/stocks/<int:stock_id>', methods=['DELETE'])
@jwt_required()
def delete_weight_stock(stock_id):
    if not admin_required():
        return jsonify({'error': 'Admin access required'}), 403

    stock = ChickenWeightStock.query.get_or_404(stock_id)
    db.session.delete(stock)
    db.session.commit()
    return jsonify({'message': 'Stock deleted'}), 200

# PATCH order status
@admin_bp.route('/orders/<int:order_id>/status', methods=['PATCH'])
@jwt_required()
def update_order_status(order_id):
    if not admin_required():
        return jsonify({'error': 'Admin access required'}), 403

    order = Booking.query.get(order_id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404

    data = request.get_json()
    new_status = data.get('status')

    if new_status not in ['pending', 'confirmed', 'delivered']:
        return jsonify({'error': 'Invalid status'}), 400

    order.status = new_status
    db.session.commit()
    return jsonify({'message': 'Status updated'}), 200
