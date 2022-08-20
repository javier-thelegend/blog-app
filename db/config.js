const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    postgre: {
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        port: process.env.PGPORT
    }//,
    // server: {
    //     port: 3800
    // }
}