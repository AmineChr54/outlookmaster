import React from "react";

interface AppHeaderProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  user: string | null;
  onLogout: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ sidebarCollapsed, setSidebarCollapsed, user, onLogout }) => (
  <header className="bg-bg text-title font-main p-4 text-xl font-bold shadow flex items-center gap-4 h-15 border-b border-border">
    {/* Main menu button */}
    <button
      className="mr-2 p-2 rounded hover:bg-accent focus:outline-none cursor-pointer"
      aria-label="Toggle sidebar"
      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
    >
      {/* Hamburger icon */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    {/* Notifications icon */}
    <button className="relative p-2  cursor-pointer rounded hover:bg-accent focus:outline-none mx-2" aria-label="Notifications">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      {/* Notification dot */}
      <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-primary"></span>
    </button>
    {/* Search bar */}
    <form className="flex-1 flex items-center max-w-md mx-4 gap-3 p-1 rounded-lg bg-field border border-border focus-within:border-primary transition-colors" onSubmit={e => e.preventDefault()}>
      <input
      type="text"
      placeholder="Search mail..."
      className="w-full px-3 py-1 rounded bg-transparent text-main text-xs placeholder:text-text-muted placeholder:text-xs focus:outline-none font-body resize-none outline-none bg-transparent"
      />
      <button type="submit" className="ml-2 p-2 rounded hover:bg-accent cursor-pointer focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none"/>
          <line x1="16.65" y1="16.65" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </form>
    {/* User info and logout */}
    <div className="ml-auto flex items-center gap-3">
      {user && (
        <>
          <span className="text-main text-sm">{user}</span>
          <button 
            onClick={onLogout} 
            className="bg-primary text-bg text-sm px-3 py-1 rounded cursor-pointer hover:bg-accent transition-colors"
          >
            Logout
          </button>
        </>
      )}
    </div>
  </header>
);

export default AppHeader;
