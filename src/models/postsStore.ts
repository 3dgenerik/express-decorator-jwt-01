import { IPost } from '../interfaces';
import client from '../database';

export class PostsStore {
    async getAllPosts(): Promise<IPost[]> {
        const conn = await client.connect();
        const sql = 'SELECT * FROM posts_table';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }

    async createPost(post: IPost, userIdJwt: number): Promise<IPost> {
        const conn = await client.connect();
        //ISPRAVI TRECI PARAMETAR
        const sql =
            'INSERT INTO posts_table (title, content, users_id) VALUES($1, $2, $3) RETURNING *';
        const result = await conn.query(sql, [
            post.title,
            post.content,
            userIdJwt,
        ]);
        conn.release();
        return result.rows[0];
    }
}
