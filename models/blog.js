const mongooos = require('mongoose') ;
const Schema = mongooos.Schema;

const bolgSchema = new Schema({
    title : {
        type : String, 
        required : true
    },
    snippet : {
        type : String,
        required : true
    } , 
    body:{
        type : String,
        required : true
    }
} ,{ timestamps : true} )

const Blog = mongooos.model("Blog", bolgSchema)
module.exports= Blog;