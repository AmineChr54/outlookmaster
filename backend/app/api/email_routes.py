import os
import imaplib
import email
from flask import Blueprint, request, jsonify
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from ..services.email_service import send_email, forward_email

bp = Blueprint("emails", __name__, url_prefix="/api/emails")

# Existing routes -

@bp.route("/fetch", methods=["POST"])
def fetch_emails():
    data = request.json
    accesstoken = data.get("accesstoken")
    refreshtoken = data.get("refreshtoken")
    clientid = os.getenv("GOOGLECLIENTID")
    clientsecret = os.getenv("GOOGLECLIENTSECRET")
    tokenuri = os.getenv("GOOGLETOKENURI")

    creds = Credentials(
        token=accesstoken,
        refresh_token=refreshtoken,
        token_uri=tokenuri,
        client_id=clientid,
        client_secret=clientsecret
    )
    try:
        service = build('gmail', 'v1', credentials=creds)
        results = service.users().messages().list(userId='me', maxResults=10).execute()
        messages = results.get('messages', [])
        snippets = []
        for msg in messages:
            msgid = msg['id']
            msgdata = service.users().messages().get(userId='me', id=msgid).execute()
            snippets.append({'id': msgid, 'snippet': msgdata.get('snippet', '')})
        return jsonify(snippets)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Failed to fetch emails, details: {str(e)}"}), 500

# Add new email sending endpoint

@bp.route("/send", methods=["POST"])
def send():
    data = request.json
    recipient = data.get("recipient")
    subject = data.get("subject")
    body = data.get("body")
    if not recipient or not subject or not body:
        return jsonify({"error": "Missing required fields"}), 400
    try:
        send_email(recipient, subject, body)
        return jsonify({"message": "Email sent successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Add new email forwarding endpoint

@bp.route("/forward", methods=["POST"])
def forward():
    data = request.json
    forward_to = data.get("forward_to")
    original_subject = data.get("original_subject")
    original_body = data.get("original_body")
    if not forward_to or not original_subject or not original_body:
        return jsonify({"error": "Missing required fields"}), 400
    try:
        forward_email(forward_to, original_subject, original_body)
        return jsonify({"message": "Email forwarded successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
