
const express = require('express');
const Blog = require('../models/blog');

router = express.Router() ;
 
 router.get('/blogs', (req,res)=>{
	Blog.find().sort({ createdAt : -1 })
	.then((result)=>{
	  console.log(result)
	  res.render("index", { title: 'All Blogs' , blogs : result})
  
  
	})
	.catch(err=>{
	  console.log(err)
	})
  })
  router.post('/blogs' , (req,res)=>{
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
  router.get('/blogs/create', (req, res) => {
	res.render('create', { title: 'CreateBlog' });
  });
  router.get("/blogs/:id" , (req, res)=>{
	const id = req.params.id
	Blog.findById(id)
	.then(result =>{
	  res.render("details" , {title :"Blog Details",blog : result})
	})
	.catch(err => {
	  console.log(err)
	})
  })
  router.delete('/blogs/:id', (req,res)=>{
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

  module.exports = router ; 