'use client';

import { useState } from 'react';
import { saveTestResult } from '@/app/actions'; // Переконайтесь, що шлях вірний
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

type Props = {
    test: {
        id: number;
        title: string;
        gradeId: number;
        questions: {
            id: number;
            text: string;
            options: string;
            correctAnswer: string;
        }[];
    }
}

export default function TestInterface({ test }: Props) {
    const router = useRouter();
    const { data: session } = useSession(); // Отримуємо користувача

    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

    const handleSelect = (questionId: number, value: string) => {
        if (isFinished) return;
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const finishTest = async () => {
        let correctCount = 0;
        test.questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) {
                correctCount++;
            }
        });

        const finalScore = Math.round((correctCount / test.questions.length) * 100);
        setScore(finalScore);
        setIsFinished(true);

        // Автоматичне збереження, якщо користувач увійшов
        if (session?.user) {
            setIsSaving(true);
            // @ts-ignore
            await saveTestResult(test.id, finalScore, session.user.id, test.gradeId);
            setIsSaving(false);
        }
    };

    if (isFinished) {
        return (
            <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl mt-10 border-2 border-blue-100 text-center">
                <h2 className="text-3xl font-bold mb-4 text-slate-800">Тест завершено! 🎉</h2>
                <div className="text-6xl font-black text-blue-600 mb-6">{score} <span className="text-2xl text-gray-400">балів</span></div>

                {!session ? (
                    <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                        <p className="text-yellow-800 mb-2">Увійди в акаунт, щоб зберегти результат!</p>
                        <Link href="/api/auth/signin" className="text-blue-600 font-bold underline">Увійти</Link>
                    </div>
                ) : (
                    <p className="text-green-600 font-bold mb-6 text-lg">Результат збережено для {session.user?.name}!</p>
                )}

                <button
                    onClick={() => router.push(`/grade/${test.gradeId}`)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition"
                >
                    Повернутися до уроків
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto pb-20">
            <h1 className="text-2xl font-bold text-center mb-8 text-slate-700">{test.title}</h1>

            <div className="space-y-6">
                {test.questions.map((q, index) => (
                    <div key={q.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h3 className="font-semibold text-lg mb-4 text-slate-800">
                            <span className="text-blue-500 mr-2">{index + 1}.</span>
                            {q.text}
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {q.options.split(',').map(opt => {
                                const isSelected = answers[q.id] === opt;
                                return (
                                    <button
                                        key={opt}
                                        onClick={() => handleSelect(q.id, opt)}
                                        className={`
                      py-3 px-4 rounded-lg font-medium transition border-2
                      ${isSelected
                                            ? 'bg-blue-100 border-blue-500 text-blue-700'
                                            : 'bg-gray-50 border-transparent hover:bg-gray-100 text-gray-600'}
                    `}
                                    >
                                        {opt}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 text-center">
                <button
                    onClick={finishTest}
                    disabled={Object.keys(answers).length !== test.questions.length}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xl font-bold py-4 px-12 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                    Завершити тест
                </button>
                {Object.keys(answers).length !== test.questions.length && (
                    <p className="mt-3 text-sm text-red-400">Дай відповідь на всі питання!</p>
                )}
            </div>
        </div>
    );
}