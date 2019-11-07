import {  Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({
  user: process.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

const connection = async () => {
  try {
    await pool.connect();
    console.log('connection successfull');
  } catch (error) {
    console.log(error);
  }
};
connection();
export default pool;
