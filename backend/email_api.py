# backend/email_api.py
from flask import Flask, jsonify
from email_pipeline import connect_to_email, search_emails

app = Flask(__name__)

@app.route('/api/emails')
def get_emails():
    mail = connect_to_email()
    mail.select("inbox")
    status, messages = mail.search(None, "ALL")
    emails = []
    if status == "OK":
        email_ids = messages[0].split()
        for num in email_ids:
            status, data = mail.fetch(num, "(RFC822)")
            if status != "OK":
                continue
            msg = email.message_from_bytes(data[0][1])
            emails.append({
                "subject": msg["subject"],
                "from": msg["from"],
                "date": msg["date"],
                "preview": msg.get_payload(decode=True).decode(errors="ignore")[:100]  # first 100 chars
            })
    return jsonify(emails)

if __name__ == "__main__":
    app.run(port=5000)