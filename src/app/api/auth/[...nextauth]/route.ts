import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user) return null;

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordValid) return null;

                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email,
                };
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (session?.user) {
                // @ts-ignore
                session.user.id = token.sub; // Додаємо ID користувача в сесію
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth', // Створимо цю сторінку
    }
});

export { handler as GET, handler as POST };