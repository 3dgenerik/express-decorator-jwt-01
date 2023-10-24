import client from "../database";
import { IUserPosts } from "../interfaces";

export class DashboardQueries{
    async userPosts(id: number):Promise<IUserPosts[]>{
        const conn = await client.connect()
        const sql = 'SELECT users_table.name, title, content, users_table.id AS users_id FROM posts_table JOIN users_table ON posts_table.users_id = users_table.id WHERE users_table.id = ($1)';
        const result = await conn.query(sql, [id])
        conn.release()
        return result.rows
    }
}