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
        <div className="bg-background min-h-screen">
            {/* Header Section */}
            <header className="bg-secondary text-white py-24 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-30" />
                <div className="container-custom relative z-10">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Our Luxurious Accommodations</h1>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">Explore our curated selection of premium rooms, each designed for your ultimate comfort and style.</p>
                </div>
            </header>

            <div className="container-custom py-20">
                {/* Rooms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {rooms.map((room: any) => (
                        <div
                            key={room.id}
                            className="group bg-white rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-500 transform hover:-translate-y-2 border border-border/50"
                        >
                            {/* Image Container */}
                            <div className="h-72 relative overflow-hidden bg-gray-100">
                                {room.image ? (
                                    <Image
                                        src={room.image}
                                        alt={`Room ${room.number}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                                        <div className="text-5xl mb-2">🏨</div>
                                        <span className="font-medium">Premium Room</span>
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-secondary/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                                    {room.type}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-2xl font-bold text-secondary group-hover:text-primary transition-colors">
                                        Room {room.number}
                                    </h2>
                                    <div className="text-right">
                                        <span className="block text-2xl font-bold text-primary-dark">${room.price}</span>
                                        <span className="text-xs text-text-muted uppercase tracking-widest">Per Night</span>
                                    </div>
                                </div>
                                <p className="text-text-muted leading-relaxed mb-8 line-clamp-2">
                                    {room.description || 'Experience luxury at its finest in this thoughtfully appointed space, featuring premium amenities and elegant decor.'}
                                </p>
                                <div className="flex items-center justify-between border-t border-border pt-6">
                                    <div className="flex gap-4">
                                        <span title="Free Wi-Fi" className="text-xl">📶</span>
                                        <span title="Breakfast included" className="text-xl">🍳</span>
                                        <span title="Pool access" className="text-xl">🏊</span>
                                    </div>
                                    <Link
                                        href={`/rooms/${room.id}`}
                                        className="btn btn-primary rounded-full px-8 hover:scale-105 active:scale-95"
                                    >
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
