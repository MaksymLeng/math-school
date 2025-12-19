'use server'

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

// Реєстрація
export async function registerUser(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password || !name) {
        return { error: "Заповніть всі поля" };
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return { error: "Такий email вже існує" };

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: { name, email, password: hashedPassword }
    });

    return { success: true };
}

export async function saveTestResult(testId: number, score: number, userId: string, gradeId: number) {
    await prisma.result.create({
        data: {
            score,
            testId,
            userId: parseInt(userId),
        }
    });

    revalidatePath(`/grade/${gradeId}`);
}