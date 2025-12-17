'use client';

import { useState } from 'react';
import { getApiUrl } from '../../lib/api';

import { useRouter } from 'next/navigation'; // Re-add import

export default function BookingForm({ roomId, price }: { roomId: number, price: number }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        try {
            const res = await fetch(`${getApiUrl()}/reservations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    startDate: new Date(startDate).toISOString(),
                    endDate: new Date(endDate).toISOString(),
                    roomId: roomId,
                }),
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg || 'Booking failed');
            }

            alert('Booking Confirmed!');
            router.push('/');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = () => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays * price;
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-premium border border-border sticky top-24">
            <h3 className="text-xl font-bold mb-4 text-secondary">Book This Room</h3>
            <div className="text-2xl font-bold text-primary mb-6">${price} <span className="text-sm font-normal text-text-muted">/ night</span></div>

            {error && <div className="text-red-700 bg-red-50 p-3 rounded-lg mb-4 text-sm">{error}</div>}

            <form onSubmit={handleBooking} className="space-y-4">
                <div>
                    <label htmlFor="startDate" className="block font-medium mb-2 text-sm">Check-in</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        className="w-full p-2.5 border border-border rounded-lg outline-none focus:border-primary transition-colors"
                    />
                </div>
                <div>
                    <label htmlFor="endDate" className="block font-medium mb-2 text-sm">Check-out</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        min={startDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        className="w-full p-2.5 border border-border rounded-lg outline-none focus:border-primary transition-colors"
                    />
                </div>

                {startDate && endDate && (
                    <div className="border-t border-border pt-4 mt-6 flex justify-between items-center text-lg font-semibold">
                        <span>Total:</span>
                        <span className="text-primary-dark">${calculateTotal()}</span>
                    </div>
                )}

                <button type="submit" className="btn btn-primary w-full mt-4" disabled={loading}>
                    {loading ? 'Processing...' : 'Confirm Booking'}
                </button>
            </form>
        </div>
    );
}
