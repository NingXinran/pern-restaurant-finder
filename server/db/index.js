const { Pool } = require('pg')
 
const pool = new Pool();  // PG will look inside .env for specific default variables!
 
module.exports = {
  query: (text, params) => pool.query(text, params),
}