import { createPool } from 'mysql2/promise'

export async function connect() {
  const connection = await createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: `${process.env.DATABASE_NAME}`
  })

  return connection
}
