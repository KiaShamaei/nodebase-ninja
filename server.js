

const fs = require("fs");
const http = require('http');
const _ = require('lodash')


const server = http.createServer((req,res) => {
	res.setHeader('Content-Type','text/html')
	//lodash 
	const num = _.random(0, 20);
	const greeting = _.once( () =>{
		console.log("hello must run just once ...")

	})
	greeting()
	greeting()
	console.log(num)
	let url = req.url;
	let path = "./views/"
	//this is router switch	
	switch (url) {
		case "/":
			path += "index.html"
			res.statusCode = 200
			break;
		case "/about":
			path += "about.html";
			res.statusCode = 200;
			break;
		case "/about-us":
			res.statusCode = 301;
			res.setHeader('location' , '/about');
			res.end();
			break;
		case "/product":
			path += "product.html";
			res.statusCode = 200;
			break;
		default:
			path += "404.html";
			res.statusCode = 404;
			res.statusMessage = "there isnt real page"

	}
	fs.readFile(path,(err,data) => {
		if (err) {
			console.log(err)
			res.end();
		} else {

			res.write(data)
			res.end()
		}
	})


})
server.listen(8000,'localhost',() => {
	console.log('Listening for request')
})
