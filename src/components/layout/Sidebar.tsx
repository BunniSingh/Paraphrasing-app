import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  hasSubItems?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
  children?: React.ReactNode;
}

const SidebarItem = ({ 
  label, 
  icon, 
  isActive = false, 
  hasSubItems = false, 
  isExpanded = false, 
  onToggle,
  children 
}: SidebarItemProps) => {
  return (
    <div className="w-full">
      <div
        className={cn(
          "flex items-center justify-between w-full px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
          isActive
            ? "bg-sidebar-active text-sidebar-active-text"
            : "text-sidebar-text hover:bg-sidebar-hover"
        )}
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{label}</span>
        </div>
        {hasSubItems && (
          <div className="transition-transform">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
        )}
      </div>
      {hasSubItems && isExpanded && children && (
        <div className="ml-4 border-l border-sidebar-hover pl-2">
          {children}
        </div>
      )}
    </div>
  );
};

const SubItem = ({ label, isActive = false }: { label: string; isActive?: boolean }) => (
  <div
    className={cn(
      "px-3 py-1.5 text-sm cursor-pointer transition-colors",
      isActive
        ? "text-sidebar-active font-medium"
        : "text-sidebar-text-muted hover:text-sidebar-text"
    )}
  >
    {label}
  </div>
);

export const Sidebar = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["masterData"]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="w-64 h-screen bg-sidebar-bg border-r border-table-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-table-border">
        <h1 className="text-lg font-semibold text-sidebar-text">Transport</h1>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-1.5 text-sm bg-sidebar-hover border border-table-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-3 py-2">
          <div className="text-xs font-semibold text-sidebar-text-muted uppercase tracking-wider mb-2">
            MAIN
          </div>
          
          <SidebarItem label="Dashboard" />
          <SidebarItem label="User Management" />
          
          <SidebarItem
            label="Master Data"
            hasSubItems
            isExpanded={expandedSections.includes("masterData")}
            onToggle={() => toggleSection("masterData")}
          >
            <SubItem label="Truck Master" isActive />
            <SubItem label="Driver & Helper Master" />
            <SubItem label="Pump Master" />
            <SubItem label="Distributor Master" />
          </SidebarItem>

          <SidebarItem
            label="Approvals"
            hasSubItems
            isExpanded={expandedSections.includes("approvals")}
            onToggle={() => toggleSection("approvals")}
          />
          
          <SidebarItem label="Reconciliation" />
          <SidebarItem label="Zoho Books / Tally Integration" />
          <SidebarItem label="Wallet Management" />
          <SidebarItem label="Alerts & Expiry Reminders" />
          
          <SidebarItem
            label="Reports"
            hasSubItems
            isExpanded={expandedSections.includes("reports")}
            onToggle={() => toggleSection("reports")}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-table-border p-3">
        <SidebarItem label="Profile" />
        <SidebarItem label="Settings" />
        <SidebarItem label="Logout" />
      </div>
    </div>
  );
};