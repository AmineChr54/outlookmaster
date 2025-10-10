import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from imap_tools import MailBox, AND

def fetch_emails_from_inbox():
    """
    Connects to the email server using credentials from .env and fetches emails.
    """
    email_account = os.environ.get('EMAIL_ACCOUNT')
    email_password = os.environ.get('EMAIL_APP_PASSWORD')

    if not email_account or not email_password:
        raise ValueError("EMAIL_ACCOUNT and EMAIL_APP_PASSWORD must be set in .env")

    emails = []
    with MailBox('imap.gmail.com').login(email_account, email_password, 'INBOX') as mailbox:
        for msg in mailbox.fetch(AND(all=True), limit=10, reverse=True):
            emails.append({
                "id": msg.uid,
                "from": msg.from_,
                "subject": msg.subject,
                "date": msg.date_str,
                "preview": msg.text[:100]  # A short preview of the email body
            })
    return emails

def send_email(recipient, subject, body):
    sender = os.environ.get("EMAIL_ACCOUNT")
    password = os.environ.get("EMAIL_APP_PASSWORD")
    if not sender or not password:
        raise ValueError("Email account credentials missing!")

    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject
    msg.attach(MIMEText(body, "plain"))

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(sender, password)
        server.sendmail(sender, recipient, msg.as_string())

def forward_email(forward_to, original_subject, original_body):
    sender = os.environ.get("EMAILACCOUNT")
    password = os.environ.get("EMAILAPPPASSWORD")
    if not sender or not password:
        raise ValueError("Email account credentials missing!")

    subject = f"FWD: {original_subject}"
    body = f"Forwarded message:\n\n{original_body}"

    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = forward_to
    msg['Subject'] = subject
    msg.attach(MIMEText(body, "plain"))

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(sender, password)
        server.sendmail(sender, forward_to, msg.as_string())
