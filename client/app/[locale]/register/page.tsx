'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getApiUrl } from '../../lib/api';

export default function RegisterPage() {
    const [name, setName] = useState('');
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
            const res = await fetch(`${getApiUrl()}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (!res.ok) throw new Error('Registration failed');

            const data = await res.json();
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));

            window.location.href = '/';
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
            <div className="bg-surface p-10 rounded-lg shadow-premium w-full max-w-[450px] text-center border border-border">
                <h1 className="text-3xl font-heading font-bold text-secondary mb-2">Create Account</h1>
                <p className="text-text-muted mb-8">Join us for exclusive offers and stays</p>

                {error && <div className="text-red-700 bg-red-50 p-3 rounded-lg mb-4 text-sm text-left">{error}</div>}

                <form onSubmit={handleSubmit} className="text-left space-y-4">
                    <div className="form-group">
                        <label className="block font-medium mb-2">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-2.5 border border-border rounded-lg outline-none focus:border-primary transition-colors bg-white/50"
                        />
                    </div>
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
                    <button type="submit" className="btn btn-primary w-full mt-4" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-8 text-sm text-text-muted">
                    Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
                </div>
            </div>
        </div>
    );
}
