const express = require("express")


//express app 
const app = express()
app.set("view engine" , "ejs")

//listen for requests
app.listen(8000);


app.get("/" , (req , res)=>{
    // res.send("<p>this is home page</p>")
    // res.sendFile('./views/index.html' , {root: __dirname})
    //with esj doesnt need to add root address as obj
    res.render("index" , {title :  "Home"})
     
})
app.get("/about" , (req,res)=>{
    res.render("about" , {title : "About"})
})

//redirects
// app.get ('/about-us', (req,res)=>{
//     res.redirect('/about')
// })
//404 page in express 
app.use((req, res)=>{
    res.render('404' , {title : "404"})
})
