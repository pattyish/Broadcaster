import pool from './dbConnection';

const tablesCreated = pool.query(
  ` 
    DROP TABLE IF EXISTS reports;
    DROP TABLE IF EXISTS users;
        CREATE TABLE users(
        user_id BIGSERIAL PRIMARY KEY,
        firstName VARCHAR(50) NOT null,
        lastName VARCHAR(50) NOT null,
        email VARCHAR(150) NOT null,
        phone VARCHAR(20) NOT null, 
        userName VARCHAR(200) NOT NULL,
        password VARCHAR(300) NOT NULL,
        status Boolean
    );
    
    CREATE TABLE reports(
        rep_id BIGSERIAL PRIMARY KEY,
        title VARCHAR(200) NOT null,
        type VARCHAR(50) NOT null,
        location VARCHAR(150) NOT null,
        Comment VARCHAR(500) NOT null, 
        images VARCHAR(200),
        videos VARCHAR(300),
        status VARCHAR(100),
        user_id BIGINT REFERENCES users(user_id)
       );`,

);
export { tablesCreated as default };
