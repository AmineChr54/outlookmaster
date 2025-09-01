export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r flex flex-col p-4 gap-4">
      <nav className="flex flex-col gap-2">
        <button className="text-left px-3 py-2 rounded hover:bg-blue-100 font-medium text-black">Inbox</button>
        <button className="text-left px-3 py-2 rounded hover:bg-blue-100 font-medium text-black">Sent</button>
        <button className="text-left px-3 py-2 rounded hover:bg-blue-100 font-medium text-black">Drafts</button>
        <button className="text-left px-3 py-2 rounded hover:bg-blue-100 font-medium text-black">Spam</button>
      </nav>
      <div className="mt-auto">
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold">New Message</button>
      </div>
    </aside>
  );
} 