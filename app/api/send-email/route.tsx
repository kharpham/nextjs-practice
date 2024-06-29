import WelcomeTemplate from '@/emails/Welcome';
import { NextResponse } from 'next/server';
import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: 'khar22102003@gmail.com',
        subject: 'Congratulations',
        react: <WelcomeTemplate name='Kha'/>
    });
    return NextResponse.json({});
}