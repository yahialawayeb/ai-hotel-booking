'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path ? 'border-primary text-white bg-white/5' : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5';

    return (
        <div className="flex min-h-[calc(100vh-64px)] font-sans">
            <aside className="w-64 bg-secondary text-text-light py-8 flex-shrink-0 flex flex-col">
                <div className="px-8 mb-8 text-primary font-heading text-xl font-bold">
                    Admin Panel
                </div>
                <nav className="flex-1">
                    <Link href="/admin" className={`block px-8 py-4 border-l-4 transition-all ${isActive('/admin')}`}>
                        Dashboard
                    </Link>
                    <Link href="/admin/rooms" className={`block px-8 py-4 border-l-4 transition-all ${isActive('/admin/rooms')}`}>
                        Manage Rooms
                    </Link>
                    <Link href="/admin/reservations" className={`block px-8 py-4 border-l-4 transition-all ${isActive('/admin/reservations')}`}>
                        Reservations
                    </Link>
                </nav>
                <div className="mt-auto px-8">
                    <Link href="/" className="text-gray-500 hover:text-white text-sm">← Back to Site</Link>
                </div>
            </aside>
            <main className="flex-1 p-8 bg-background overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
