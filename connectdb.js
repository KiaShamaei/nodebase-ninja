

const MongoClient = require("mongodb").MongoClient,format=require("util").format;

MongoClient.connect('mongodb://127.0.0.1:27017' , (err, db)=>{
    if(err){
        throw err

    }else {
        console.log("Connected")

    }
    db.close();
})
