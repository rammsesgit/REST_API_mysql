import { createPool } from 'mysql2/promise'

function connect() {
  createPool({})
}
