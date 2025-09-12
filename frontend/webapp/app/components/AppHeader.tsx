import React from "react";

interface AppHeaderProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ sidebarCollapsed, setSidebarCollapsed }) => (
  <header className="bg-gray-900 text-white p-4 text-xl font-bold shadow flex items-center gap-4 h-15">
    {/* Main menu button */}
    <button
      className="mr-2 p-2 rounded hover:bg-blue-800 focus:outline-none cursor-pointer"
      aria-label="Toggle sidebar"
      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
    >
      {/* Hamburger icon */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    {/* Notifications icon */}
    <button className="relative p-2 rounded hover:bg-blue-800 focus:outline-none mx-2" aria-label="Notifications">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      {/* Notification dot */}
      <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-yellow-400"></span>
    </button>
    {/* Search bar */}
    <form className="flex-1 flex items-center max-w-md mx-4" onSubmit={e => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search mail..."
        className="w-full px-3 py-1 rounded bg-gray-200 text-gray-100 placeholder-gray-400 placeholder:text-xs focus:outline-none focus:ring-1 focus:ring-yellow-200"
      />
      <button type="submit" className="ml-2 p-2 rounded hover:bg-blue-800 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4-4m0 0A7 7 0 1010 17a7 7 0 007-7z" />
        </svg>
      </button>
    </form>
    {/* User avatar/profile */}
    <div className="ml-auto flex items-center">
      <img
        src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
        alt="User Avatar"
        className="h-9 w-9 rounded-full shadow-md border-2 border-yellow-400"
      />
      {/* Dropdown or user menu could go here */}
    </div>
  </header>
);

export default AppHeader;
