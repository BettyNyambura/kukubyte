from database import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    location = db.Column(db.String(200), nullable=True)
    role = db.Column(db.String(20), default='user')

    def __init__(self, username, email, location=None, role='user'):
        self.username = username
        self.email = email
        self.location = location
        self.role = role

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Chicken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=True)

    def __init__(self, name, price, stock, description=None):
        self.name = name
        self.price = price
        self.stock = stock
        self.description = description

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    chicken_id = db.Column(db.Integer, db.ForeignKey('chicken.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(200), nullable=False)  # Added for per-order location
    order_date = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    status = db.Column(db.String(20), default='pending')
    user = db.relationship('User', backref=db.backref('bookings', lazy=True))
    chicken = db.relationship('Chicken', backref=db.backref('bookings', lazy=True))

    def __init__(self, user_id, chicken_id, quantity, location, status='pending'):
        self.user_id = user_id
        self.chicken_id = chicken_id
        self.quantity = quantity
        self.location = location
        self.status = status