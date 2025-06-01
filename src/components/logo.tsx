import { Bath } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Bath className="h-7 w-7 text-primary" />
      <span className="font-headline text-2xl font-semibold text-foreground">Vivenza</span>
    </div>
  );
}
