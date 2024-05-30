import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    client : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    manager : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    phase : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Phase',
    }

}, {
    timestamps : true
})

export default mongoose.model('Project', projectSchema)