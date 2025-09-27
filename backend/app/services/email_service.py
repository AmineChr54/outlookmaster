import os
from imap_tools import MailBox, AND

def fetch_emails_from_inbox():
    """
    Connects to the email server using credentials from .env and fetches emails.
    """
    # These are loaded into the Flask app's config from the .env file
    email_account = os.environ.get('EMAIL_ACCOUNT')
    email_password = os.environ.get('EMAIL_APP_PASSWORD')

    if not email_account or not email_password:
        raise ValueError("EMAIL_ACCOUNT and EMAIL_APP_PASSWORD must be set in .env")

    emails = []
    # Connect to the mailbox
    with MailBox('imap.gmail.com').login(email_account, email_password, 'INBOX') as mailbox:
        # Search for all emails in the inbox and fetch them
        for msg in mailbox.fetch(AND(all=True), limit=10, reverse=True):
            emails.append({
                "id": msg.uid,
                "from": msg.from_,
                "subject": msg.subject,
                "date": msg.date_str,
                "preview": msg.text[:100] # A short preview of the email body
            })
    return emails

