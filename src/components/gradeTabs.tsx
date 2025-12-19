'use client';

import { useState } from 'react';
import Link from 'next/link';

// Описываем типы данных, которые приходят из Prisma
type Props = {
    materials: {
        id: number;
        title: string;
        content: string;
    }[];
    tests: {
        id: number;
        title: string;
        results: {
            id: number;
            score: number;
            user: { name: string | null }; // Теперь берем имя из связи с User
        }[];
    }[];
};

export default function GradeTabs({ materials, tests }: Props) {
    const [activeTab, setActiveTab] = useState<'materials' | 'tests'>('materials');

    return (
        <div>
            {/* --- Переключатель Вкладок --- */}
            <div className="flex justify-center mb-8">
                <div className="bg-slate-100 p-1 rounded-full inline-flex border border-slate-200">
                    <button
                        onClick={() => setActiveTab('materials')}
                        className={`px-8 py-3 rounded-full font-bold transition-all duration-200 ${
                            activeTab === 'materials'
                                ? 'bg-white text-blue-600 shadow-md'
                                : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        📖 Уроки
                    </button>
                    <button
                        onClick={() => setActiveTab('tests')}
                        className={`px-8 py-3 rounded-full font-bold transition-all duration-200 ${
                            activeTab === 'tests'
                                ? 'bg-white text-yellow-600 shadow-md'
                                : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        🚀 Тесты
                    </button>
                </div>
            </div>

            {/* --- Контент: МАТЕРИАЛЫ --- */}
            {activeTab === 'materials' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {materials.length > 0 ? (
                        materials.map((m) => (
                            <div key={m.id} className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition">
                                <h3 className="text-xl font-bold text-blue-900 mb-2">{m.title}</h3>
                                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{m.content}</p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-slate-400">
                            <p>Материалов пока нет 📚</p>
                        </div>
                    )}
                </div>
            )}

            {/* --- Контент: ТЕСТЫ --- */}
            {activeTab === 'tests' && (
                <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {tests.length > 0 ? (
                        tests.map((test) => (
                            <div key={test.id} className="flex flex-col gap-4">
                                <div className="bg-yellow-50 p-6 rounded-2xl border-2 border-yellow-400 shadow-lg text-center">
                                    <h3 className="font-bold text-xl mb-2 text-yellow-900">{test.title}</h3>
                                    <p className="text-sm text-yellow-700 mb-4">Перевір свої знання!</p>
                                    <Link
                                        href={`/grade/test/${test.id}`} // Обратите внимание на путь
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
                              <span
                                  className={`
                                w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold text-white
                                ${
                                      idx === 0
                                          ? 'bg-yellow-400'
                                          : idx === 1
                                              ? 'bg-gray-400'
                                              : idx === 2
                                                  ? 'bg-orange-400'
                                                  : 'bg-slate-200 text-slate-500'
                                  }
                              `}
                              >
                                {idx + 1}
                              </span>
                                                        <span className="truncate max-w-[120px] font-medium text-slate-700">
                                {res.user?.name || 'Анонім'}
                              </span>
                                                    </td>
                                                    <td className="p-2 text-right font-bold text-blue-600">{res.score}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-slate-400">
                            <p>Тестов пока нет 🤷‍♂️</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}