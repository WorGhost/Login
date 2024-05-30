import mongoose from "mongoose";

const phaseSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    hour: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'hours',
    }

}, {
    timestamps : true
})

export default mongoose.model('Phase', phaseSchema)