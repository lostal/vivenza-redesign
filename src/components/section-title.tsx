import React from 'react';

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
    <div className={`mb-10 text-center ${className}`}>
      {icon && <div className="flex justify-center mb-4">{icon}</div>}
      <h2 className={`font-headline text-4xl md:text-5xl font-semibold text-foreground ${titleClassName}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 max-w-2xl mx-auto text-lg text-muted-foreground ${descriptionClassName}`}>
          {description}
        </p>
      )}
    </div>
  );
}
