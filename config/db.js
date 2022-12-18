import pg from 'pg'
import * as dotenv from 'dotenv'
dotenv.config()

const pool = new pg.Pool({
    user: process.env.POSTGRESQL_USER, 
    host: process.env.POSTGRESQL_HOST,
    database: process.env.POSTGRESQL_DB, 
    password: process.env.POSTGRESQL_PASSWORD, 
    port: process.env.POSTGRESQL_PORT 
});

export default pool