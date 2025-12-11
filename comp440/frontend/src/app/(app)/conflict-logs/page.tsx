"use client";
import { conflictLogs } from "@/lib/placeholder-data";
import { useState, useEffect } from "react";

export default function ConflictLogsPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-headline font-bold">Conflict Logs</h1>
        <p className="text-muted-foreground">
          Insights into classroom utilization and scheduling.
        </p>
      </div>

       <div className="border rounded-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold">Conflict Logs</h2>
          <p className="text-sm text-muted-foreground">
            Recent scheduling conflicts and their resolution status.
          </p>
        </div>
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Timestamp</th>
                <th className="text-left p-4">Description</th>
                <th className="text-right p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {conflictLogs.map((log) => (
                <tr key={log.id} className="border-b">
                  <td className="p-4">{isClient ? new Date(log.timestamp).toLocaleString() : ''}</td>
                  <td className="p-4 font-medium">{log.description}</td>
                  <td className="p-4 text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${log.resolved ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                      {log.resolved ? "All Good" : "Blackout"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
