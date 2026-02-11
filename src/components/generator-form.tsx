"use client";

import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { Loader2, Sparkles } from "lucide-react";

interface GeneratorFormProps {
    onGenerate: (prompt: string) => Promise<void>;
    className?: string;
}

export function GeneratorForm({ onGenerate, className }: GeneratorFormProps) {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        const prompt = formData.get("prompt") as string;
        if (!prompt) return;

        startTransition(async () => {
            await onGenerate(prompt);
        });
    };

    return (
        <form action={handleSubmit} className={cn("w-full max-w-xl", className)}>
            <div className="relative">
                <textarea
                    name="prompt"
                    required
                    placeholder="e.g. Python project with Django, using PostgreSQL and a React frontend..."
                    className="w-full min-h-[120px] p-4 pr-12 rounded-xl border border-zinc-200 bg-white text-zinc-900 shadow-sm outline-none ring-offset-2 focus:ring-2 focus:ring-zinc-950 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:ring-zinc-300 transition-all resize-none"
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className="absolute bottom-3 right-3 p-2 rounded-lg bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 disabled:opacity-50 disabled:pointer-events-none dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 transition-colors"
                    aria-label="Generate .gitignore"
                >
                    {isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Sparkles className="w-4 h-4" />
                    )}
                </button>
            </div>
        </form>
    );
}
