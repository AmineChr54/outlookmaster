import imaplib
import email
import smtplib
from email.mime.text import MIMEText

# --- Login details ---
IMAP_SERVER = "imap.gmail.com"   # replace with your provider
EMAIL_ACCOUNT = "masteroutlook101@gmail.com"
PASSWORD = "ycup rkgh ydpl bamx"   # Gmail/Outlook requires app 
REAL_PASSWORD = "outlookmaster123456789"

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
# mail.select("inbox")

# --- Search for all emails ---
def search_emails(mail):
    status, messages = mail.search(None, "ALL")
    if status != "OK":
        print("No messages found!")
    else:
        email_ids = messages[0].split()
        print(f"Total emails: {len(email_ids)}")
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
# search_emails()
send_email("lolocheep54@gmail.com", "Test Subject 3", "Hello, this is a test email.")
