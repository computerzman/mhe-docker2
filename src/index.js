const express = require('express');
//const mongoose = require('mongoose');
const { Client } = require('pg');
const redis = require('redis');

//init app
const PORT = process.env.PORT || 4000;
const app = express();
 
// connect to redis
const REDIS_PORT=6379;
const REDIS_HOST = 'redis'; //'172.23.0.2';
const redisURI = `redis://${REDIS_HOST}:${REDIS_PORT}`;
const redisClient = redis.createClient({
    url: `${redisURI}`
});
redisClient.on('error', (err)=>console.log('Redis Client Error', err))
redisClient.on('connect', ()=>console.log('connected to redis ...'))
redisClient.connect();


// connect db
const POSTGRES_DB_USER = "root";
const POSTGRES_DB_PASWWORD = "example";
const POSTGRES_DB_PORT=5432;
const POSTGRES_DB_HOST = 'postgres'; //'172.23.0.2';
const postgresURI = `postgresql://${POSTGRES_DB_USER}:${POSTGRES_DB_PASWWORD}@${POSTGRES_DB_HOST}:${POSTGRES_DB_PORT}`;
const postgresClient = new Client({
    connectionString: postgresURI,
});

postgresClient
    .connect()
    .then(()=>console.log('connect to postgres db ..'))
    .catch((err)=>console.log('failed to connect to postgres db: ', err));

 
/* const DB_USER = 'root';
const DB_PASWWORD = 'example';
const DB_PORT=27017;
const DB_HOST = 'mongo'; //'172.23.0.2';
const URI = `mongodb://${DB_USER}:${DB_PASWWORD}@${DB_HOST}:${DB_PORT}`;
 mongoose
    .connect(URI)
    .then(()=>console.log('connect to db ..'))
    .catch((err)=>console.log('failed to connect to bd: ', err));
*/
 
app.get('/', (req, res) => {
    redisClient.set('products', 'products...')
    res.send(`<h1> Hello! Mohamed Hassan Elagamy 5 Aws using docker hub ${process.env.NODE_ENV}</h1>`)
});

app.get('/getdata', async (req, res) => {
    const products = await redisClient.get('products');
    //const products = "test";
    res.send(`<h1> Redis Data is  ${process.env.NODE_ENV}</h1> <h2>${products}</h2>`)
});

app.listen(PORT, ()=>console.log(`app is up and running on port: ${PORT}`));  