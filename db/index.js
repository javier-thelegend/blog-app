const { Pool } = require('pg');
const { postgre } = require('./config');

const pool = new Pool({
    user: postgre.user,
    host: postgre.host,
    database: postgre.database,
    password: postgre.password,
    port: postgre.port
});

module.exports = pool;