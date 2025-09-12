import React from "react";
import { Mailbox } from "./types";

interface SidebarProps {
  collapsed?: boolean;
  mailbox: Mailbox;
  setMailbox: (mb: Mailbox) => void;
}

const MAILBOXES: { key: Mailbox; label: string; icon: React.ReactNode }[] = [
  {
    key: "INBOX",
    label: "Inbox",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" /></svg>
    ),
  },
  {
    key: "[Gmail]/Sent",
    label: "Sent",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
    ),
  },
  {
    key: "[Gmail]/Drafts",
    label: "Drafts",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 18.5V9.62132C6 9.2235 6.15803 8.84197 6.43934 8.56066L10.5607 4.43934C10.842 4.15804 11.2235 4 11.6213 4H16.5C17.3284 4 18 4.67157 18 5.5V18.5C18 19.3284 17.3284 20 16.5 20H7.5C6.67157 20 6 19.3284 6 18.5Z" stroke="#fff" strokeWidth="2"></path> <path d="M6 10H10.5C11.3284 10 12 9.32843 12 8.5V4" stroke="#fff" strokeWidth="1.5"></path> </g></svg>
    ),
  },
  {
    key: "[Gmail]/Spam",
    label: "Spam",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="none" d="M0 0h24v24H0z"></path> <path fillRule="nonzero" d="M15.936 2.5L21.5 8.067v7.87L15.936 21.5h-7.87L2.5 15.936v-7.87L8.066 2.5h7.87zm-.829 2H8.894L4.501 8.895v6.213l4.393 4.394h6.213l4.394-4.394V8.894l-4.394-4.393zM11 15h2v2h-2v-2zm0-8h2v6h-2V7z" fill="#fff"></path> </g> </g></svg>
    ),
  },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, mailbox, setMailbox }) => {
  return (
  <aside className={`bg-gray-900 text-gray-200 border-r border-gray-800 flex flex-col p-4 gap-4 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <nav className="flex flex-col gap-2">
        {MAILBOXES.map((item) => (
          <button
            key={item.key}
            className={`flex items-center gap-3 px-3 py-2 rounded font-medium transition-all duration-300 cursor-pointer ${collapsed ? 'justify-center px-0' : 'text-left'} ${mailbox === item.key ? 'bg-yellow-900 text-yellow-200' : 'text-gray-200 hover:bg-yellow-800'}`}
            title={collapsed ? item.label : undefined}
            onClick={() => setMailbox(item.key)}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
      <div className="mt-auto">
        <button className={`w-full cursor-pointer bg-yellow-800 text-yellow-100 py-2 rounded hover:bg-yellow-900 font-semibold transition-all duration-300 ${collapsed ? 'px-0 flex justify-center' : ''}`} title={collapsed ? "New Message" : undefined}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          {!collapsed && <span className="ml-2">New Message</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;