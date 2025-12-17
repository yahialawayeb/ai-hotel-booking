'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getApiUrl } from '../../lib/api';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${getApiUrl()}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) throw new Error('Invalid credentials');

            const data = await res.json();
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Force a hard refresh/navigation to update Navbar state if it reads from localstorage directly
            // In a real app, use Context.
            window.location.href = '/';
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false); // Set loading to false regardless of success or failure
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
            <div className="bg-surface p-10 rounded-lg shadow-premium w-full max-w-[450px] text-center border border-border">
                <h1 className="text-3xl font-heading font-bold text-secondary mb-2">Welcome Back</h1>
                <p className="text-text-muted mb-8">Sign in to manage your reservations</p>

                {error && <div className="text-red-700 bg-red-50 p-3 rounded-lg mb-4 text-sm text-left">{error}</div>}

                <form onSubmit={handleSubmit} className="text-left space-y-6">
                    <div className="form-group">
                        <label className="block font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2.5 border border-border rounded-lg outline-none focus:border-primary transition-colors bg-white/50"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2.5 border border-border rounded-lg outline-none focus:border-primary transition-colors bg-white/50"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-sm text-text-muted">
                    Don't have an account? <Link href="/register" className="text-primary font-semibold hover:underline">Create Account</Link>
                </div>
            </div>
        </div>
    );
}
