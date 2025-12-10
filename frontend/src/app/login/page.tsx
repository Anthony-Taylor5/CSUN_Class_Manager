
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [role, setRole] = useState<'administrator' | 'secretary'>('administrator');

  async function loginAction(formData: FormData) {
    // In a real app, you'd validate credentials
    if (role === 'administrator') {
      router.push('/classrooms');
    } else {
      router.push('/secretary/classrooms');
    }
  }

  const handleRequestAccess = () => {
    toast({
      title: "Request Sent",
      description: "Your request has been sent to the administrator.",
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Select your role and enter your credentials.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label>Role</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={role === 'administrator' ? 'default' : 'outline'}
                  onClick={() => setRole('administrator')}
                >
                  Administrator
                </Button>
                <Button
                  type="button"
                  variant={role === 'secretary' ? 'default' : 'outline'}
                  onClick={() => setRole('secretary')}
                >
                  Secretary
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <button type="button" onClick={handleRequestAccess} className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </button>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" type="button" className="w-full" onClick={handleRequestAccess}>
              Don't have an account yet? Send request to admin.
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link href="/" className="underline">
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
