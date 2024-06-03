import mongoose from 'mongoose'

const hourSchema = new mongoose.Schema({
    hours : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }, 
    phase: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Phase',
        
    }

}, {
    timestamps : true
})

export default mongoose.model('Hour', hourSchema)