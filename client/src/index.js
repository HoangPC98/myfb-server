import express from 'express'
import * as path from 'path'
const app = express()
const port = 3333
import authRoute from './routes/auth.route.js'
import cmRoute from './routes/common.route.js'
import cookieParser from 'cookie-parser'
app.use(cookieParser())

// use Routes
app.use(authRoute)
app.use(cmRoute)

global.log = (string) =>{
    console.log(string)
}


app.use(express.static(process.cwd() + '/src/public'))

console.log(path.join(process.cwd(), 'static'))

app.get('/', (req, res) => {
   res.redirect('/login')
})

app.get('/home', (req, res) => {
    res.sendFile(process.cwd() + '/src/public/html/pages/home.html')
})

app.get('/user', (req, res) => {
    res.sendFile(process.cwd() + '/src/public/html/components/user-list.html')
})


app.listen(port, () => {
    console.log(`FaceBook client listening at http://localhost:${port}`)
})