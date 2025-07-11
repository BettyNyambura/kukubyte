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

# POST new stock entry
@admin_bp.route('/stocks', methods=['POST'])
@jwt_required()
def add_stock():
    if not admin_required():
        return jsonify({'error': 'Admin access required'}), 403

    data = request.get_json()
    weight = data.get('weight')
    stock = data.get('stock')

    if not weight or not stock:
        return jsonify({'error': 'Weight and stock are required'}), 400

    try:
        weight = float(weight)
        stock = int(stock)
        if weight <= 0 or stock <= 0:
            return jsonify({'error': 'Weight and stock must be positive'}), 400
    except (ValueError, TypeError):
        return jsonify({'error': 'Invalid weight or stock value'}), 400

    new_stock = ChickenWeightStock(weight=weight, stock=stock)
    db.session.add(new_stock)
    db.session.commit()
    return jsonify({
        "id": new_stock.id,
        "weight": new_stock.weight,
        "stock": new_stock.stock
    }), 201

# PATCH stock by ID
@admin_bp.route('/stocks/<int:stock_id>', methods=['PATCH'])
@jwt_required()
def update_stock(stock_id):
    if not admin_required():
        return jsonify({'error': 'Admin access required'}), 403

    stock = ChickenWeightStock.query.get_or_404(stock_id)
    data = request.get_json()
    new_stock = data.get('stock')

    if new_stock is None:
        return jsonify({'error': 'Stock quantity is required'}), 400

    try:
        new_stock = int(new_stock)
        if new_stock < 0:
            return jsonify({'error': 'Stock cannot be negative'}), 400
    except (ValueError, TypeError):
        return jsonify({'error': 'Invalid stock value'}), 400

    stock.stock = new_stock
    db.session.commit()
    return jsonify({
        "id": stock.id,
        "weight": stock.weight,
        "stock": stock.stock
    }), 200

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

# GET all users
@admin_bp.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    if not admin_required():
        return jsonify({'error': 'Admin access required'}), 403

    users = User.query.all()
    return jsonify([
        {
            "id": u.id,
            "username": u.username,
            "email": u.email,
            "role": u.role
        } for u in users
    ]), 200