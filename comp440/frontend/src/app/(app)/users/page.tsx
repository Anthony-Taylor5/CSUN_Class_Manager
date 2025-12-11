
'use client';

import { useState } from 'react';
import { users as initialUsers } from '@/lib/placeholder-data';
import { User, UserRole } from '@/lib/types';
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

export default function UsersPage() {
  const [userList, setUserList] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { toast } = useToast();

  const getBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'administrator':
        return 'bg-blue-200 text-blue-800';
      case 'secretary':
        return 'bg-gray-200 text-gray-800';
      case 'student':
        return 'bg-green-200 text-green-800';
    }
  };

  const filteredUsers = userList
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => roleFilter === 'all' || user.role === roleFilter);

  const handleOpenForm = (user: User | null) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData: Omit<User, 'id' | 'avatarUrl'> = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as UserRole,
    };

    if (editingUser) {
      const updatedUser = { ...editingUser, ...userData };
      setUserList(userList.map((u) => (u.id === editingUser.id ? updatedUser : u)));
      toast({ title: 'User Updated', description: `${updatedUser.name}'s information has been updated.` });
    } else {
      const newUser: User = {
        id: `usr_${Date.now()}`,
        avatarUrl: '',
        ...userData,
      };
      setUserList([newUser, ...userList]);
      toast({ title: 'User Added', description: `${newUser.name} has been added to the system.` });
    }

    setIsFormOpen(false);
    setEditingUser(null);
  };
  
  const handleRemoveUser = (userId: string) => {
    const userToRemove = userList.find(u => u.id === userId);
    setUserList(userList.filter((u) => u.id !== userId));
    if (userToRemove) {
      toast({ title: 'User Removed', description: `${userToRemove.name} has been removed from the system.` });
    }
  };

  const UserForm = ({ user }: { user: User | null }) => (
    <DialogContent className="sm:max-w-md">
      <form onSubmit={handleFormSubmit}>
        <DialogHeader>
          <DialogTitle>{user ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogDescription>
            {user ? "Update the user's details below." : 'Fill out the form to add a new user.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" name="name" defaultValue={user?.name} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" name="email" type="email" defaultValue={user?.email} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <select
              id="role"
              name="role"
              defaultValue={user?.role}
              className="col-span-3 p-2 border rounded-md"
              required
            >
              <option value="administrator">Administrator</option>
              <option value="secretary">Secretary</option>
              <option value="student">Student</option>
            </select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">{user ? 'Save Changes' : 'Add User'}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-headline font-bold">User Management</h1>
            <p className="text-muted-foreground">Administer user accounts and permissions.</p>
          </div>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenForm(null)}>Add User</Button>
          </DialogTrigger>
        </div>

        <div className="border rounded-lg">
          <div className="p-6">
            <h2 className="text-2xl font-semibold">All Users</h2>
            <p className="text-sm text-muted-foreground">A list of all users with accounts in the system.</p>
            <div className="mt-4 flex items-center gap-4">
              <input
                type="text"
                placeholder="Search by name or email..."
                className="flex-grow p-2 border rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="p-2 border rounded"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')}
              >
                <option value="all">All Roles</option>
                <option value="administrator">Administrator</option>
                <option value="secretary">Secretary</option>
                <option value="student">Student</option>
              </select>
            </div>
          </div>
          <div className="p-6 pt-0">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Role</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="p-4 font-medium">
                      {user.name}
                    </td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full capitalize ${getBadgeVariant(user.role)}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-right flex gap-2 justify-end">
                      <Button variant="outline" size="sm" onClick={() => handleOpenForm(user)}>
                        Edit
                      </Button>
                       <Button variant="destructive" size="sm" onClick={() => handleRemoveUser(user.id)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <UserForm user={editingUser} />
    </Dialog>
  );
}
