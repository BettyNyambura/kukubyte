from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from database import db
from routes.auth import auth_bp
from routes.chickens import chickens_bp
from routes.orders import orders_bp
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


    # Initialize SQLAlchemy
    db.init_app(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(chickens_bp, url_prefix='/api/chickens')
    app.register_blueprint(orders_bp, url_prefix='/api/orders')

    # Root endpoint
    @app.route('/')
    def index():
        return {"message": "Welcome to Kukubyte API"}, 200

    # Create database tables
    with app.app_context():
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)