import { StatusBadge } from "./StatusBadge";
import { ActionButton } from "./ActionButton";
import { Button } from "@/components/ui/button";

interface TruckData {
  id: number;
  truckNo: string;
  licenseExpiry: string;
  status: "Active" | "Inactive";
  expiryStatus: "urgent" | "upcoming" | "safe";
}

const sampleData: TruckData[] = [
  { id: 1, truckNo: "BR.RJD.9086", licenseExpiry: "04/07/2026", status: "Active", expiryStatus: "safe" },
  { id: 2, truckNo: "BR.RJD.9086", licenseExpiry: "04/07/2026", status: "Active", expiryStatus: "safe" },
  { id: 3, truckNo: "BR.RJD.9086", licenseExpiry: "04/07/2026", status: "Inactive", expiryStatus: "safe" },
  { id: 4, truckNo: "BR.RJD.9086", licenseExpiry: "04/07/2026", status: "Active", expiryStatus: "safe" },
  { id: 5, truckNo: "BR.RJD.9086", licenseExpiry: "04/07/2026", status: "Active", expiryStatus: "safe" },
  { id: 6, truckNo: "BR.RJD.9086", licenseExpiry: "04/07/2026", status: "Inactive", expiryStatus: "safe" },
  { id: 7, truckNo: "BR.RJD.9086", licenseExpiry: "04/07/2026", status: "Active", expiryStatus: "upcoming" },
  { id: 8, truckNo: "BR.RJD.9086", licenseExpiry: "04/07/2026", status: "Active", expiryStatus: "safe" },
  { id: 9, truckNo: "BR.RJD.9086", licenseExpiry: "04/07/2026", status: "Active", expiryStatus: "safe" },
  { id: 10, truckNo: "BR.RJD.9086", licenseExpiry: "04/07/2026", status: "Inactive", expiryStatus: "safe" },
  { id: 11, truckNo: "BR.RJD.9086", licenseExpiry: "04/07/2026", status: "Inactive", expiryStatus: "safe" },
  { id: 12, truckNo: "BR.RJD.9086", licenseExpiry: "04/07/2026", status: "Active", expiryStatus: "safe" },
  { id: 13, truckNo: "BR.RJD.9086", licenseExpiry: "04/07/2026", status: "Active", expiryStatus: "safe" },
  { id: 14, truckNo: "BR.RJD.9086", licenseExpiry: "04/07/2026", status: "Active", expiryStatus: "safe" },
  { id: 15, truckNo: "BR.RJD.9086", licenseExpiry: "04/07/2026", status: "Active", expiryStatus: "safe" },
];

export const DataTable = () => {
  const getExpiryColor = (expiryStatus: string, date: string) => {
    if (expiryStatus === "upcoming") return "text-status-upcoming";
    if (expiryStatus === "safe") return "text-status-safe";
    return "text-foreground";
  };

  return (
    <div className="bg-sidebar-bg rounded-lg border border-table-border overflow-hidden">
      {/* Table Header */}
      <div className="bg-table-header border-b border-table-border px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">All Details</h2>
        <Button className="bg-status-safe hover:bg-status-safe/90 text-status-active-foreground">
          Import via Excel
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-table-border">
              <th className="text-left py-3 px-6 text-sm font-medium text-sidebar-text-muted">S NO.</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-sidebar-text-muted">TRUCK NO.</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-sidebar-text-muted">LICENSE EXPIRY</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-sidebar-text-muted">STATUS</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-sidebar-text-muted">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((item) => (
              <tr key={item.id} className="border-b border-table-border hover:bg-sidebar-hover/50">
                <td className="py-3 px-6 text-sm text-foreground">{item.id}</td>
                <td className="py-3 px-6 text-sm text-foreground">{item.truckNo}</td>
                <td className={`py-3 px-6 text-sm ${getExpiryColor(item.expiryStatus, item.licenseExpiry)}`}>
                  {item.licenseExpiry}
                </td>
                <td className="py-3 px-6">
                  <StatusBadge status={item.status} />
                </td>
                <td className="py-3 px-6">
                  <ActionButton 
                    action={item.status === "Active" ? "Inactive" : "Active"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend and Pagination */}
      <div className="px-6 py-4 border-t border-table-border flex items-center justify-between">
        {/* Legend */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-urgent"></div>
            <span className="text-sidebar-text-muted">0-30 days left (Urgent)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-upcoming"></div>
            <span className="text-sidebar-text-muted">30-60 days left (Upcoming)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-safe"></div>
            <span className="text-sidebar-text-muted">60-90 days left (Safe)</span>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="w-8 h-8 p-0">
            1
          </Button>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-primary text-primary-foreground">
            2
          </Button>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0">
            3
          </Button>
          <span className="text-sidebar-text-muted">...</span>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0">
            10
          </Button>
        </div>
      </div>
    </div>
  );
};