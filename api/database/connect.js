const mysql = require('mysql');
const util = require('util');
import config from '../config'
const pool = mysql.createPool({
    connectionLimit: 100,
    host: config.database.host,
    user: config.database.userName,
    pass: config.database.pass,
    database: config.database.name,
    port: config.database.port
})

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }

        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }

        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }

    if (connection) {
        connection.release();
    } 
    
    return
});

pool.query = util.promisify(pool.query);

module.exports = pool;