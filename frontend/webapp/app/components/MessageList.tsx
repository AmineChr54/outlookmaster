// frontend/webapp/app/components/EmailsClient.tsx
"use client"

import React, { useEffect, useState } from "react";

type Email = {
  id: string;
  subject: string;
  from: string;
  date: string;
  preview: string;
  body?: string;
};

export default function EmailsClient() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:5000/api/emails");
        if (!res.ok) throw new Error("Failed to fetch emails");
        const data = await res.json();
        setEmails(data);
      } catch (err: any) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div>Loading emails...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!emails.length) return <div>No emails found</div>;

  return (
    <div>
      {emails.map((e) => (
        <div key={e.id} style={{borderBottom: "1px solid #ddd", padding: "10px 0"}}>
          <h3 style={{margin: 0}}>{e.subject || "(no subject)"}</h3>
          <div style={{fontSize: "12px", color: "#666"}}>{e.from} • {e.date}</div>
          <p style={{marginTop: 8}}>{e.preview}</p>
        </div>
      ))}
    </div>
  );
}
