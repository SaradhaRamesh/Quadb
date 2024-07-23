// backend/db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',       
    host: 'localhost',
    database: 'LEARNIFY',   
    password: 'Shalini@2125', 
    port: 5432,
});

module.exports = pool;
