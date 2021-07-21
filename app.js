const express = require('express');
const morgan = require('morgan');
const mongoose =require('mongoose');
const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoute')
// express app
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/test",{useNewUrlParser : true , useUnifiedTopology : true})
.then((result)=>{
  console.log("connected")
  //this make sense to be listen after connection establish ... 
  app.listen(3001)
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



//middleaware & static file -------------------
//add morgan to work as logger ----------------

app.use(morgan("tiny"))
app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))
// //add sandbox and mongo routes
// app.get("/add-get" , (req,res)=>{
//   const blog = new Blog({
//     title : "new blog3",
//     snippet : "about my new blog",
//     body: "this first page"
//   }) 
//   blog.save()
//   .then((result)=>{
//     res.send(result)

//   }).catch(err=>{
//     console.log(err)
//   })
// })
// app.get("/all-blogs" , (req,res)=>{
//   Blog.find()
//   .then((result)=>{
//     res.send(result)
//   })
//   .catch(err =>{
//     console.log(err)
//   })
 
// })
// app.get('/single-blog' , (req, res)=>{
//   Blog.findById ("60f281579ab1883620d425d3")
//   .then(result =>{
//     res.send(result)
//   })
//   .catch(err =>{
//     console.log(err)
//   })
 
// })
app.get('/', (req, res) => {
res.redirect('/blogs')
});
//add route middelware ------------------
app.use('/blogs',blogRoutes)

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});
// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});