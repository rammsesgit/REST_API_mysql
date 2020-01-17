import { createPool } from 'mysql2/promise'

export async function connect() {
  const connection = await createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    //database: 'node_mysql_ts'
    database: 'wordpress'
  })

  return connection
}
