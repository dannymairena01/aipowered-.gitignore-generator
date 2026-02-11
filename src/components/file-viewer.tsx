"use client";

import { Check, Copy, Download, FileCode } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FileViewerProps {
    content: string;
    className?: string;
}

export function FileViewer({ content, className }: FileViewerProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = ".gitignore";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (!content) return null;

    return (
        <div className={cn("w-full max-w-2xl rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950", className)}>
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <FileCode className="h-4 w-4" />
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">.gitignore</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className="rounded-md p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        title="Copy to clipboard"
                    >
                        {copied ? (
                            <Check className="h-4 w-4 text-green-500" />
                        ) : (
                            <Copy className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                        )}
                    </button>
                    <button
                        onClick={handleDownload}
                        className="rounded-md p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        title="Download file"
                    >
                        <Download className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto p-4">
                <pre className="text-sm font-mono text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap break-all">
                    {content}
                </pre>
            </div>
        </div>
    );
}
