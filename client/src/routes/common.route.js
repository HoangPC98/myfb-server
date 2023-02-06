// import {router} from '../index'
import express from 'express'
import axios from 'axios';
import { serverHost } from '../constants.js';


const cmRoute = express.Router();
cmRoute.get('/search-result', (req, res) => {
    res.sendFile(process.cwd() + '/src/public/html/pages/search-result.html')
})

cmRoute.get('/profile/:user_id', (req, res)=>{
   res.sendFile(process.cwd() + '/src/public/html/pages/profile.html')
})

export default cmRoute;
global.log = (string) =>{
    console.log(string)
}
