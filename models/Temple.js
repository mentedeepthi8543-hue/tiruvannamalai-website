const mongoose = require("mongoose");


const templeSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    location:{
        type:String,
        required:true
    },

    description:{
        type:String
    },

    timings:{
        type:String
    },

    image:{
        type:String
    }

});


module.exports = mongoose.model("Temple", templeSchema);