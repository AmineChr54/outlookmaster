import os

from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv


def create_app():
    app = Flask(__name__)

    env_path = os.path.join(app.root_path, '..', '.env')
    load_dotenv(dotenv_path=env_path)

    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret')
    app.config['GOOGLE_CLIENT_ID'] = os.getenv('GOOGLE_CLIENT_ID')
    app.config['GOOGLE_CLIENT_SECRET'] = os.getenv('GOOGLE_CLIENT_SECRET')
    app.config['GOOGLE_REDIRECT_URI'] = os.getenv('GOOGLE_REDIRECT_URI')
    app.config['EMAIL_ACCOUNT'] = os.getenv('EMAIL_ACCOUNT')
    app.config['EMAIL_APP_PASSWORD'] = os.getenv('EMAIL_APP_PASSWORD')
    app.config['GOOGLE_AUTH_URI'] = os.getenv('GOOGLE_AUTH_URI')
    app.config['GOOGLE_TOKEN_URI'] = os.getenv('GOOGLE_TOKEN_URI')

    if not app.config['GOOGLE_CLIENT_ID']:
        raise RuntimeError("Set GOOGLE_CLIENT_ID in .env")
    if not app.config['GOOGLE_REDIRECT_URI']:
        raise RuntimeError("Set GOOGLE_REDIRECT_URI in .env")

    # Enable CORS for frontend
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    from .api.auth_routes import bp as auth_bp
    from .api.email_routes import bp as email_bp

    # Register blueprints with prefixes
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(email_bp, url_prefix='/api/emails')
    
    @app.route('/')
    def index():
        return "Hello from Flask backend"
    
    @app.route('/api/test')
    def api_test():
        return "API prefix works"
   

    return app
