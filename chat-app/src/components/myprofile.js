import React, { useContext, useEffect, useState } from 'react'
import { store } from '../App'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Myprofile() {
    const [token,setToken] = useContext(store);
    const [data,setData] =useState(null);
    const navigate = useNavigate();
    
    useEffect(() =>{
        axios.get('http://127.0.0.1:2044/myprofile',{
            headers :{
                'x-token':token
            }
        }).then(res => setData(res.data)).catch((err) => console.log(err));
        if(!token){
            alert("if u refresh you have to login again");
            
            navigate("/login")
        }
    },[]); 
  return (
    <div>
            <center>
        { data &&
        <div>
            <h1>welcome {data.UserName}</h1>
            <h1>Email {data.Email}</h1>
        </div>
}
      </center>
    </div>
  )
}
