import express from 'express'
import * as path from 'path'
const app = express()
const port = 3333

// const path = require('path')
app.use(express.static(process.cwd() + '/src/public'))

console.log(path.join(process.cwd(), 'static'))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/src/public/html/pages/auth.html')
})

app.get('/home', (req, res) => {
    res.sendFile(process.cwd() + '/src/public/html/pages/home.html')
})

app.listen(port, () => {
    console.log(`FaceBook client listening at http://localhost:${port}`)
})