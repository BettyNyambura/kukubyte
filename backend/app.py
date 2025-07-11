from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from database import db
from routes.auth import auth_bp
from routes.chickens import chickens_bp
from routes.orders import orders_bp
from routes.admin import admin_bp
from flask_jwt_extended import JWTManager


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize CORS
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

    # Initialize Flask-Migrate
    migrate = Migrate(app, db)

    # initialize JWTManager
    jwt = JWTManager(app)

    # JWT Error Handlers - Add these to debug the 422 errors
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        print("JWT Error: Token expired!")
        return jsonify({"error": "Token has expired"}), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        print(f"JWT Error: Invalid token - {error}")
        return jsonify({"error": "Invalid token"}), 422

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        print(f"JWT Error: Missing token - {error}")
        return jsonify({"error": "Token required"}), 401

    @jwt.needs_fresh_token_loader
    def token_not_fresh_callback(jwt_header, jwt_payload):
        print("JWT Error: Fresh token required")
        return jsonify({"error": "Fresh token required"}), 401

    @jwt.revoked_token_loader
    def revoked_token_callback(jwt_header, jwt_payload):
        print("JWT Error: Token revoked")
        return jsonify({"error": "Token has been revoked"}), 401

    # Additional error handler for malformed tokens
    @jwt.decode_key_loader
    def decode_key_callback(jwt_header, jwt_payload):
        print("JWT Debug: Decoding token...")
        return app.config['JWT_SECRET_KEY']

    # Initialize SQLAlchemy
    db.init_app(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(chickens_bp, url_prefix='/api/chickens')
    app.register_blueprint(orders_bp, url_prefix='/api/orders')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    # Root endpoint
    @app.route('/')
    def index():
        return {"message": "Welcome to Kukubyte API"}, 200

    # Create database tables
    #with app.app_context():
     #   db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)