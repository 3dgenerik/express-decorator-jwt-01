import { IPost, IProfile } from '../interfaces';
import client from '../database';

export class ProfilesStore {
    async getAllProfiles(): Promise<IPost[]> {
        const conn = await client.connect();
        const sql = 'SELECT * FROM profiles_table';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }

    async createProfile(profile: IProfile, userIdJwt: number): Promise<IProfile> {
        const conn = await client.connect();
        //ISPRAVI TRECI PARAMETAR
        const sql =
            'INSERT INTO profiles_table (first_name, last_name, date_of_birth, user_id) VALUES($1, $2, $3, $4) RETURNING *';
        const result = await conn.query(sql, [
            profile.first_name,
            profile.last_name,
            profile.date_of_birth,
            userIdJwt,
        ]);
        conn.release();
        return result.rows[0];
    }
}
