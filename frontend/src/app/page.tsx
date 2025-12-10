

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center">
      <Image
        src="/images/csun_lawn.jpg"
        alt="CSUN Oviatt Lawn"
        fill
        className="object-cover"
        data-ai-hint="CSUN Oviatt Lawn"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex flex-col items-center gap-6 p-4 text-white">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline" style={{ color: 'hsla(210, 78%, 63%, 1.00)' }}>
              CSUN Classroom Manager
            </h1>
            <p className="mx-auto max-w-[700px] text-lg md:text-xl" style={{ color: 'hsla(210, 65%, 63%, 1.00)' }}>
              Streamlining university scheduling and resource management.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
                <Link href="/student/schedule">
                    Continue as Student
                </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
                <Link href="/login">
                    Admin/Secretary Login
                </Link>
            </Button>
          </div>
      </div>
    </div>
  );
}
