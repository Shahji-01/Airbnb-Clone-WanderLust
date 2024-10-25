const mongoose = require('mongoose');
const review=require("./review");

// just like table structure
const listening = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        url:String,
        filename:String
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

listening.post("findOneAndDelete",async(list)=>{
    if(list){
    await review.deleteMany({_id:{$in:list.reviews}});
    }
});
// create a table
const list = mongoose.model("list", listening);

module.exports = list;
