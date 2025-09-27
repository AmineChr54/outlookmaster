from flask import Blueprint, jsonify
from ..services import email_service

bp = Blueprint('email', __name__, url_prefix='/api/emails')

@bp.route('/fetch', methods=['GET']) # Changed to GET for simplicity in testing
def fetch_emails_route():
    """An endpoint to trigger fetching emails using the .env credentials."""
    try:
        emails = email_service.fetch_emails_from_inbox()
        return jsonify(emails)
    except Exception as e:
        print(f"[ERROR] Failed to fetch emails: {e}")
        return jsonify({"error": "Failed to fetch emails", "details": str(e)}), 500

@bp.route('/', methods=['GET'])
def get_emails():
    # This is a placeholder. This would fetch emails from a database if we were storing them.
    # Since we are not, this could be adapted to fetch live from the email server.
    mock_emails = [
        {"id": "1", "from": "sender@example.com", "subject": "Test Email 1", "preview": "This is a test..."},
        {"id": "2", "from": "another@example.com", "subject": "Hello World", "preview": "Just saying hi..."},
    ]
    return jsonify(mock_emails)
