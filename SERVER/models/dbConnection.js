import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const client = new Client({
  user: process.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

const connection = async () => {
  try {
    await client.connect();
    console.log('connection successfull');
  } catch (error) {
    console.log(error);
  }
};
connection();
export default client;
