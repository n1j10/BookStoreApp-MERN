const mongoose = require("mongoose")


const BookSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },

    description:{
        type:String,
        require:true
    },

    price:{
        type:Number,
        require:true
    },

    stock:{
        type:Number,
        require:true,
        default:0
    },

     isFeautred:{
        type:Boolean,
       
        default:false
    },

    isOnSale:{
        type:Boolean,
       
        default:false
    },

     discountPercent:{
        type:Boolean,
       
        default:false
    },

   coverImage: {
       type: String,
            
    },

})

module.exports = mongoose.model('Book', BookSchema);