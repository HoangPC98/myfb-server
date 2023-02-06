// import {router} from '../index'
import express from 'express'

const authRoute = express.Router();
authRoute.get('/login', (req, res) => {
    if(req.cookies['access_token'])
        return res.redirect('/home')
    res.sendFile(process.cwd() + '/src/public/html/pages/login.html')
})

export default authRoute;
