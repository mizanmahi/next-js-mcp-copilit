import { NextResponse } from 'next/server';

type ContactPayload = {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    mode?: 'chat' | 'classic';
};

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as ContactPayload;

        if (!body.message?.trim() || !body.subject?.trim()) {
            return NextResponse.json(
                { ok: false, message: 'Subject and message are required.' },
                { status: 400 },
            );
        }

        // This endpoint is ready for EmailJS, Resend, or another delivery provider.
        console.info('Portfolio contact submission', {
            name: body.name,
            email: body.email,
            subject: body.subject,
            mode: body.mode,
            message: body.message,
            receivedAt: new Date().toISOString(),
        });

        return NextResponse.json({
            ok: true,
            message: 'Message sent. Mizanur will get back to you soon.',
        });
    } catch {
        return NextResponse.json(
            { ok: false, message: 'Unable to send your message right now.' },
            { status: 500 },
        );
    }
}
