import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
    try{
        mongoose.connect('mongodb://127.0.0.1:27017/merndb' , {
        useNewUrlParser: true,
        useUnifiedTopology: true}
)
        console.log(">>> DB is connected")
    } catch (e) {
        console.log(e)
    }
}