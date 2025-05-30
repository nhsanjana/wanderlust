const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
    type:String,
    required:true,           
},
    description:String,
    image:{
        type:String,
        default: "https://images.unsplash.com/photo-1505533321630-975218a5f66f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set:(v) => v==""?"https://images.unsplash.com/photo-1505533321630-975218a5f66f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,
        
    },
    price:Number,
    location:String,
    country:String,

    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review",
    }]
});



const Listing = mongoose.model("Listings",listingSchema);
module.exports = Listing;