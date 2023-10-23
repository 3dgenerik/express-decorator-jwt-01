CREATE TABLE users_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hash VARCHAR(512) NOT NULL,
    avatars_id INTEGER,
    CONSTRAINT fk_avatar FOREIGN KEY (avatars_id) REFERENCES avatars_table (id)
);

INSERT INTO users_table (name, email, hash, avatars_id) SELECT 'Mire', 'mire@yahoo.com','shaf203uf013fhspo\vu092jd01jd0j' , id FROM avatars_table WHERE url LIKE '%01%' LIMIT 1;
-- INSERT INTO users_table (name, email, hash, avatars_id) SELECT 'test2', 'test2@yahoo.com','asdasdasda', id FROM avatars_table WHERE url LIKE '%02%' LIMIT 1;
-- INSERT INTO users_table (name, email, hash, avatars_id) SELECT 'test3', 'test3@yahoo.com','asdasdadas', id FROM avatars_table WHERE url LIKE '%01%' LIMIT 1;