"use client";

import { useState } from "react";
import { Terminal } from "lucide-react";
import { GeneratorForm } from "@/components/generator-form";
import { FileViewer } from "@/components/file-viewer";

export default function Home() {
  const [generatedContent, setGeneratedContent] = useState<string>("");

  const handleGenerate = async (prompt: string) => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to generate code");
      }

      const data = await response.json();
      setGeneratedContent(data.content);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-8 sm:p-20 font-sans">
      <main className="flex flex-col gap-8 items-center w-full max-w-4xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-full">
            <Terminal className="w-8 h-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            AI .gitignore Generator
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl">
            Describe your project in plain English, and we'll generate the perfect .gitignore file for you.
          </p>
        </div>

        <GeneratorForm onGenerate={handleGenerate} />

        {generatedContent && (
          <div className="w-full flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <FileViewer content={generatedContent} />
          </div>
        )}
      </main>
    </div>
  );
}
