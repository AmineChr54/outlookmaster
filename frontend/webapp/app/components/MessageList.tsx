// import { useEffect, useState } from "react";
import MessageListItem from "./MessageListItem";

export default function MessageList() {
  // const [emails, setEmails] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/emails")
  //     .then(res => res.json())
  //     .then(data => setEmails(data));
  // }, []);
  return (
    <section className="w-full md:w-1/3 bg-gray-100 p-4 overflow-y-auto border-r">
      <h2 className="text-lg font-bold mb-4 text-black">Messages</h2>
      <ul className="space-y-2">
        {/* {emails.map((email, idx) => (
          <MessageListItem
            key={idx}
            subject={email.subject}
            date={email.date}
            preview={email.preview}
          />
        ))} */}
      </ul>
    </section>
  );
}
