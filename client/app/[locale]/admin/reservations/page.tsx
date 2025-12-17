'use client';

import { useEffect, useState } from 'react';
import { getApiUrl } from '../../../lib/api';

export default function AdminReservationsPage() {
    const [reservations, setReservations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservations = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const res = await fetch(`${getApiUrl()}/reservations`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setReservations(data);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchReservations();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-secondary mb-8">All Reservations</h2>

            <div className="bg-surface rounded-lg shadow-premium overflow-hidden border border-border">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-left">
                            <th className="p-4 font-semibold border-b border-border">ID</th>
                            <th className="p-4 font-semibold border-b border-border">User</th>
                            <th className="p-4 font-semibold border-b border-border">Room</th>
                            <th className="p-4 font-semibold border-b border-border">Dates</th>
                            <th className="p-4 font-semibold border-b border-border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((res: any) => (
                            <tr key={res.id} className="border-b border-border last:border-0 hover:bg-gray-50">
                                <td className="p-4 text-text-muted">#{res.id}</td>
                                <td className="p-4 font-medium">{res.user?.email || 'Unknown'}</td>
                                <td className="p-4">Room {res.room?.number || 'N/A'}</td>
                                <td className="p-4 text-sm">
                                    {new Date(res.startDate).toLocaleDateString()} - {new Date(res.endDate).toLocaleDateString()}
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                        ${res.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                                            res.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}
                                    `}>
                                        {res.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
