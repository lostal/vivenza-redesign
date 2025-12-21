import { cn } from '@/lib/utils';

interface SectionTitleProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export default function SectionTitle({ icon, title, description, className }: SectionTitleProps) {
  return (
    <div className={cn('mb-8 md:mb-12 text-center', className)}>
      {icon && <div className="flex justify-center mb-3">{icon}</div>}
      <h2 className="font-headline text-3xl md:text-4xl font-semibold text-foreground">{title}</h2>
      {description && (
        <p className="mt-3 max-w-2xl mx-auto text-base text-muted-foreground px-4">{description}</p>
      )}
    </div>
  );
}
