

const fs = require("fs");
const http = require('http');


const server = http.createServer((req,res) => {
	res.setHeader('Content-Type','text/html')
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
		case "/product":
			path += "product.html";
			res.statusCode = 200;
			break;
		default:
			path += "404.html";
			res.statusCode= 404;
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
