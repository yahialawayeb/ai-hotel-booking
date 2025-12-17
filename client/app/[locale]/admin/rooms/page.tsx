import Link from 'next/link';
import { getApiUrl } from '../../../lib/api';

async function getRooms() {
    const res = await fetch(`${getApiUrl()}/rooms`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch rooms');
    return res.json();
}

export default async function AdminRoomsPage() {
    const rooms = await getRooms();

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-secondary">Manage Rooms</h2>
                <Link href="/admin/rooms/create" className="btn btn-primary">Add Room</Link>
            </div>

            <div className="bg-surface rounded-lg shadow-premium overflow-hidden border border-border">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-left">
                            <th className="p-4 font-semibold border-b border-border">ID</th>
                            <th className="p-4 font-semibold border-b border-border">Number</th>
                            <th className="p-4 font-semibold border-b border-border">Type</th>
                            <th className="p-4 font-semibold border-b border-border">Price</th>
                            <th className="p-4 font-semibold border-b border-border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room: any) => (
                            <tr key={room.id} className="border-b border-border last:border-0 hover:bg-gray-50">
                                <td className="p-4 text-text-muted">#{room.id}</td>
                                <td className="p-4 font-medium">{room.number}</td>
                                <td className="p-4">{room.type}</td>
                                <td className="p-4 font-bold text-primary-dark">${room.price}</td>
                                <td className="p-4">
                                    <button className="text-primary hover:text-primary-dark mr-4 font-medium">Edit</button>
                                    <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
