import { SALT_ROUND } from '../config';
import { ShowTable } from '../constants';
import client from '../database';
import { IUser } from '../interfaces';
import bcrypt from 'bcrypt';

export class UsersStore {
    async hash(password: string): Promise<string> {
        const hash = bcrypt.hash(password, Number(SALT_ROUND));
        return hash;
    }

    async compare(password: string, hash: string): Promise<boolean> {
        const isMatch = bcrypt.compare(password, hash);
        return isMatch;
    }

    async getAllUsers(long: boolean): Promise<IUser[]> {
        let sql: string = '';
        const conn = await client.connect();
        if (long)
            sql =
                'SELECT users_table.*, avatars_table.url, posts_table.id AS posts_id, posts_table.title, posts_table.content, posts_table.users_id, profiles_table.first_name, profiles_table.last_name, profiles_table.date_of_birth, profiles_table.user_id AS profiles_user_id FROM users_table JOIN avatars_table ON users_table.avatars_id = avatars_table.id JOIN posts_table ON users_table.id = posts_table.users_id JOIN profiles_table ON users_table.id = profiles_table.user_id';
        else sql = 'SELECT * FROM users_table';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }

    async userExistById(id: number): Promise<boolean> {
        const allUsers = await this.getAllUsers(false);
        for (const user of allUsers) {
            if (user.id === id) return true;
        }
        return false;
    }

    async userExist(user: IUser): Promise<boolean> {
        const allUsers = await this.getAllUsers(false);
        for (const item of allUsers) {
            if (user.name === item.name && user.email === item.email)
                return true;
        }
        return false;
    }

    async getUserByID(id: number): Promise<IUser | null> {
        if (!(await this.userExistById(id))) {
            return null;
        }

        const conn = await client.connect();
        const sql = 'SELECT * FROM users_table WHERE id=($1)';
        const result = await conn.query(sql, [id]);
        conn.release();

        return result.rows[0];
    }

    async createUser(user: IUser): Promise<IUser | null> {
        if (await this.userExist(user)) return null;

        const hash = await this.hash(user.password);
        const conn = await client.connect();
        const sql =
            'INSERT INTO users_table (name, email, hash, avatars_id) VALUES($1, $2, $3, $4) RETURNING *';
        const result = await conn.query(sql, [
            user.name,
            user.email,
            hash,
            Number(user.avatars_id),
        ]);
        conn.release;
        return result.rows[0];
    }

    async authUser(user: IUser): Promise<IUser | null> {
        const isUserExist = await this.userExist(user);
        if (!isUserExist) return null;

        const conn = await client.connect();
        const sql = 'SELECT * FROM users_table WHERE name = ($1) AND email = ($2)';
        const result = await conn.query(sql, [user.name, user.email]);
        const authorizedUser = result.rows[0];

        const isMatch = await this.compare(user.password, authorizedUser.hash);

        if (!isMatch) return null;

        return authorizedUser;
    }
}
