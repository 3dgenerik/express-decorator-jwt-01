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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersStore = void 0;
const config_1 = require("../config");
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UsersStore {
    hash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = bcrypt_1.default.hash(password, Number(config_1.SALT_ROUND));
            return hash;
        });
    }
    compare(password, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const isMatch = bcrypt_1.default.compare(password, hash);
            return isMatch;
        });
    }
    getAllUsers(long) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = '';
            const conn = yield database_1.default.connect();
            if (long)
                sql =
                    'SELECT users_table.*, avatars_table.url, posts_table.id AS posts_id, posts_table.title, posts_table.content, posts_table.users_id, profiles_table.first_name, profiles_table.last_name, profiles_table.date_of_birth, profiles_table.user_id AS profiles_user_id FROM users_table JOIN avatars_table ON users_table.avatars_id = avatars_table.id JOIN posts_table ON users_table.id = posts_table.users_id JOIN profiles_table ON users_table.id = profiles_table.user_id';
            else
                sql = 'SELECT * FROM users_table';
            const result = yield conn.query(sql);
            conn.release();
            return result.rows;
        });
    }
    userExistById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield this.getAllUsers(false);
            for (const user of allUsers) {
                if (user.id === id)
                    return true;
            }
            return false;
        });
    }
    userExist(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield this.getAllUsers(false);
            for (const item of allUsers) {
                if (user.name === item.name && user.email === item.email)
                    return true;
            }
            return false;
        });
    }
    getUserByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.userExistById(id))) {
                return null;
            }
            const conn = yield database_1.default.connect();
            const sql = 'SELECT * FROM users_table WHERE id=($1)';
            const result = yield conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.userExist(user))
                return null;
            const hash = yield this.hash(user.password);
            const conn = yield database_1.default.connect();
            const sql = 'INSERT INTO users_table (name, email, hash, avatars_id) VALUES($1, $2, $3, $4) RETURNING *';
            const result = yield conn.query(sql, [
                user.name,
                user.email,
                hash,
                Number(user.avatars_id),
            ]);
            conn.release;
            return result.rows[0];
        });
    }
    authUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUserExist = yield this.userExist(user);
            if (!isUserExist)
                return null;
            const conn = yield database_1.default.connect();
            const sql = 'SELECT * FROM users_table WHERE name = ($1) AND email = ($2)';
            const result = yield conn.query(sql, [user.name, user.email]);
            const authorizedUser = result.rows[0];
            const isMatch = yield this.compare(user.password, authorizedUser.hash);
            if (!isMatch)
                return null;
            return authorizedUser;
        });
    }
}
exports.UsersStore = UsersStore;
