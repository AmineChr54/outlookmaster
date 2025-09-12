# backend/email_pipeline.py
import imaplib
import email
from email.header import decode_header
import os
from dotenv import load_dotenv

load_dotenv()

EMAIL_ACCOUNT = os.getenv("EMAIL_ACCOUNT")
PASSWORD = os.getenv("EMAIL_APP_PASSWORD")
IMAP_SERVER = "imap.gmail.com"


def connect_to_email():
    try:
        mail = imaplib.IMAP4_SSL(IMAP_SERVER)
        mail.login(EMAIL_ACCOUNT, PASSWORD)
        return mail
    except imaplib.IMAP4.error as e:
        print("Login failed:", e)
        raise


def _decode_mime_words(s):
    if not s:
        return ""
    parts = decode_header(s)
    out = []
    for part, enc in parts:
        if isinstance(part, bytes):
            try:
                out.append(part.decode(enc or "utf-8", errors="ignore"))
            except:
                out.append(part.decode("utf-8", errors="ignore"))
        else:
            out.append(part)
    return "".join(out)



def _get_text_and_html_from_msg(msg):
    """
    Returns (plain, html) tuple. If only one is found, the other is None.
    """
    plain = None
    html = None
    if msg.is_multipart():
        for part in msg.walk():
            content_type = part.get_content_type()
            disp = part.get('Content-Disposition')
            if content_type == 'text/plain' and disp is None and plain is None:
                payload = part.get_payload(decode=True)
                if payload:
                    plain = payload.decode(errors="ignore")
            elif content_type == 'text/html' and disp is None and html is None:
                payload = part.get_payload(decode=True)
                if payload:
                    html = payload.decode(errors="ignore")
        # fallback: try any text/* part
        if plain is None:
            for part in msg.walk():
                if part.get_content_type().startswith('text/'):
                    payload = part.get_payload(decode=True)
                    if payload:
                        plain = payload.decode(errors="ignore")
                        break
    else:
        payload = msg.get_payload(decode=True)
        if msg.get_content_type() == 'text/html':
            html = payload.decode(errors="ignore") if payload else None
        else:
            plain = payload.decode(errors="ignore") if payload else None
    return plain, html


def fetch_emails(mail: imaplib.IMAP4_SSL, mailbox="INBOX", limit=50):
    status, _ = mail.select(mailbox)
    if status != "OK":
        return []
    status, messages = mail.search(None, "ALL")
    if status != "OK":
        return []
    email_ids = messages[0].split()
    # take newest `limit`
    if limit:
        email_ids = email_ids[-limit:]

    category_map = {
        "INBOX": "Inbox",
        "[Gmail]/Spam": "Spam",
        "[Gmail]/Drafts": "Drafts"
    }

    emails = []
    # iterate newest-first
    for num in reversed(email_ids):
        status, data = mail.fetch(num, "(RFC822)")
        if status != "OK" or not data or not data[0]:
            continue
        msg = email.message_from_bytes(data[0][1])
        subject = _decode_mime_words(msg.get("subject"))
        sender = _decode_mime_words(msg.get("from"))
        date = msg.get("date")
        plain, html = _get_text_and_html_from_msg(msg)
        body = plain or ""
        emails.append({
            "id": num.decode() if isinstance(num, bytes) else str(num),
            "subject": subject,
            "from": sender,
            "date": date,
            "preview": (plain or html or "")[:200],
            "body": body,
            "html": html,
            "category": category_map.get(mailbox, mailbox)
        })
    return emails
