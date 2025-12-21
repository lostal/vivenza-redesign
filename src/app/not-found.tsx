import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center">
                <div className="mb-6">
                    <h1 className="text-8xl font-headline font-bold text-primary mb-4">404</h1>
                    <h2 className="text-2xl font-headline font-semibold text-foreground mb-2">
                        Página no encontrada
                    </h2>
                    <p className="text-muted-foreground">
                        La página que buscas no existe o ha sido movida.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild className="gap-2">
                        <Link href="/">
                            <Home className="w-4 h-4" />
                            Ir al inicio
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="gap-2">
                        <Link href="/contact">
                            <Search className="w-4 h-4" />
                            Contactar
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
