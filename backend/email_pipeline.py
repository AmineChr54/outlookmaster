import imaplib
import email
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
import os

""" 
IMPORTANT: Make sure to set the following environment variables in your .env file
1- you need to create a file named .env in the root directory of your project (without a file name, just .env)
2- add in your .env file the following lines:
EMAIL_ACCOUNT=your_email@gmail.com
EMAIL_APP_PASSWORD=your_app_password

This whole process will be automated in the future - through a user-friendly interface.
"""

# --- Get from local environment account details ---
load_dotenv()
EMAIL_ACCOUNT = os.getenv("EMAIL_ACCOUNT")
PASSWORD = os.getenv("EMAIL_APP_PASSWORD")
IMAP_SERVER = "imap.gmail.com"

# --- Connect to the server ---
def connect_to_email():
    try:
        mail = imaplib.IMAP4_SSL(IMAP_SERVER)
        mail.login(EMAIL_ACCOUNT, PASSWORD)
        return mail
    except imaplib.IMAP4.error as e:
        print("Login failed:", e)
        exit(1)

# --- Select mailbox ---
def get_mailboxes(mail):
    status, mailboxes = mail.list()
    if status == "OK":
        mailbox_names = []
        for mbox in mailboxes:
            # mbox is a bytes object, decode and parse the mailbox name
            parts = mbox.decode().split(' "/" ')
            if len(parts) == 2:
                mailbox_names.append(parts[1].replace('"', ''))
        return mailbox_names
    else:
        print("Failed to list mailboxes.")
        return []

# --- Search for all emails ---
def search_emails(mail: imaplib.IMAP4_SSL):
    mail.select(get_mailboxes(mail)[0])  # Select the first mailbox (usually INBOX)
    status, messages = mail.search(None, "ALL")
    if status != "OK":
        print("No messages found!")
    else:
        email_ids = messages[0].split()
        print(f"Total emails: {len(email_ids)}")
        print(email_ids)
        for num in email_ids:
            status, data = mail.fetch(num, "(RFC822)")
            if status != "OK":
                print(f"Failed to fetch email {num}")
                continue
            msg = email.message_from_bytes(data[0][1])
            subject = msg["subject"]
            sender = msg["from"]
            print(f"From: {sender}")
            print(f"Subject: {subject}")
            # Print email body (plain text only)
            body = ""
            if msg.is_multipart():
                for part in msg.walk():
                    if part.get_content_type() == "text/plain" and part.get('Content-Disposition') is None:
                        body = part.get_payload(decode=True).decode(errors="ignore")
                        break
            else:
                body = msg.get_payload(decode=True).decode(errors="ignore")
            print("Body:")
            print(body)
            print("-" * 40)

# This function sends an email using Gmail's SMTP server with SSL encryption.
def send_email(to_address, subject, body):

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = EMAIL_ACCOUNT
    msg["To"] = to_address

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_ACCOUNT, PASSWORD)
            server.sendmail(EMAIL_ACCOUNT, to_address, msg.as_string())
            print(f"Email sent to {to_address}")
    except smtplib.SMTPException as e:
        print(f"Failed to send email: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

# Example usage:
mail = connect_to_email()
search_emails(mail)
# send_email("lolocheep54@gmail.com", "Test Subject 3", "Hello, this is a test email.")
