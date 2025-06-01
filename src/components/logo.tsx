import Image from 'next/image';

export default function Logo() {
  return (
    <Image
      src="https://vivenzaexpo.es/wp-content/uploads/2025/02/Logo-Vivenza-RGB-274x42.png"
      alt="Vivenza Logo"
      width={163} 
      height={25} 
      className="h-auto max-w-full"
      priority
      data-ai-hint="company logo"
    />
  );
}
