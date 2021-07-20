const express = require('express');
const morgan = require('morgan');
const mongoose =require('mongoose');
const Blog = require('./models/blog');
const { result } = require('lodash');
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
app.get('/blogs', (req,res)=>{
  Blog.find().sort({ createdAt : -1 })
  .then((result)=>{
    console.log(result)
    res.render("index", { title: 'All Blogs' , blogs : result})


  })
  .catch(err=>{
    console.log(err)
  })
})
app.post('/blogs' , (req,res)=>{
  console.log(req.body)
  const blog = new Blog(req.body)
  blog.save()
  .then((result)=>{
    res.redirect('/blogs')
  })
  .catch(err=>{
    console.log(err)
  })

})
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'CreateBlog' });
});
app.get("/blogs/:id" , (req, res)=>{
  const id = req.params.id
  Blog.findById(id)
  .then(result =>{
    res.render("details" , {title :"Blog Details",blog : result})
  })
  .catch(err => {
    console.log(err)
  })
})
app.delete('/blogs/:id', (req,res)=>{
  const id = req.params.id
  Blog.findByIdAndDelete(id)
  .then(result=>{
    console.log(result)
    res.json({redirect : "/blogs"})
  
  })
  .catch(err=>{
    console.log( err )
  })
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});
// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});