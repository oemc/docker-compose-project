require('dotenv').config();
const mariadb = require('mariadb');
const secrets = require('./dockerSecret');
const pool = mariadb.createPool({
    host: process.env.MARIADB_HOST,
    port: process.env.MARIADB_PORT, 
    user: process.env.MARIADB_USER, 
    password: secrets.read('mariadb_password'),
    database: process.env.MARIADB_DATABASE,
    connectionLimit: 5 });

exports.get = async function(){
    let users = [];
    let conn;
    try {
        conn = await pool.getConnection();
        users = await conn.query("SELECT user, password FROM users");
    } finally {
        if (conn) {
        conn.release();
        } 
    }
    return users;
}

exports.save = async function(user, password){
    let result = false;
    let conn;
    try {
        conn = await pool.getConnection();
        const res = await conn.query("INSERT INTO users (user, password) value (?, ?)", [user, password]);
        result = res.affectedRows === 1;
    } 
    finally {
        if (conn) {
        conn.release();
        } 
    }
    return result;
}

