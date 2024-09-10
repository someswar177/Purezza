const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    description: {
        type:String
    },
    status:{
        type:String,
        default:'Pending'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('Complaint',complaintSchema);