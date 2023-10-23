"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersStore_1 = require("../../models/usersStore");
const postsStore_1 = require("../../models/postsStore");
describe('Testing database functions:', () => {
    const usersStore = new usersStore_1.UsersStore();
    const postsStore = new postsStore_1.PostsStore();
    const password = 'password';
    let hash = '';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        hash = yield usersStore.hash(password);
    }));
    describe('Testing hash/compare function: ', () => {
        it('hash() should be string: ', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(typeof hash).toBe('string');
        }));
        it('compare(correctPassword, hash) should be true: ', () => __awaiter(void 0, void 0, void 0, function* () {
            const isMatch = yield usersStore.compare(password, hash);
            expect(isMatch).toBeTrue();
        }));
        it('compare(wrongPassword, hash) should be false: ', () => __awaiter(void 0, void 0, void 0, function* () {
            const isMatch = yield usersStore.compare('wrong-password', hash);
            expect(isMatch).toBeFalse();
        }));
    });
    describe('Testing SQL queries:', () => {
        it('getAllUsers()', () => __awaiter(void 0, void 0, void 0, function* () {
            const allUsers = yield usersStore.getAllUsers(false);
            expect(allUsers).toBeDefined();
        }));
        it('userExistById()', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield usersStore.getUserByID(1);
            expect(user === null || user === void 0 ? void 0 : user.name).toEqual('Mire');
        }));
    });
});
