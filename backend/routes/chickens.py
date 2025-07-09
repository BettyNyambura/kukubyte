from flask import Blueprint, request, jsonify
from database import db
from models import Chicken
import jwt
from config import Config

chickens_bp = Blueprint('chickens', __name__)

def token_required(f):
    def decorator(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        try:
            jwt.decode(token.split()[1], Config.JWT_SECRET_KEY, algorithms=['HS256'])
        except:
            return jsonify({'message': 'Token is invalid'}), 401
        return f(*args, **kwargs)
    return decorator

@chickens_bp.route('/', methods=['GET'])
def get_chickens():
    chickens = Chicken.query.all()
    return jsonify([{
        'id': c.id,
        'name': c.name,
        'price': c.price,
        'stock': c.stock,
        'description': c.description
    } for c in chickens]), 200

@chickens_bp.route('/', methods=['POST'])
@token_required
def create_chicken():
    data = request.get_json()
    name = data.get('name')
    price = data.get('price')
    stock = data.get('stock')
    description = data.get('description')

    if not name or not price or not stock:
        return jsonify({'message': 'Missing required fields'}), 400

    chicken = Chicken(name=name, price=price, stock=stock, description=description)
    db.session.add(chicken)
    db.session.commit()

    return jsonify({'message': 'Chicken added successfully'}), 201