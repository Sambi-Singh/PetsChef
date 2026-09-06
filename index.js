import express from 'express'
import bodyParser from 'body-parser';
import multer from 'multer';

const app = express()
const port = 3000
app.set('view engine', 'ejs');

//mock database
let posts = []

//use multer to deal with file inputs
const upload = multer({dest: 'public/user_images'})
app.use(express.static('public'))
app.use(bodyParser.urlencoded())

app.listen(port, ()=>{
    console.log('Listening on', port)
})
app.get("/", (req,res)=>{
    res.render('index')
})
app.post("/submit", upload.single('file'),(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    var imageUrl = '/user_images/' + req.file.filename
    console.log(imageUrl)

    const newPost = {postImage: imageUrl, postMessage: req.body.description}
    posts.unshift(newPost)
    console.log(posts)
    
    res.render('index', {uploads: posts })
})

app.patch('/api/users/:id',(req,res)=>{


})