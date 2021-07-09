

const fs = require("fs");
const http = require('http');


const server = http.createServer ((req,res)=>{
	res.setHeader ('Content-Type','text/html')
	let url = req.url;
	
	switch(url){
		case "/":
			res.write("hello world!")
			break;
		case "/about":
			res.write("<h2>THis is About page...</h2>")
			break;
		case "/product" : 
		res.
	}
	res.end()
})
server.listen(8000, 'localhost' , ()=>{
	console.log('Listening for request')
})
