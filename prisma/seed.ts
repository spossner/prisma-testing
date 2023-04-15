import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
    {
        name: 'Alice',
        email: 'alice@prisma.io',
    },
    {
        name: 'Nilu',
        email: 'nilu@prisma.io',
    },
    {
        name: 'Mahmoud',
        email: 'mahmoud@prisma.io',
    },
];

async function main() {
    await Promise.all(
        userData.map((u) =>
            prisma.user.create({
                data: u,
            })
        )
    );
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
