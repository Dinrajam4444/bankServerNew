// To import express

const express=require('express')

// To import env file

require('dotenv').config()

// To import cors

const cors=require('cors')

// To import db connection

require('./db/dbconnection')

// import router

const rout=require('./routes/router')




// To create server using express

const server=express()

// To connect with frontend

server.use(cors())

// To convert all incoming json type datas into js

server.use(express.json())

// use rout for server

server.use(rout)


// Normal get request without mvc structure

// server.get('/excgetpath/newuser',(req,res)=>{
//     res.send("get request response...")
// })

// server.get('/excgetpath/lastuser',(req,res)=>{
//     res.send("get request response 2...")
// })


// To set port

const port=3000 || process.env.port

// Running configuration

server.listen(3000,()=>{
    console.log(`_______Server Started At Port Number ${port}_______`);
})