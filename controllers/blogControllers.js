const Blog = require('../models/blog')



//controllers 
const blog_index = (req, res)=>{
	Blog.find().sort({ createdAt : -1 })
	.then((result)=>{
	  console.log(result)
	  res.render("blogs/index", { title: 'All Blogs' , blogs : result})
	})
	.catch(err=>{
	  console.log(err)
	})
}
 const blog_create_post = (req,res)=>{
	console.log(req.body)
	const blog = new Blog(req.body)
	blog.save()
	.then((result)=>{
	  res.redirect('/blogs')
	})
	.catch(err=>{
	  console.log(err)
	}) 
 }
 const blog_create_get = (req,res)=>{
	res.render('blogs/create', { title: 'CreateBlog' });
 }
 const blog_details =(req,res)=>{
	const id = req.params.id
	Blog.findById(id)
	.then(result =>{
	  res.render("blogs/details" , {title :"Blog Details",blog : result})
	})
	.catch(err => {
	  res.status(404).render("404" , {title : "404 page"})
	})
 }
 const blog_delete = ()=>{
	const id = req.params.id
	Blog.findByIdAndDelete(id)
	.then(result=>{
	  console.log(result)
	  res.json({redirect : "/"})
	
	})
	.catch(err=>{
	  console.log( err )
	})
 }

 module.exports={
	 blog_create_get,
	 blog_create_post,
	 blog_details,
	 blog_delete,
	 blog_index
 }