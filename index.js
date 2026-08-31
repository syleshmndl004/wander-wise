//const  express= require('express'); //Import the expreess library commonjs module outdated

import express from 'express'; //   ES modules (modern approach)
//require('dotenv').config(); -> older approach to load  .env variable
//import dotenv from 'dotenv';

//dotenv.config(); ->old approach to load environment variables from a .env variable

//const->immutable , let->mutable
//everything in js is object(has properties and methods)
//$() this is a function that takes a string as an argument and returns an object that represents the express application

import connectDB from './config/database.js';//this imports the connectDB function from the config/database.js file, which is responsible for connecting to the MongoDB database

import HANDLERS from './handlers/index.js';//contains all  APIs for what to do when a customer orders something.
import errorMiddleware from './middlewares/error.js';//safa garney a worker that clean up the mess so the website doesnot crash when an error occurs in the application
import {authMiddleware} from './middlewares/auth.js';//a security guard that stands at the door to check if user has wristband or not (jwt token) if not then he will not let the user enter the website
import cors from 'cors';//this is a middleware that allows cross-origin requests, so that the frontend can make requests to the backend from a different domain

const  app = express(); // this tells express to start shift now as variable app is now an instance of the express application, which we can use to define routes and middleware for our application
const port = process.env.PORT ;//address of server which is in the .env file process.env goes inside the vault to read it and get the value of PORT variable

//old approach
// function helloWorldOld(req,res){
//     res.send('Hello World');
// }

//new approach arrow function
//named approach
const helloWorldNew = (req,res) => {
    res.send('Balen Sarkar🤫');
}

// app.get('/',(req,res)=>{ 
//     res.send('Hello World'); 
// });

//app.get('/',helloWorldNew); // '/' is the root route of the application, and helloWorldNew is the callback function that will be executed when a GET request is made to this route

connectDB();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowHeaders: ['Content-Type', 'Authorization'],
    
}));//this middleware is used to allow cross-origin requests

app.use(express.json());//this middleware is used to parse the incoming request body as JSON, so that we can access the data sent in the request body using req.body
app.use(authMiddleware); //Every single visitor gets frisked by the Security Guard to see if they are logged in or have a token before they proceed.
app.use("/", HANDLERS);//if a user ask for any path starting with / the open the api book (handlers) and find the right page (handler) to handle the request and send back the response
app.use(errorMiddleware);//this is at last bcz it is a cleanup worker that will clean up the mess if any error occurs in the application, so it should be the last middleware to be executed

app.listen(port,() =>{ 
    console.log(`Example app listening at http://localhost:${port}`); 
});

/*
up it is  is fully set up, decorated, and staffed.
This line unlocks the front door, turns on the "OPEN" neon sign, 
and starts listening for real customers coming down the street at your port
address.
*/