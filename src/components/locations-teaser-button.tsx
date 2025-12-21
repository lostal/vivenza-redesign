'use client';

import { Button } from '@/components/ui/button';
import { Link } from '@/navigation'; // Use the locale-aware Link
import { ArrowRight } from 'lucide-react';

interface LocationsTeaserButtonProps {
  buttonText: string;
}

export default function LocationsTeaserButton({ buttonText }: LocationsTeaserButtonProps) {
  return (
    <Button asChild size="lg" variant="default">
      <Link href="/locations">
        {buttonText} <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </Button>
  );
}
