// import {router} from '../index'
import express from 'express'

const cmRoute = express.Router();
cmRoute.get('/search-result', (req, res) => {
    res.sendFile(process.cwd() + '/src/public/html/pages/search-result.html')
})

export default cmRoute;
global.log = (string) =>{
    console.log(string)
}
