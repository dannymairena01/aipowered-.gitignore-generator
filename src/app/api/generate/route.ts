import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return new Response("Prompt is required", { status: 400 });
        }

        const { text } = await generateText({
            model: openai("gpt-4o"),
            system:
                "You are an expert developer assistant. Your task is to generate a .gitignore file based on the user's description. Return ONLY the content of the .gitignore file. Do not include markdown formatting (like ```), comments, or explanations unless they are part of the .gitignore file itself (lines starting with #).",
            prompt: `Generate a .gitignore file for: ${prompt}`,
        });

        return Response.json({ content: text });
    } catch (error) {
        console.error('API Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
    }
}
