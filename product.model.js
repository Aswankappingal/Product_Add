import mongoose from "mongoose";
const product_schema=new mongoose.Schema({
    productname:{type:String},
    category_name:{type:String},
    Description:{type:String},
    price:{type:String},
    stokes:{type:String},
    images:{type:Object},
    banner:{type:String}
})

export default mongoose.model.products||mongoose.model("product",product_schema)