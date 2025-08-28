import { Search, Bell, User } from "lucide-react";

export const Header = () => {
  return (
    <header className="h-16 bg-sidebar-bg border-b border-table-border flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sidebar-text-muted" size={16} />
          <input
            type="text"
            placeholder="Search Anything"
            className="w-full pl-10 pr-4 py-2 text-sm bg-background border border-table-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell className="text-sidebar-text-muted hover:text-sidebar-text" size={20} />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-status-urgent rounded-full"></div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="text-primary-foreground" size={16} />
          </div>
          <span className="text-sm font-medium text-sidebar-text">Profile</span>
        </div>
      </div>
    </header>
  );
};