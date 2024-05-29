const express = require("express");
const mongoose = require("mongoose");
const Registeruser = require('./model');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const middileware = require("./middleware");
require('dotenv').config();
//---create app with express-----
const app=express();
//------- body parser-----
app.use(express.json());
//---frontend can make requests by cors ---
app.use(cors({origin:"*"}));
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

app.post('/login',async(req,res) =>{
    try{
        const {Email,Password} = req.body;
        let exist = await Registeruser.findOne({Email});
        if(!exist){
            return res.status(400).send("User Not exist in Our Database..Please try ag")
        }
        let payload = {
            user:{
                id : exist.id
            }
        }
        jwt.sign(payload,'jwtSecret',{expiresIn:3600000},
            (err,token) =>{
                if(err) throw err;
                return res.json({token})
            }
        )
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error While getting login jwt token...")
    }
})


app.get('/myprofile',middileware,async(req,res) =>{
    try{
        let exist = await Registeruser.findById(req.user.id)
        if(!exist){
            return res.status(400).send('User Not found while verify token...')
        }
        res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('invalid error Server Error while getting my profile..')
    }
})

//----port----
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server Started... : http://127.0.0.1:${PORT}`)
});
