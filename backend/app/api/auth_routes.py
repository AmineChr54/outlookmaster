from flask import Blueprint, jsonify, request
from google.oauth2 import id_token
from google.auth.transport import requests as grequests
from flask import current_app

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@bp.route('/google', methods=['POST'])
def auth_google():
    """Verify Google ID token and return user info."""
    token = request.json.get('token')
    if not token:
        return jsonify({"error": "Token is required"}), 400

    try:
        idinfo = id_token.verify_oauth2_token(
            token, 
            grequests.Request(), 
            current_app.config['GOOGLE_CLIENT_ID']
        )
        user_email = idinfo['email']
        # Here you would typically find or create a user in your database
        # For now, we just return the verified email
        return jsonify({
            "message": "Login successful",
            "email": user_email
        })
    except ValueError as e:
        return jsonify({"error": "Invalid token", "details": str(e)}), 401
