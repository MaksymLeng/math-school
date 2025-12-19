'use client';

import { useState } from 'react';
import Link from 'next/link';

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
            user: { name: string | null };
        }[];
    }[];
};

export default function GradeTabs({ materials, tests }: Props) {
    const [activeTab, setActiveTab] = useState<'materials' | 'tests'>('materials');

    // Стан для відстеження відкритого матеріалу (null = всі закриті)
    const [expandedMaterial, setExpandedMaterial] = useState<number | null>(null);

    const toggleMaterial = (id: number) => {
        if (expandedMaterial === id) {
            setExpandedMaterial(null); // Закрити, якщо вже відкрито
        } else {
            setExpandedMaterial(id); // Відкрити нове
        }
    };

    return (
        <div>
            {/* Перемикач вкладок */}
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
                        🚀 Тести
                    </button>
                </div>
            </div>

            {/* Вкладка: МАТЕРІАЛИ (Акордеон) */}
            {activeTab === 'materials' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {materials.length > 0 ? (
                        materials.map((m) => {
                            const isOpen = expandedMaterial === m.id;
                            return (
                                <div
                                    key={m.id}
                                    onClick={() => toggleMaterial(m.id)}
                                    className={`
                                        bg-white rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
                                        ${isOpen ? 'border-blue-400 shadow-md ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-300 hover:shadow-sm'}
                                    `}
                                >
                                    {/* Заголовок картки */}
                                    <div className="p-5 flex items-center justify-between">
                                        <h3 className={`text-lg font-bold transition-colors ${isOpen ? 'text-blue-700' : 'text-slate-700'}`}>
                                            {m.title}
                                        </h3>
                                        {/* Стрілочка */}
                                        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                                                <path d="m6 9 6 6 6-6"/>
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Прихований контент */}
                                    <div
                                        className={`
                                            bg-blue-50/50 px-6 text-slate-700 leading-relaxed border-t border-blue-100 transition-all duration-300 ease-in-out
                                            ${isOpen ? 'max-h-[1000px] py-6 opacity-100' : 'max-h-0 py-0 opacity-0'}
                                        `}
                                    >
                                        <p className="whitespace-pre-wrap">{m.content}</p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-12 text-slate-400">
                            <p>Матеріалів поки немає 📚</p>
                        </div>
                    )}
                </div>
            )}
            {activeTab === 'tests' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {tests.length > 0 ? (
                        tests.map((test) => (
                            <div key={test.id} className="flex flex-col gap-4 h-full">
                                <div className="bg-yellow-50 p-6 rounded-2xl border-2 border-yellow-400 shadow-lg text-center flex-grow flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-xl mb-2 text-yellow-900">{test.title}</h3>
                                        <p className="text-sm text-yellow-700 mb-4">Перевір свої знання!</p>
                                    </div>
                                    <Link
                                        href={`/grade/test/${test.id}`}
                                        className="block w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-3 px-4 rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-md"
                                    >
                                        🚀 Почати тест
                                    </Link>
                                </div>

                                {/* Таблиця лідерів */}
                                <div className="bg-white border rounded-xl shadow-sm overflow-hidden flex-shrink-0">
                                    <div className="bg-slate-100 p-3 border-b">
                                        <h4 className="font-bold text-center text-slate-600">🏆 Дошка пошани</h4>
                                    </div>
                                    {test.results.length === 0 ? (
                                        <p className="p-4 text-center text-sm text-gray-400">Ще ніхто не проходив</p>
                                    ) : (
                                        <div className="max-h-40 overflow-y-auto"> {/* Обмеження висоти таблиці, якщо багато результатів */}
                                            <table className="w-full text-sm">
                                                <thead>
                                                <tr className="text-left text-gray-400 bg-gray-50 sticky top-0">
                                                    <th className="p-2 font-medium bg-gray-50">Ім'я</th>
                                                    <th className="p-2 font-medium text-right bg-gray-50">Бали</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {test.results.map((res, idx) => (
                                                    <tr key={res.id} className="border-t last:border-0 hover:bg-slate-50">
                                                        <td className="p-2 flex items-center gap-2">
                                                                <span className={`w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold text-white 
                                                                    ${idx === 0 ? 'bg-yellow-400' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-orange-400' : 'bg-slate-200 text-slate-500'}`}>
                                                                    {idx + 1}
                                                                </span>
                                                            <span className="truncate max-w-[120px] font-medium text-slate-700">{res.user?.name || 'Анонім'}</span>
                                                        </td>
                                                        <td className="p-2 text-right font-bold text-blue-600">{res.score}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-slate-400">
                            <p>Тестів поки немає 🤷‍♂️</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}