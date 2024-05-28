const express = require("express");
const mongoose = require("mongoose");
const Registeruser = require('./model');
require('dotenv').config();
//---create app with express-----
const app=express();
//------- body parser-----
app.use(express.json());

//----database connection-----

mongoose.connect("mongodb+srv://muralikrishna:muralikrishna@cluster0.ab3upmg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    () => console.log("MongoDB connected...")
);
//----routes & operations--------  
app.get('/',(req,res) =>{
    res.send(`<h1>Default Chat server route</h1>`) 
})
 
app.post('/register',async(req,res) =>{
    try{
        const {UserName,Email,Password,ConfirmPassword} = req.body;
        let exist = await Registeruser.findOne({Email})
        if(exist){
            return res.status(400).send('User Alredy Exist')
        }
        if(Password !== ConfirmPassword){
            return res.status(400).send('Password are not matching..') 
        }
        let newUser = new Registeruser({
            UserName,
            Email,
            Password,
            ConfirmPassword
        })
        await newUser.save();
        res.status(200).send('Register successfully')
    }
    catch(err){
        console.log(err) 
        return res.status(500).send('Internal Server Error')
    }
})

//----port----
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server Started... : http://127.0.0.1:${PORT}`)
});
