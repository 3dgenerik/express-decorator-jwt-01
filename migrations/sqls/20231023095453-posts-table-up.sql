CREATE TABLE posts_table (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    users_id INTEGER,
    CONSTRAINT fk_users FOREIGN KEY (users_id) REFERENCES users_table(id)
);

INSERT INTO posts_table (title, content, users_id) VALUES('FIRST TEST', 'FIRST TEST...', 1);
-- INSERT INTO posts_table (title, content, users_id) SELECT 'MAYA rendering', 'Can you render...', id FROM users_table WHERE name = 'Bore' LIMIT 1;