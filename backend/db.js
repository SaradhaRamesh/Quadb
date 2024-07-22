// backend/db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',        // Replace with your PostgreSQL user
    host: 'localhost',
    database: 'LEARNIFY',    // Replace with your PostgreSQL database name
    password: 'Rameez', // Replace with your PostgreSQL password
    port: 5432,
});

module.exports = pool;
