'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function saveTestResult(testId: number, score: number, userName: string, gradeId: number) {
    await prisma.result.create({
        data: {
            testId,
            score,
            userName
        }
    });

    revalidatePath(`/grade/${gradeId}`);
}