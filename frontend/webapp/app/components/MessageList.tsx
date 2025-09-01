import MessageListItem from "./MessageListItem";

export default function MessageList() {
  return (
    <section className="w-full md:w-1/3 bg-gray-100 p-4 overflow-y-auto border-r">
      <h2 className="text-lg font-bold mb-4">Messages</h2>
      <ul className="space-y-2">
        <MessageListItem
          subject="Welcome to OutlookMaster"
          date="Today"
          preview="This is your first message preview."
        />
        <MessageListItem
          subject="AI Integration Ready"
          date="Yesterday"
          preview="Try sending an email with AI assistance!"
        />
      </ul>
    </section>
  );
}
