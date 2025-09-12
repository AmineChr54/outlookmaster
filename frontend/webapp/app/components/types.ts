// Type definitions for email objects
export type Email = {
  id: string;
  subject: string;
  from: string;
  date: string;
  preview: string;
  body?: string;
  html?: string;
  category?: string;
};

export type Mailbox = 'INBOX' | '[Gmail]/Spam' | '[Gmail]/Drafts' | '[Gmail]/Sent';
