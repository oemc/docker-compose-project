require('dotenv').config();
const secrets = require('./dockerSecret');
const redis = require('redis');
const conn = {
    url: `redis://default:${secrets.read('redis_password')}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
};

exports.get = async function(){
    let users = [];
    const client = redis.createClient(conn);
    client.on('error', (err) => console.log('Redis Client Error', err));
    try {
        await client.connect(conn);
        const jsons = await client.lRange('users', 0, -1);
        jsons.forEach(j => users.push(JSON.parse(j)));
    }
    finally {
        if (client) {
            client.quit();
        }
    }
    return users;
}

exports.save = async function(user, password){
    let result = false;
    const client = redis.createClient(conn);
    client.on('error', (err) => console.log('Redis Client Error', err));
    try {
        await client.connect();
        await client.rPush('users', `{"user":"${user}", "password":"${password}"}`);
        result= true;
    }
    finally {
        if (client) {
            client.quit();
        }
    }
    return result;
}
