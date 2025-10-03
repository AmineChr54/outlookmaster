import os
import imaplib
import email
from flask import Blueprint, request, jsonify
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

bp = Blueprint('emails', __name__, url_prefix='/api/emails')


# Your existing Google OAuth2-based email fetch route (unchanged)
@bp.route('/fetch', methods=['POST'])
def fetch_emails():
    data = request.json
    access_token = data.get('access_token')
    refresh_token = data.get('refresh_token')

    client_id = os.getenv('GOOGLE_CLIENT_ID')
    client_secret = os.getenv('GOOGLE_CLIENT_SECRET')
    token_uri = os.getenv('GOOGLE_TOKEN_URI')

    creds = Credentials(
        token=access_token,
        refresh_token=refresh_token,
        token_uri=token_uri,
        client_id=client_id,
        client_secret=client_secret,
    )

    try:
        service = build('gmail', 'v1', credentials=creds)
        results = service.users().messages().list(userId='me', maxResults=10).execute()
        messages = results.get('messages', [])

        snippets = []
        for msg in messages:
            msg_data = service.users().messages().get(userId='me', id=msg['id']).execute()
            snippets.append({'id': msg['id'], 'snippet': msg_data.get('snippet')})

        return jsonify(snippets)

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": "Failed to fetch emails", "details": str(e)}), 500


# New route to fetch emails raw using IMAP with email and app password from env
@bp.route('/fetch_raw', methods=['GET'])
def fetch_emails_raw():
    EMAIL_ACCOUNT = os.getenv('EMAIL_ACCOUNT')
    EMAIL_APP_PASSWORD = os.getenv('EMAIL_APP_PASSWORD')

    if not EMAIL_ACCOUNT or not EMAIL_APP_PASSWORD:
        return jsonify({"error": "Email account or app password not configured"}), 500

    try:
        mail = imaplib.IMAP4_SSL('imap.gmail.com')
        mail.login(EMAIL_ACCOUNT, EMAIL_APP_PASSWORD)
        mail.select('inbox')

        typ, data = mail.search(None, 'ALL')
        mail_ids = data[0].split()

        emails = []
        for mail_id in mail_ids[-20:]:  # Get last 20 emails
            typ, msg_data = mail.fetch(mail_id, '(RFC822)')
            raw_email = msg_data[0][1]
            msg = email.message_from_bytes(raw_email)

            subject = msg['subject']
            from_ = msg['from']
            date = msg['date']  # Get the date from email headers
            snippet = ''

            if msg.is_multipart():
                for part in msg.walk():
                    if part.get_content_type() == 'text/plain':
                        snippet = part.get_payload(decode=True).decode(errors='ignore')
                        break
            else:
                snippet = msg.get_payload(decode=True).decode(errors='ignore')

            emails.append({
                'id': mail_id.decode(),
                'subject': subject,
                'from': from_,
                'date': date,  # Include date in response
                'snippet': snippet[:200],  # first 200 chars
            })

        mail.logout()
        return jsonify(emails)

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": "Failed to fetch emails", "details": str(e)}), 500
