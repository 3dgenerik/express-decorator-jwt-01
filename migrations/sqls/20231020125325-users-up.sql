CREATE TABLE avatars (id SERIAL PRIMARY KEY, url VARCHAR(2048));

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hash VARCHAR(512) NOT NULL,
    avatars_id INTEGER,
    CONSTRAINT fk_avatar FOREIGN KEY (avatars_id) REFERENCES avatars(id)
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    users_id INTEGER,
    CONSTRAINT fk_users FOREIGN KEY (users_id) REFERENCES users(id)
);

INSERT INTO avatars (url) VALUES('facebook.com/img_01');
INSERT INTO avatars (url) VALUES('facebook.com/img_02');
INSERT INTO avatars (url) VALUES('facebook.com/img_03');

INSERT INTO users (name, email, hash, avatars_id) SELECT 'test1', 'test1@yahoo.com','asdasdasd' , id FROM avatars WHERE url LIKE '%01%' LIMIT 1;
INSERT INTO users (name, email, hash, avatars_id) SELECT 'test2', 'test2@yahoo.com','asdasdasda', id FROM avatars WHERE url LIKE '%02%' LIMIT 1;
INSERT INTO users (name, email, hash, avatars_id) SELECT 'test3', 'test3@yahoo.com','asdasdadas', id FROM avatars WHERE url LIKE '%01%' LIMIT 1;

INSERT INTO posts (title, content, users_id) SELECT 'VRED problems', 'Problems with vred...', id FROM users WHERE name = 'Bore' LIMIT 1;
INSERT INTO posts (title, content, users_id) SELECT 'MAYA rendering', 'Can you render...', id FROM users WHERE name = 'Bore' LIMIT 1;


