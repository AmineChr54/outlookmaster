import Image from "next/image";
import Sidebar from "./components/Sidebar";
import MessageList from "./components/MessageList";
import MessagePreview from "./components/MessagePreview";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-700 text-white p-4 text-xl font-bold shadow">OutlookMaster</header>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <MessageList />
          <MessagePreview />
        </main>
      </div>
    </div>
  );
}
// frontend/webapp/app/page.tsx (or wherever you render messages)
import EmailsClient from "./components/MessageList";


