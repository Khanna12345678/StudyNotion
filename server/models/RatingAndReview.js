const mongoose = require("mongoose");

const ratingAndReviewsSchema = new mongoose.Schema({
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true,
        index:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("RatingAndReviews",ratingAndReviewsSchema)