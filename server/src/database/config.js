import { createPool } from "mysql2/promise";

const pool = createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
})
pool.getConnection()
    .then((res) => console.log(`Connected to ${res.config.database} database`));

export default pool;
