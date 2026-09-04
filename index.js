import express from 'express'
import bodyParser from 'body-parser';

const app = express()
const port = 3000
app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(bodyParser.urlencoded())

app.listen(port, ()=>{
    console.log('Listening on', port)
})
app.get("/", (req,res)=>{
    res.render('index')
})
app.post("/submit", (req,res)=>{
    console.log(req.body)
    res.render('index', {image_file: req.body.file, image_description: req.body.description})
})

app.patch('/api/users/:id',(req,res)=>{
    

})