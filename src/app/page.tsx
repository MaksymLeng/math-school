import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function Home() {
    const grades = await prisma.grade.findMany({ orderBy: { number: 'asc' } });

    const colors = [
        "bg-red-100 border-red-300 text-red-800 hover:bg-red-200",
        "bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200",
        "bg-green-100 border-green-300 text-green-800 hover:bg-green-200",
        "bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200",
    ];

    return (
        <main className="min-h-screen p-8 bg-slate-50">
            <h1 className="text-5xl font-extrabold text-center mb-12 text-slate-800 tracking-tight">
                Математична Школа 🎓
            </h1>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {grades.map((grade, index) => (
                    <Link
                        key={grade.id}
                        href={`/grade/${grade.id}`}
                        className={`
              block p-12 rounded-3xl shadow-lg border-b-8 transition-all active:border-b-0 active:translate-y-2
              ${colors[index % colors.length]}
            `}
                    >
                        <div className="flex flex-col items-center justify-center h-full">
                            <span className="text-6xl font-black mb-4">{grade.number}</span>
                            <span className="text-2xl font-bold uppercase tracking-widest">Клас</span>
                            <div className="mt-6 px-4 py-2 bg-white/50 rounded-full text-sm font-semibold">
                                Натисни, щоб вчитися
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
