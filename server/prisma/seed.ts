import { PrismaClient, Role, ReservationStatus, User, Room } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // 1. Create Admin User
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@hotel.com' },
        update: {},
        create: {
            email: 'admin@hotel.com',
            name: 'Admin User',
            password: adminPassword,
            role: Role.ADMIN,
        },
    });
    console.log({ admin });

    // 2. Create Regular Users
    const users: User[] = [];
    for (let i = 0; i < 10; i++) {
        const password = await bcrypt.hash('password123', 10);
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email({ firstName, lastName });

        // Check if user exists to avoid unique constraint errors on re-runs with random data
        // tailored to avoid collision or just let it fail/skip? better to upsert or unique check.
        // For simplicity with random emails, we'll try/catch or just create.
        // Let's stick to unique deterministic emails for "fake" users if we want re-runnability, 
        // or just creating new ones.

        try {
            const user = await prisma.user.create({
                data: {
                    email,
                    name: `${firstName} ${lastName}`,
                    password,
                    role: Role.USER,
                },
            });
            users.push(user);
        } catch (error) {
            console.log(`Skipping duplicate user: ${email}`);
        }
    }
    console.log(`Created ${users.length} users`);

    // 3. Create Rooms
    const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Penthouse'];
    const rooms: Room[] = [];
    for (let i = 1; i <= 20; i++) {
        const roomNumber = `R${100 + i}`;
        const type = roomTypes[Math.floor(Math.random() * roomTypes.length)];
        const price = parseFloat(faker.commerce.price({ min: 50, max: 500 }));
        // Generate a random hotel room image
        const image = faker.image.urlLoremFlickr({ category: 'hotel,bedroom' });
        // Or stick to Unsplash directly if faker's unsplash is deprecated/problematic, 
        // but urlLoremFlickr or urlUnsplash works well. Let's use a reliable source string if needed.
        // simpler: `https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80` (static) or random.
        // dynamic:
        const randomImage = `https://images.unsplash.com/photo-${[
            '1611892440504-42a792e24d32',
            '1582719508461-905c673771fd',
            '1596394516093-501ba68a0ba6'
        ][Math.floor(Math.random() * 3)]}?auto=format&fit=crop&w=800&q=80`;

        const room = await prisma.room.upsert({
            where: { number: roomNumber },
            update: {},
            create: {
                number: roomNumber,
                type,
                price,
                description: faker.lorem.sentence(),
                image: randomImage,
                isAvailable: true,
            },
        });
        rooms.push(room);
    }
    console.log(`Created ${rooms.length} rooms`);

    // 4. Create Reservations
    if (users.length > 0 && rooms.length > 0) {
        for (let i = 0; i < 15; i++) {
            const user = users[Math.floor(Math.random() * users.length)];
            const room = rooms[Math.floor(Math.random() * rooms.length)];

            const startDate = faker.date.future();
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 5) + 1); // 1-6 days

            await prisma.reservation.create({
                data: {
                    startDate,
                    endDate,
                    status: faker.helpers.enumValue(ReservationStatus),
                    userId: user.id,
                    roomId: room.id,
                },
            });
        }
        console.log('Created reservations');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
