import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "Active" | "Inactive";
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        status === "Active"
          ? "bg-status-active text-status-active-foreground"
          : "bg-status-inactive text-status-inactive-foreground",
        className
      )}
    >
      {status}
    </span>
  );
};