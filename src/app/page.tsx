import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth"; // Імпорт сесії
// Імпортуйте опції auth, якщо вони в окремому файлі, або використовуйте клієнтський компонент

export default async function Home() {
    const session = await getServerSession(); // Отримуємо сесію на сервері
    const grades = await prisma.grade.findMany({ orderBy: { number: 'asc' } });

    const colors = [
        "bg-red-100 border-red-300 text-red-800 hover:bg-red-200",
        "bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200",
        "bg-green-100 border-green-300 text-green-800 hover:bg-green-200",
        "bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200",
    ];

    return (
        <main className="min-h-screen p-8 bg-slate-50">
            {/* Хедер авторизації */}
            <div className="absolute top-5 right-5">
                {session ? (
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-slate-700">Привіт, {session.user?.name}! 👋</span>
                        <Link href="/api/auth/signout" className="text-sm text-red-500 hover:underline">Вийти</Link>
                    </div>
                ) : (
                    <Link href="/api/auth/signin" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition">
                        Увійти
                    </Link>
                )}
            </div>

            <h1 className="text-5xl font-extrabold text-center mb-12 text-slate-800 tracking-tight mt-10">
                Математична Школа 🎓
            </h1>

            {/* Решта коду без змін */}
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