const express = require('express');
const morgan = require('morgan');
const mongoose =require('mongoose');
const Blog = require('./models/blog')
// express app
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017",{useNewUrlParser : true , useUnifiedTopology : true})
.then((result)=>{
  console.log("connected")
  //this make sense to be listen after connection establish ... 
  app.listen(3000)
})
.catch((err)=>{
  console.log("err in  connection !")
})
// // listen for requests
// app.listen(3000);

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

//set logger middleware its fire for every request ...

// app.use((req,res,next)=>{
// 	console.log("new reaquest get made!");
// 	console.log("path " , req.path)
// 	console.log("host" , req.hostname)
// 	console.log("methode" , req.method)
// 	next()
// })
// app.use ((req,res,next)=>{
// 	console.log("this is from other middleware ")
// 	next();
// })

//add morgan to work as logger ----------------

app.use(morgan("tiny"))
app.use(express.static('public'))
//add sandbox and mongo routes
app.get("/add-get" , (req,res)=>{
  const blog = new Blog({
    title : "new blog",
    snippet : "about my new blog",
    body: "this first page"
  }) 
  blog.save().then((result)=>{
    res.send(result)

  }).catch(err=>{
    console.log(err)
  })
})
app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});