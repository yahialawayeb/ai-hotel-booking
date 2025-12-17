import Link from 'next/link';
import BookingForm from '../../components/BookingForm';
import { getApiUrl } from '../../../lib/api';

async function getRoom(id: string) {
    const res = await fetch(`${getApiUrl()}/rooms/${id}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch room');
    }
    return res.json();
}

export default async function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const room = await getRoom(id);

    return (
        <div className="container-custom py-20">
            <Link href="/rooms" className="inline-block mb-8 text-text-muted font-medium hover:text-primary transition-colors">← Back to Rooms</Link>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16">
                <div className="room-info">
                    <h1 className="text-3xl font-heading font-bold text-secondary mb-6">{room.type} - Room {room.number}</h1>
                    <div className="h-[400px] relative bg-gray-200 rounded-lg overflow-hidden mb-8">
                        {room.image ? (
                            <img
                                src={room.image}
                                alt={`${room.type} view`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">
                                <span>{room.type} View</span>
                            </div>
                        )}
                    </div>
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-secondary">Description</h3>
                            <p className="text-text-muted leading-relaxed">{room.description || 'Enjoy a comfortable stay in our well-furnished room. Features include a king-size bed, private bathroom, and scenic views.'}</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4 text-secondary">Amenities</h3>
                            <ul className="list-disc list-inside space-y-2 text-text-muted">
                                <li>Free Wi-Fi</li>
                                <li>Room Service</li>
                                <li>Flat-screen TV</li>
                                <li>Air Conditioning</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="booking-sidebar">
                    <BookingForm roomId={room.id} price={room.price} />
                </div>
            </div>
        </div>
    );
}
