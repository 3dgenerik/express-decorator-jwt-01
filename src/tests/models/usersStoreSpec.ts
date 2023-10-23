import { UsersStore } from '../../models/usersStore';
import { PostsStore } from '../../models/postsStore';

describe('Testing database functions:', () => {
    const usersStore = new UsersStore();
    const postsStore = new PostsStore();
    const password = 'password';
    let hash: string = '';

    beforeAll(async () => {
        hash = await usersStore.hash(password);
    });

    describe('Testing hash/compare function: ', () => {
        it('hash() should be string: ', async () => {
            expect(typeof hash).toBe('string');
        });

        it('compare(correctPassword, hash) should be true: ', async () => {
            const isMatch = await usersStore.compare(password, hash);
            expect(isMatch).toBeTrue();
        });

        it('compare(wrongPassword, hash) should be false: ', async () => {
            const isMatch = await usersStore.compare('wrong-password', hash);
            expect(isMatch).toBeFalse();
        });
    });

    describe('Testing SQL queries:', () => {
        it('getAllUsers()', async () => {
            const allUsers = await usersStore.getAllUsers(false);
            expect(allUsers).toBeDefined();
        });

        it('userExistById()', async () => {
            const user = await usersStore.getUserByID(1);
            expect(user?.name).toEqual('Mire')
        });
    });
});
