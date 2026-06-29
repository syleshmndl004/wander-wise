//const  express= require('express'); //Import the expreess library commonjs module outdated

import express from 'express'; //   ES modules (modern approach)
//require('dotenv').config(); -> older approach to load  .env variable
//import dotenv from 'dotenv';

//dotenv.config(); ->old approach to load environment variables from a .env variable

//const->immutable , let->mutable
//everything in js is object(has properties and methods)
//$() this is a function that takes a string as an argument and returns an object that represents the express application

import connectDB from './config/database.js';//this imports the connectDB function from the config/database.js file, which is responsible for connecting to the MongoDB database

const  app = express(); // this creates an instance of the express application
const port = process.env.PORT ;

//old approach
function helloWorldOld(req,res){
    res.send('Hello World');
}

//new approach arrow function
//named approach
const helloWorldNew = (req,res) => {
    res.send('Balen Sarkar🤫');
}

// app.get('/',(req,res)=>{ 
//     res.send('Hello World'); 
// });

app.get('/',helloWorldNew); // '/' is the root route of the application, and helloWorldNew is the callback function that will be executed when a GET request is made to this route

connectDB();

app.listen(port,() =>{ 
    console.log(`Example app listening at http://localhost:${port}`); 
});