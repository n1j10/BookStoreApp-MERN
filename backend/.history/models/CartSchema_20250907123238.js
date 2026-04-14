const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
 book:{
        type:mongoose.Schema.Types.ObjectId, ref: "Book",
        required: true
    
 },
  quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },

     price: {
        type: Number,
        required: true
    }

    });


const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true,
        unique: true
    },
    items: [CartItemSchema],
     totalAmount: {
        type: Number,
        default: 0
    },
    totalItems: {
        type: Number,
        default: 0
    }

});


CartSchema.pre("save", function(next){

   this.totalItems= this.items.reduce((total,item)=> total + item.quantity,0)
    this.totalAmount = this.items.reduce((total,item)=>total + (item.price * quantity))
        next()
})


module.exports = mongoose.model('Cart', CartSchema);
