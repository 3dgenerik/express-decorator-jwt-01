CREATE TABLE profiles_table (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    user_id INTEGER UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users_table(id)
);