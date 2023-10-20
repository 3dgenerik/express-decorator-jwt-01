import client from "../database";
import { IUser } from "../interfaces";

export class UsersStore{
    async getAllUsers():Promise<IUser[]>{
        const conn = await client.connect()
        const sql = 'SELECT * FROM users';
        const result = await conn.query(sql)
        conn.release()
        return result.rows
    }
}