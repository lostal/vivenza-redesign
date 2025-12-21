'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log to an error reporting service
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center">
                <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
                        <AlertTriangle className="w-8 h-8 text-destructive" />
                    </div>
                    <h1 className="text-2xl font-headline font-bold text-foreground mb-2">
                        Algo salió mal
                    </h1>
                    <p className="text-muted-foreground">
                        Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
                    </p>
                </div>
                <Button
                    onClick={reset}
                    className="gap-2"
                >
                    <RefreshCw className="w-4 h-4" />
                    Intentar de nuevo
                </Button>
            </div>
        </div>
    );
}
