'use client';

import { useState } from 'react';
import { departments as initialDepartments } from '@/lib/placeholder-data';
import type { Department } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function DepartmentsPage() {
  const [departmentList, setDepartmentList] = useState<Department[]>(initialDepartments);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const { toast } = useToast();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleOpenForm = (department: Department | null) => {
    setEditingDepartment(department);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const departmentData: Omit<Department, 'id'> = {
      name: formData.get('name') as string,
      head: formData.get('head') as string,
      contactInfo: formData.get('contactInfo') as string,
      budget: parseFloat(formData.get('budget') as string) || 0,
    };

    if (editingDepartment) {
      const updatedDepartment = { ...editingDepartment, ...departmentData };
      setDepartmentList(
        departmentList.map((d) => (d.id === editingDepartment.id ? updatedDepartment : d))
      );
      toast({ title: 'Department Updated', description: `${updatedDepartment.name} has been updated.` });
    } else {
      const newDepartment: Department = {
        id: `dpt_${Date.now()}`,
        ...departmentData,
      };
      setDepartmentList([newDepartment, ...departmentList]);
      toast({ title: 'Department Added', description: `${newDepartment.name} has been added.` });
    }

    setIsFormOpen(false);
    setEditingDepartment(null);
  };

  const handleRemoveDepartment = (departmentId: string) => {
    const departmentToRemove = departmentList.find((d) => d.id === departmentId);
    setDepartmentList(departmentList.filter((d) => d.id !== departmentId));
    if (departmentToRemove) {
      toast({
        variant: 'destructive',
        title: 'Department Removed',
        description: `${departmentToRemove.name} has been removed.`,
      });
    }
  };

  const DepartmentForm = ({ department }: { department: Department | null }) => (
    <DialogContent className="sm:max-w-md">
      <form onSubmit={handleFormSubmit}>
        <DialogHeader>
          <DialogTitle>{department ? 'Edit Department' : 'Add New Department'}</DialogTitle>
          <DialogDescription>
            {department ? "Update the department's details." : 'Fill out the form to add a new department.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" name="name" defaultValue={department?.name} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="head" className="text-right">Head</Label>
            <Input id="head" name="head" defaultValue={department?.head} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contactInfo" className="text-right">Contact</Label>
            <Input id="contactInfo" name="contactInfo" type="email" defaultValue={department?.contactInfo} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="budget" className="text-right">Budget</Label>
            <Input id="budget" name="budget" type="number" defaultValue={department?.budget} className="col-span-3" required />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Cancel</Button>
          </DialogClose>
          <Button type="submit">{department ? 'Save Changes' : 'Add Department'}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-headline font-bold">Departmental Management</h1>
            <p className="text-muted-foreground">
              Oversee all academic departments and their resources.
            </p>
          </div>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenForm(null)}>Add Department</Button>
          </DialogTrigger>
        </div>

        <div className="border rounded-lg">
          <div className="p-6">
            <h2 className="text-2xl font-semibold">Academic Departments</h2>
            <p className="text-sm text-muted-foreground">
              A list of all departments and their financial information.
            </p>
          </div>
          <div className="p-6 pt-0">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Department</th>
                  <th className="text-left p-4">Head</th>
                  <th className="text-left p-4">Contact</th>
                  <th className="text-right p-4">Budget</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {departmentList.map((department) => (
                  <tr key={department.id} className="border-b">
                    <td className="p-4 font-medium flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V8"/><path d="M5 12H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-3"/><path d="M20.36 9.64A5 5 0 0 0 12 5a5 5 0 0 0-8.36 4.64"/></svg>
                      </div>
                      {department.name}
                    </td>
                    <td className="p-4">{department.head}</td>
                    <td className="p-4">{department.contactInfo}</td>
                    <td className="p-4 text-right">
                      {formatCurrency(department.budget)}
                    </td>
                    <td className="p-4 flex gap-2 justify-end">
                      <Button variant="outline" size="sm" onClick={() => handleOpenForm(department)}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleRemoveDepartment(department.id)}>Remove</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
       <DepartmentForm department={editingDepartment} />
    </Dialog>
  );
}
