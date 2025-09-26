import os
import json
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from google.oauth2 import id_token
from google.auth.transport import requests as grequests

# Load environment variables from '.env'
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")
CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET")

if not CLIENT_ID:
    raise RuntimeError("GOOGLE_CLIENT_ID environment variable not set. Please set it in your .env file.")
if not CLIENT_SECRET:
    raise RuntimeError("GOOGLE_CLIENT_SECRET environment variable not set. Please set it in your .env file.")

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

@app.route("/api/fetchEmails", methods=["POST"])
def fetch_emails_oauth():
    data = request.get_json()
    token = data.get("token")
    print("DEBUG Incoming data:", data)
    print("DEBUG Token received:", token)

    if not token:
        print("ERROR No token provided in request body.")
        return jsonify(error="No token provided"), 400
    
    try:
        idinfo = id_token.verify_oauth2_token(token, grequests.Request(), CLIENT_ID)
        useremail = idinfo["email"]
        print("DEBUG Token verified. User email:", useremail)
        return jsonify(status="ok", email=useremail, message="Login verified successfully (no Gmail fetch yet)")
    except ValueError as e:
        print("ERROR Token verification failed:", str(e))
        return jsonify(error=str(e)), 400

@app.route("/api/health")
def health():
    return jsonify(status="ok")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
