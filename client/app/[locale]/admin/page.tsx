export default function AdminDashboard() {
    return (
        <div className="dashboard-home">
            <h1>Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="bg-white p-8 rounded-lg shadow-premium border border-border">
                    <h3 className="text-xl font-bold text-secondary mb-4">Total Rooms</h3>
                    <div className="text-4xl font-bold text-primary">12</div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-premium border border-border">
                    <h3 className="text-xl font-bold text-secondary mb-4">Active Bookings</h3>
                    <div className="text-4xl font-bold text-primary">5</div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-premium border border-border">
                    <h3 className="text-xl font-bold text-secondary mb-4">Revenue (Mo)</h3>
                    <div className="text-4xl font-bold text-primary">$12,450</div>
                </div>
            </div>

        </div>
    );
}
