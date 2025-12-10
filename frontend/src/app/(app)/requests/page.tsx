
"use client";
import { requests, classrooms, departments } from "@/lib/placeholder-data";
import { useState, useEffect } from "react";
import type { Request, RequestStatus } from "@/lib/types";

export default function RequestsPage() {
  const [isClient, setIsClient] = useState(false);
  const [requestList, setRequestList] = useState<Request[]>(requests);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleStatusChange = (requestId: string, newStatus: RequestStatus) => {
    setRequestList(
      requestList.map((req) =>
        req.id === requestId ? { ...req, status: newStatus } : req
      )
    );
  };

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "approved":
        return "bg-green-200 text-green-800";
      case "denied":
        return "bg-red-200 text-red-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-headline font-bold">User Requests</h1>
        <p className="text-muted-foreground">
          Manage and respond to user-submitted requests.
        </p>
      </div>

      <div className="border rounded-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold">Pending & Recent Requests</h2>
          <p className="text-sm text-muted-foreground">
            A list of requests from users across the system.
          </p>
        </div>
        <div className="p-6 pt-0 overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Request ID</th>
                <th className="text-left p-4">User</th>
                <th className="text-left p-4">Department</th>
                <th className="text-left p-4">Course</th>
                <th className="text-left p-4">Section</th>
                <th className="text-left p-4">Classroom</th>
                <th className="text-left p-4">Details</th>
                <th className="text-left p-4">Timestamp</th>
                <th className="text-center p-4">Status</th>
                <th className="p-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {requestList.map((request) => (
                <tr key={request.id} className="border-b">
                   <td className="p-4 font-mono text-xs">{request.id}</td>
                  <td className="p-4">
                    <div className="font-medium">{request.userName}</div>
                    <div className="text-sm text-muted-foreground capitalize">{request.userRole}</div>
                  </td>
                  <td className="p-4">{request.departmentName}</td>
                  <td className="p-4">{request.courseCode}</td>
                  <td className="p-4">{request.sectionNumber}</td>
                  <td className="p-4">{classrooms.find(c => c.id === request.classroomId)?.name}</td>
                  <td className="p-4 max-w-sm">{request.details}</td>
                  <td className="p-4">
                    {isClient ? new Date(request.timestamp).toLocaleString() : ""}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusBadge(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2 justify-end">
                    {request.status === "pending" && (
                      <>
                        <button 
                          className="px-3 py-1 bg-green-500 text-white rounded-md text-sm"
                          onClick={() => handleStatusChange(request.id, 'approved')}
                        >
                          Approve
                        </button>
                        <button 
                          className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
                          onClick={() => handleStatusChange(request.id, 'denied')}
                        >
                          Deny
                        </button>
                      </>
                    )}
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
