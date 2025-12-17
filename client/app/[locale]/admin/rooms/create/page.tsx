'use client';

import { useState } from 'react';
import { getApiUrl } from '../../../../lib/api';

import { useRouter } from 'next/navigation'; // Re-add import

export default function CreateRoomPage() {
    const [formData, setFormData] = useState({
        number: '',
        type: '',
        price: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('token');
        if (!token) {
            // Handle auth error
            return;
        }

        try {
            const res = await fetch(`${getApiUrl()}/rooms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                }),
            });

            if (!res.ok) throw new Error('Failed to create room');

            router.push('/admin/rooms');
            router.refresh();
        } catch (err) {
            alert('Error creating room');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-secondary mb-6">Add New Room</h2>
            <div className="bg-surface p-8 rounded-lg shadow-premium border border-border">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-medium mb-2">Room Number</label>
                        <input
                            type="text"
                            value={formData.number}
                            onChange={e => setFormData({ ...formData, number: e.target.value })}
                            required
                            className="w-full p-2.5 border border-border rounded-lg outline-none focus:border-primary transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-2">Type</label>
                        <select
                            value={formData.type}
                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                            required
                            className="w-full p-2.5 border border-border rounded-lg outline-none focus:border-primary transition-colors bg-white"
                        >
                            <option value="">Select Type</option>
                            <option value="Standard">Standard</option>
                            <option value="Deluxe">Deluxe</option>
                            <option value="Suite">Suite</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium mb-2">Price</label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                            required
                            className="w-full p-2.5 border border-border rounded-lg outline-none focus:border-primary transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-2">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-2.5 border border-border rounded-lg outline-none focus:border-primary transition-colors min-h-[120px]"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Room'}
                    </button>
                </form>
            </div>
        </div>
    );
}
