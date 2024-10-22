CREATE DATABASE hic;
\c hic;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password)
VALUES ('admin', 'admin@HIC.com', 'admin'),
('Karsam', 'becerra.oscar@uabc.edu.mx', '123456');