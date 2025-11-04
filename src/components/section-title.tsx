import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export default function SectionTitle({
  icon,
  title,
  description,
  className = '',
  titleClassName = '',
  descriptionClassName = ''
}: SectionTitleProps) {
  return (
    <div className={cn('mb-8 sm:mb-10 text-center', className)}>
      {icon && <div className="flex justify-center mb-3 sm:mb-4">{icon}</div>}
      <h2 className={cn('font-headline text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground', titleClassName)}>
        {title}
      </h2>
      {description && (
        <p className={cn('mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground px-4', descriptionClassName)}>
          {description}
        </p>
      )}
    </div>
  );
}
