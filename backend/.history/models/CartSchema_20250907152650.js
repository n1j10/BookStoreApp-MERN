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


// CartSchema.pre('save', function(next) {
//     console.log("Pre-save hook running...");
//     console.log("Cart items:", JSON.stringify(this.items, null, 2));
    
//     try {
//         this.totalItems = this.items.reduce((total, item) => {
//             console.log("Processing item:", item);
//             console.log("Item quantity:", item.quantity, "type:", typeof item.quantity);
//             return total + (item.quantity || 0);
//         }, 0);
        
//         this.totalAmount = this.items.reduce((total, item) => {
//             console.log("Processing amount for item:", item);
//             return total + ((item.price || 0) * (item.quantity || 0));
//         }, 0);
        
//         console.log("Calculated totals - Items:", this.totalItems, "Amount:", this.totalAmount);
//         next();
//     } catch (error) {
//         console.error("Error in pre-save hook:", error);
//         next(error);
//     }
// });


module.exports = mongoose.model('Cart', CartSchema);
