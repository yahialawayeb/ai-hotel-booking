import Link from 'next/link';
import Image from 'next/image';
import { getApiUrl } from '../../lib/api';

async function getRooms() {
    const apiUrl = getApiUrl();
    try {
        console.log(`Fetching rooms from: ${apiUrl}/rooms`);
        const res = await fetch(`${apiUrl}/rooms`, { cache: 'no-store' });
        if (!res.ok) {
            console.error(`Failed to fetch rooms: ${res.status} ${res.statusText}`);
            throw new Error('Failed to fetch rooms');
        }
        return res.json();
    } catch (error) {
        console.error('Error in getRooms:', error);
        throw error;
    }
}

export default async function RoomsPage() {
    const rooms = await getRooms();

    return (
        <div className="container-custom py-20 min-h-screen">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-heading font-bold text-secondary mb-4">Our Luxurious Rooms</h1>
                <p className="text-text-muted">Find the perfect space for your stay.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rooms.map((room: any) => (
                    <div key={room.id} className="border border-border rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-premium bg-surface">
                        <div className="h-64 relative bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                            {room.image ? (
                                <Image
                                    src={room.image}
                                    alt={`Room ${room.number}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            ) : (
                                <span>Room Image</span>
                            )}
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-2 text-secondary">{room.type} - {room.number}</h2>
                            <p className="text-text-muted text-sm mb-6 line-clamp-2 overflow-hidden">{room.description || 'No description available.'}</p>
                            <div className="flex justify-between items-center mt-auto">
                                <span className="text-lg font-bold text-primary-dark">${room.price} / night</span>
                                <Link href={`/rooms/${room.id}`} className="btn btn-primary px-4 py-2 text-sm">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
