# backend/email_api.py
from flask import Flask, jsonify
from flask_cors import CORS
from email_pipeline import connect_to_email, fetch_emails
import email


app = Flask(__name__)
# allow your frontend origin (dev)
CORS(app, origins=["http://localhost:3000"])

@app.route("/api/emails")
def get_emails():
    mail = connect_to_email()
    try:
        emails = fetch_emails(mail, mailbox="INBOX", limit=50)
    finally:
        try:
            mail.logout()
        except:
            pass
    return jsonify(emails)


@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
