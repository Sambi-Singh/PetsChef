import express from 'express'
import bodyParser from 'body-parser';
import multer from 'multer';

const app = express()
const port = 3000
app.set('view engine', 'ejs');

//mock database
let posts = []

//id count, use to increment id
var id_num = 0

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

//test to see if users outputs
app.get("/submit/posts", (req,res)=>{
    res.send(posts)

})
app.post("/submit", upload.single('file'),(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    var imageUrl = '/user_images/' + req.file.filename
    console.log(imageUrl)
    //make sure to use the date as the id for the post
    id_num = id_num + 1
    const id = id_num;

    const newPost = {postImage: imageUrl, postMessage: req.body.description, postID: id}
    posts.unshift(newPost)
    console.log(posts)


    
    
    res.render('index', {uploads: posts })
})

//Unless you nest routes, make sure the number of segments in the endpoint match
// with what is in your code.
app.patch('/submit/:postID',(req,res)=>{
    const  {body, params: { postID}, } = req;

    const parsedId = parseInt(postID) //if parsedID is not a number send error
    if(isNaN(parsedId)){
        return res.sendStatus(400);
    }

    const findPostIndex = posts.findIndex(
        (post) => post.postID === parsedId
    )

    if (findPostIndex === -1){
        return res.sendStatus(404);
    }

    posts[findPostIndex] = {...posts[findPostIndex],...body};

    return res.sendStatus(200);




})