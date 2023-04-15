import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

const user = {
    name: 'user 1',
    email: 'user1@a.com',
};

describe('user tests', () => {
    afterAll(async () => {
        await prisma.$disconnect();
    });

    test('the current users are listed successfully', async () => {
        const users = await prisma.user.findMany();
        console.log('users', users);

        expect(users).toBeDefined();
        expect(users.length).toBe(3);
    });

    test('a user is added successfully', async () => {
        const usersBeforeAddding = await prisma.user.findMany();

        const newUser = await prisma.user.create({ data: user });
        console.log('newUser', newUser);

        expect(newUser).toBeDefined();
        expect(newUser.name).toEqual(user.name);

        const usersAfterAdding = await prisma.user.findMany();
        expect(usersAfterAdding.length).toBe(usersBeforeAddding.length + 1);
    });
});
