import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    // only create one new PrismaClient in development, not on every rebuild
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default NextAuth({
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.TOKEN_SECRET,
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60,
    },
    debug: true,
});
