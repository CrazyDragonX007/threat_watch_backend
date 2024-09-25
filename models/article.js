const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    source:{type:String},
    author:{type:String},
    title:{type:String},
    description:{type:String},
    summary:{type:String},
    url:{type:String,unique:true},
    media:{type:String},
    publishedDate:{type:Date},
    country:{type:String},
    language:{type:String},
    relevance_score:{type:Number},
});

module.exports = mongoose.model('Article',articleSchema);