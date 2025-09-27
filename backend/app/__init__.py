import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

def create_app():
    """Create and configure an instance of the Flask application."""
    app = Flask(__name__)
    
    # Load environment variables from .env file
    load_dotenv(os.path.join(app.root_path, '..', '.env'))
    
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'a-default-secret-key-for-dev')
    app.config['GOOGLE_CLIENT_ID'] = os.environ.get('GOOGLE_CLIENT_ID')
    app.config['GOOGLE_CLIENT_SECRET'] = os.environ.get('GOOGLE_CLIENT_SECRET')

    if not app.config['GOOGLE_CLIENT_ID'] or not app.config['GOOGLE_CLIENT_SECRET']:
        raise RuntimeError("Google OAuth credentials must be set in .env file.")

    app.config['EMAIL_ACCOUNT'] = os.environ.get('EMAIL_ACCOUNT')
    app.config['EMAIL_APP_PASSWORD'] = os.environ.get('EMAIL_APP_PASSWORD')
    
    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    # Import and register Blueprints
    from .api.auth_routes import bp as auth_bp
    from .api.email_routes import bp as email_bp
    from .api.ai_routes import bp as ai_bp
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(email_bp)
    app.register_blueprint(ai_bp)

    return app
