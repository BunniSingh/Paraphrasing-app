import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  action: "Active" | "Inactive";
  onClick?: () => void;
  className?: string;
}

export const ActionButton = ({ action, onClick, className }: ActionButtonProps) => {
  return (
    <Button
      size="sm"
      onClick={onClick}
      className={cn(
        "text-xs font-medium px-3 py-1 h-auto",
        action === "Active"
          ? "bg-status-active hover:bg-status-active/90 text-status-active-foreground"
          : "bg-status-inactive hover:bg-status-inactive/90 text-status-inactive-foreground",
        className
      )}
    >
      {action}
    </Button>
  );
};