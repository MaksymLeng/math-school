'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/app/actions';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    // Стан полів
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                // --- ЛОГІКА ВХОДУ ---
                const res = await signIn('credentials', {
                    email,
                    password,
                    redirect: false,
                });

                if (res?.error) {
                    setError('Невірний email або пароль');
                } else {
                    router.push('/'); // Перенаправлення на головну
                    router.refresh();
                }
            } else {
                // --- ЛОГІКА РЕЄСТРАЦІЇ ---
                const formData = new FormData();
                formData.append('email', email);
                formData.append('password', password);
                formData.append('name', name);

                const res = await registerUser(formData);

                if (res?.error) {
                    setError(res.error);
                } else {
                    // Якщо реєстрація успішна, автоматично входимо
                    await signIn('credentials', {
                        email,
                        password,
                        redirect: false,
                    });
                    router.push('/');
                    router.refresh();
                }
            }
        } catch (err) {
            setError('Щось пішло не так');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
                <h1 className="text-3xl font-bold text-center mb-2 text-slate-800">
                    {isLogin ? 'З поверненням! 👋' : 'Привіт! 🚀'}
                </h1>
                <p className="text-center text-slate-500 mb-8">
                    {isLogin ? 'Введи дані для входу' : 'Створи акаунт для навчання'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Твоє ім'я</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-black"
                                placeholder="Іван Петренко"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="name@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Пароль</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-black"
                            placeholder="••••••"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-lg disabled:bg-blue-300"
                    >
                        {loading ? 'Завантаження...' : (isLogin ? 'Увійти' : 'Зареєструватися')}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-600 hover:underline text-sm font-medium"
                    >
                        {isLogin ? 'Немає акаунту? Зареєструйся' : 'Вже є акаунт? Увійти'}
                    </button>
                </div>
            </div>
        </div>
    );
}