import { createPool } from 'mysql2/promise'

async function connect() {
  const connection = await createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node_mysql_ts',
    connectionLimit: 10
  })

  return connection
}
