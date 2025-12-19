import { prisma } from '@/lib/prisma';
import TestInterface from './TestInterface';

export default async function TestPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const testId = parseInt(resolvedParams.id);

    const test = await prisma.test.findUnique({
        where: { id: testId },
        include: { questions: true, grade: true }
    });

    if (!test) return <div className="text-center p-10">Тест не знайдено 😔</div>;

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <TestInterface test={test} />
        </div>
    );
}