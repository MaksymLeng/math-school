import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import GradeTabs from '../../../components/gradeTabs';

export default async function GradePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const gradeId = parseInt(id);

    const grade = await prisma.grade.findUnique({
        where: { id: gradeId },
        include: {
            materials: true,
            tests: {
                include: {
                    results: {
                        orderBy: { score: 'desc' },
                        take: 5,
                        include: {
                            user: {
                                select: { name: true }
                            }
                        }
                    }
                }
            }
        }
    });

    if (!grade) return <div className="p-10 text-center">Клас не знайдено</div>;

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-slate-800 text-white shadow-lg sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 hover:text-yellow-400 transition text-sm font-bold uppercase tracking-wide">
                        <span>← На головну</span>
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">{grade.number} Клас</h1>
                    <div className="w-24"></div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto p-6 mt-6">
                <GradeTabs
                    materials={grade.materials}
                    tests={grade.tests}
                />
            </main>
        </div>
    );
}