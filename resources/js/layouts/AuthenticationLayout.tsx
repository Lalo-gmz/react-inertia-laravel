import { Command } from 'lucide-react';

export default function AuthenticationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 bg-background p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <Command className="size-4" />
                        </div>
                        React Inertia
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">{children}</div>
                </div>
            </div>
            <div className="relative hidden bg-primary-foreground lg:block"></div>
        </div>
    );
}
