import { Loader2 } from 'lucide-react';

export default function LocaleLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-sm text-muted-foreground">Cargando...</p>
            </div>
        </div>
    );
}
