'use client';

import { useState } from 'react';
import { buildings as initialBuildings } from '@/lib/placeholder-data';
import type { Building } from '@/lib/types';
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

export default function BuildingsPage() {
  const [buildingList, setBuildingList] = useState<Building[]>(initialBuildings);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState<Building | null>(null);
  const { toast } = useToast();

  const handleOpenForm = (building: Building | null) => {
    setEditingBuilding(building);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const buildingData: Omit<Building, 'id'> = {
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      roomCount: parseInt(formData.get('roomCount') as string) || 0,
    };

    if (editingBuilding) {
      const updatedBuilding = { ...editingBuilding, ...buildingData };
      setBuildingList(
        buildingList.map((b) => (b.id === editingBuilding.id ? updatedBuilding : b))
      );
      toast({ title: 'Building Updated', description: `${updatedBuilding.name} has been updated.` });
    } else {
      const newBuilding: Building = {
        id: `bld_${Date.now()}`,
        ...buildingData,
      };
      setBuildingList([newBuilding, ...buildingList]);
      toast({ title: 'Building Added', description: `${newBuilding.name} has been added.` });
    }

    setIsFormOpen(false);
    setEditingBuilding(null);
  };

  const handleRemoveBuilding = (buildingId: string) => {
    const buildingToRemove = buildingList.find((b) => b.id === buildingId);
    setBuildingList(buildingList.filter((b) => b.id !== buildingId));
    if (buildingToRemove) {
      toast({
        variant: 'destructive',
        title: 'Building Removed',
        description: `${buildingToRemove.name} has been removed.`,
      });
    }
  };

  const BuildingForm = ({ building }: { building: Building | null }) => (
    <DialogContent className="sm:max-w-md">
      <form onSubmit={handleFormSubmit}>
        <DialogHeader>
          <DialogTitle>{building ? 'Edit Building' : 'Add New Building'}</DialogTitle>
          <DialogDescription>
            {building ? "Update the building's details." : 'Fill out the form to add a new building.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" name="name" defaultValue={building?.name} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">Address</Label>
            <Input id="address" name="address" defaultValue={building?.address} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="roomCount" className="text-right">Room Count</Label>
            <Input id="roomCount" name="roomCount" type="number" defaultValue={building?.roomCount} className="col-span-3" required />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Cancel</Button>
          </DialogClose>
          <Button type="submit">{building ? 'Save Changes' : 'Add Building'}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-headline font-bold">Building Management</h1>
            <p className="text-muted-foreground">
              Manage all university buildings and their details.
            </p>
          </div>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenForm(null)}>Add Building</Button>
          </DialogTrigger>
        </div>

        <div className="border rounded-lg">
          <div className="p-6">
            <h2 className="text-2xl font-semibold">University Buildings</h2>
            <p className="text-sm text-muted-foreground">
              A list of all buildings on campus.
            </p>
          </div>
          <div className="p-6 pt-0">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Address</th>
                  <th className="text-right p-4">Room Count</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {buildingList.map((building) => (
                  <tr key={building.id} className="border-b">
                    <td className="p-4 font-medium flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="12" x2="12" y1="22" y2="4"/><path d="M12 4V2"/><path d="M12 22v-2"/></svg>
                      </div>
                      {building.name}
                    </td>
                    <td className="p-4">{building.address}</td>
                    <td className="p-4 text-right">{building.roomCount}</td>
                    <td className="p-4 flex gap-2 justify-end">
                      <Button variant="outline" size="sm" onClick={() => handleOpenForm(building)}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleRemoveBuilding(building.id)}>Remove</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <BuildingForm building={editingBuilding} />
    </Dialog>
  );
}
