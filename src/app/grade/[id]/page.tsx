import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function GradePage({ params }: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const gradeId = parseInt(id);

    const grade = await prisma.grade.findUnique({
        where: { id: gradeId },
        include: {
            materials: true,
            tests: {
                include: {
                    results: {
                        orderBy: { score: 'desc' },
                        take: 10 // Топ 10 результатів
                    }
                }
            }
        }
    });

    if (!grade) return <div>Клас не знайдено</div>;

    return (
        <div className="min-h-screen bg-white">
            {/* Шапка */}
            <header className="bg-slate-800 text-white p-6 shadow-md">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link href="/" className="hover:text-yellow-400 font-bold text-lg">← На головну</Link>
                    <h1 className="text-3xl font-bold">{grade.number} Клас</h1>
                    <div className="w-20"></div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-3 gap-8 mt-6">

                {/* ЛІВА КОЛОНКА: Матеріали (2/3 ширини) */}
                <div className="md:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-2">📖 Матеріали для вивчення</h2>
                        <div className="space-y-6">
                            {grade.materials.map(m => (
                                <div key={m.id} className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                    <h3 className="text-xl font-bold text-blue-900 mb-2">{m.title}</h3>
                                    <p className="text-slate-700 leading-relaxed">{m.content}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* ПРАВА КОЛОНКА: Тест та Таблиця (1/3 ширини) */}
                <div className="md:col-span-1">
                    {grade.tests.map(test => (
                        <div key={test.id} className="sticky top-6">

                            {/* Картка запуску тесту */}
                            <div className="bg-yellow-50 p-6 rounded-2xl border-2 border-yellow-400 shadow-lg text-center mb-8">
                                <h3 className="font-bold text-lg mb-2 text-yellow-900">{test.title}</h3>
                                <p className="text-sm text-yellow-700 mb-4">Перевір свої знання!</p>
                                <Link
                                    href={`/test/${test.id}`}
                                    className="block w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-3 px-4 rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-md"
                                >
                                    🚀 Почати тест
                                </Link>
                            </div>

                            {/* Таблиця рекордів */}
                            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                                <div className="bg-slate-100 p-3 border-b">
                                    <h4 className="font-bold text-center text-slate-600">🏆 Дошка пошани</h4>
                                </div>
                                {test.results.length === 0 ? (
                                    <p className="p-4 text-center text-sm text-gray-400">Ще ніхто не проходив</p>
                                ) : (
                                    <table className="w-full text-sm">
                                        <thead>
                                        <tr className="text-left text-gray-400 bg-gray-50">
                                            <th className="p-2 font-medium">Ім'я</th>
                                            <th className="p-2 font-medium text-right">Бали</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {test.results.map((res, idx) => (
                                            <tr key={res.id} className="border-t last:border-0 hover:bg-slate-50">
                                                <td className="p-2 flex items-center gap-2">
                            <span className={`
                              w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold text-white
                              ${idx === 0 ? 'bg-yellow-400' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-orange-400' : 'bg-slate-200 text-slate-500'}
                            `}>
                              {idx + 1}
                            </span>
                                                    <span className="truncate max-w-[100px]">{res.userName}</span>
                                                </td>
                                                <td className="p-2 text-right font-bold text-blue-600">{res.score}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}