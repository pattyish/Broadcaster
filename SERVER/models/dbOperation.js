import pool from './dbConnection';

class Dboperations {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async selectByField(field, params, operator = '=') {
    const query = {
      text: `SELECT * FROM ${this.tableName} WHERE ${field} ${operator} $1`,
      values: [params]
     };
    try {
      const results = await pool.query(query);
      const row = results.rows[0];
      const count = results.rowCount;
      return {
        row,
        count
      };
    } catch (error) {
      console.log(`error on select ${error}`);
      return error;
    }
  }

  async selectAll() {
    try {
      const query = { text: `SELECT * FROM ${this.tableName} RETURNING *`, values: [] };
      const results = await pool.Query(query);
      const { rows } = results.rows;
      const rowsCount = results.rowCount;
      return { rows, rowsCount };
    } catch (error) {
      return error;
    }
  }

  async insertData(data, ...par) {
    const params = [];
    const chunks = [];
    const values = [];
    const keys = [];
    Object.keys(data)
      .forEach((key) => {
        keys.push(key);
        params.push(data[key]);
        values.push(`$${params.length}`);
      });
    chunks.push(`(${values.join(', ')})`);
    try {
      const insertQuery = {
        text: `INSERT INTO ${this.tableName} (${keys.join(',')}) VALUES ${chunks.join(',')} RETURNING *`,
        values: params
        };
      console.log(keys.join(','));
      console.log(params);
      console.log(values);
      console.log(chunks.join(','));
      const results = await pool.query(insertQuery);
      return results.rows;
    } catch (err) {
      console.log(`error on insert ${err}`);
    }
  }

  async editData(id, data) {
    const params = [id];
    Object.keys(data)
      .forEach((key) => {
        params.push(data[key]);
      });
    try {
      const updateQuery = {
        text: `UPDATE ${this.tableName} SET title = $2, type = $3, location = $4, comment = $5, image = $6, video = $7 status = $8 WHERE id = $1 RETURNING *`,
        params,
      };
      const results = await pool.query(updateQuery);
      return results.rows[0];
    } catch (error) {
      console.log(error);
    }
  }
}

export { Dboperations as default };
