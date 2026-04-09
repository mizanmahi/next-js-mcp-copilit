import { NextResponse } from 'next/server';

type RefineRequest = {
    message?: string;
};

const SYSTEM_PROMPT =
    'You are an assistant improving portfolio contact messages. Keep the original intent, make it concise and professional, and suggest a short subject line.';

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as RefineRequest;
        const message = body.message?.trim();

        if (!message) {
            return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
        }

        const apiKey = process.env.ANTHROPIC_API_KEY;

        if (!apiKey) {
            return NextResponse.json({
                refined: message,
                suggestion: 'Portfolio collaboration request',
            });
        }

        const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-latest',
                max_tokens: 400,
                system: SYSTEM_PROMPT,
                messages: [
                    {
                        role: 'user',
                        content: `Improve this contact message and return JSON with keys refined and suggestion:\n\n${message}`,
                    },
                ],
            }),
        });

        if (!anthropicResponse.ok) {
            const errorText = await anthropicResponse.text();
            return NextResponse.json({ error: `Anthropic API error: ${errorText}` }, { status: 502 });
        }

        const result = (await anthropicResponse.json()) as {
            content?: Array<{ type: string; text?: string }>;
        };

        const rawText = result.content?.find((item) => item.type === 'text')?.text;

        if (!rawText) {
            return NextResponse.json(
                {
                    refined: message,
                    suggestion: 'Portfolio collaboration request',
                },
                { status: 200 },
            );
        }

        const cleaned = rawText.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();

        try {
            const parsed = JSON.parse(cleaned) as { refined?: string; suggestion?: string };
            return NextResponse.json({
                refined: parsed.refined?.trim() || message,
                suggestion: parsed.suggestion?.trim() || 'Portfolio collaboration request',
            });
        } catch {
            return NextResponse.json({
                refined: rawText.trim(),
                suggestion: 'Portfolio collaboration request',
            });
        }
    } catch {
        return NextResponse.json({ error: 'Unable to refine message right now.' }, { status: 500 });
    }
}
