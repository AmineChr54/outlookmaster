# backend/email_api.py
from flask import Flask, jsonify, request
from flask_cors import CORS
from google.oauth2 import id_token
from google.auth.transport import requests as grequests

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

CLIENT_ID = "YOUR_WEB_OAUTH_CLIENT_ID"  # same as frontend

@app.route("/api/fetchEmails", methods=["POST"])
def fetch_emails_oauth():
    data = request.get_json()
    token = data.get("token")
    if not token:
        return jsonify({"error": "No token provided"}), 400

    try:
        # Verify Google ID token
        idinfo = id_token.verify_oauth2_token(token, grequests.Request(), CLIENT_ID)
        user_email = idinfo["email"]

        return jsonify({
            "status": "ok",
            "email": user_email,
            "message": "Login verified successfully (no Gmail fetch yet)"
        })

    except ValueError as e:
        return jsonify({"error": str(e)}), 400


@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
