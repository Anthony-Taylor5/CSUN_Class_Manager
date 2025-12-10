
"use client";
import { requests, classrooms, departments, buildings } from "@/lib/placeholder-data";
import { useState, useEffect } from "react";
import type { Request, RequestStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

export default function SecretaryRequestsPage() {
  const [isClient, setIsClient] = useState(false);
  const [requestList, setRequestList] = useState<Request[]>(requests.filter(r => r.userRole === 'secretary' && r.departmentName === 'Computer Science'));
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState<Request | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOpenForm = (request: Request | null) => {
    setEditingRequest(request);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newRequestData: Partial<Request> = {
      courseCode: formData.get("courseCode") as string,
      sectionNumber: formData.get("sectionNumber") as string,
      details: formData.get("details") as string,
      requested_whiteboards: parseInt(formData.get("requested_whiteboards") as string) || undefined,
      requested_projectors: parseInt(formData.get("requested_projectors") as string) || undefined,
      requested_markers: parseInt(formData.get("requested_markers") as string) || undefined,
      requested_desks: parseInt(formData.get("requested_desks") as string) || undefined,
      preferred_building_id: formData.get("preferred_building_id") as string || undefined,
      // Time inputs would need more complex handling
    };

    if (editingRequest) {
      const updatedRequest = { ...editingRequest, ...newRequestData };
      setRequestList(requestList.map(r => r.id === editingRequest.id ? updatedRequest : r));
      toast({ title: "Request Updated", description: "Your request has been successfully updated." });
    } else {
      const newRequest: Request = {
        id: `req_${Date.now()}`,
        userName: "Diana Miller", // Assuming current user
        userRole: "secretary",
        departmentName: "Computer Science", // Assuming current user's department
        requestType: "New Class",
        status: "pending",
        timestamp: new Date().toISOString(),
        ...newRequestData,
      } as Request;
      setRequestList([newRequest, ...requestList]);
      toast({ title: "Request Submitted", description: "Your new request has been submitted for approval." });
    }
    
    setIsFormOpen(false);
    setEditingRequest(null);
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
  
  const RequestForm = ({ request }: { request: Request | null }) => (
    <DialogContent className="sm:max-w-3xl">
      <form onSubmit={handleFormSubmit}>
        <DialogHeader>
          <DialogTitle>{request ? 'Edit Request' : 'Create New Request'}</DialogTitle>
          <DialogDescription>
            {request ? 'Update the details of your request.' : 'Fill out the form to submit a new request for your department.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="courseCode" className="text-right">Class Number</Label>
            <Input id="courseCode" name="courseCode" defaultValue={request?.courseCode} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sectionNumber" className="text-right">Section Number</Label>
            <Input id="sectionNumber" name="sectionNumber" defaultValue={request?.sectionNumber} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="details" className="text-right pt-2">Details</Label>
            <Textarea id="details" name="details" defaultValue={request?.details} className="col-span-3" />
          </div>
          <h4 className="font-semibold text-muted-foreground mt-4 col-span-4">Optional Equipment</h4>
          <div className="grid grid-cols-2 gap-4 col-span-4">
             <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="requested_whiteboards" className="text-right">Whiteboards</Label>
                <Input id="requested_whiteboards" name="requested_whiteboards" type="number" defaultValue={request?.requested_whiteboards} />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="requested_projectors" className="text-right">Projectors</Label>
                <Input id="requested_projectors" name="requested_projectors" type="number" defaultValue={request?.requested_projectors} />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="requested_markers" className="text-right">Markers</Label>
                <Input id="requested_markers" name="requested_markers" type="number" defaultValue={request?.requested_markers} />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="requested_desks" className="text-right">Desks</Label>
                <Input id="requested_desks" name="requested_desks" type="number" defaultValue={request?.requested_desks} />
            </div>
          </div>
          <h4 className="font-semibold text-muted-foreground mt-4 col-span-4">Optional Preferences</h4>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="preferred_building_id" className="text-right">Building</Label>
            <select id="preferred_building_id" name="preferred_building_id" defaultValue={request?.preferred_building_id} className="col-span-3 p-2 border rounded-md">
                <option value="">Any</option>
                {buildings.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Time</Label>
            <div className="col-span-3 grid grid-cols-2 gap-2">
                <Input id="preferred_start" name="preferred_start" type="time" defaultValue={request?.preferred_start ? new Date(request.preferred_start).toTimeString().slice(0,5) : ''} />
                <Input id="preferred_end" name="preferred_end" type="time" defaultValue={request?.preferred_end ? new Date(request.preferred_end).toTimeString().slice(0,5) : ''} />
            </div>
          </div>

        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Cancel</Button>
          </DialogClose>
          <Button type="submit">{request ? 'Save Changes' : 'Submit Request'}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <h1 className="text-3xl font-headline font-bold">Your Department's Requests</h1>
                <p className="text-muted-foreground">
                Manage and create requests for your department.
                </p>
            </div>
            <DialogTrigger asChild>
                <Button onClick={() => handleOpenForm(null)}>Add Request</Button>
            </DialogTrigger>
        </div>

        <div className="border rounded-lg">
          <div className="p-6">
            <h2 className="text-2xl font-semibold">Submitted Requests</h2>
            <p className="text-sm text-muted-foreground">
              A list of requests from your department.
            </p>
          </div>
          <div className="p-6 pt-0 overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Request ID</th>
                  <th className="text-left p-4">Department</th>
                  <th className="text-left p-4">Course</th>
                  <th className="text-left p-4">Section</th>
                  <th className="text-left p-4">Classroom</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-right p-4">Whiteboards</th>
                  <th className="text-right p-4">Projectors</th>
                  <th className="text-right p-4">Markers</th>
                  <th className="text-right p-4">Desks</th>
                  <th className="text-left p-4">Preferred Bldg</th>
                  <th className="text-left p-4">Preferred Time</th>
                  <th className="p-4">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {requestList.map((request) => (
                  <tr key={request.id} className="border-b">
                    <td className="p-4 font-mono text-xs">{request.id}</td>
                    <td className="p-4">{request.departmentName}</td>
                    <td className="p-4">{request.courseCode}</td>
                    <td className="p-4">{request.sectionNumber}</td>
                    <td className="p-4">{classrooms.find(c => c.id === request.classroomId)?.name || '—'}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusBadge(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">{request.requested_whiteboards || '—'}</td>
                    <td className="p-4 text-right">{request.requested_projectors || '—'}</td>
                    <td className="p-4 text-right">{request.requested_markers || '—'}</td>
                    <td className="p-4 text-right">{request.requested_desks || '—'}</td>
                    <td className="p-4">{buildings.find(b => b.id === request.preferred_building_id)?.name || '—'}</td>
                    <td className="p-4">
                      {isClient && request.preferred_start && request.preferred_end ? 
                       `${new Date(request.preferred_start).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'})} - ${new Date(request.preferred_end).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'})}`
                      : '—'}
                    </td>
                    <td className="p-4 flex gap-2 justify-end">
                      <Button variant="outline" size="sm" onClick={() => handleOpenForm(request)}>Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <RequestForm request={editingRequest} />
    </Dialog>
  );
}
