import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        mongoose.connect(`${process.env.MONGODB_URL}/lo`)
        console.log("Database Connected");
    } catch (error) {
        console.error("Err in DB ",error);
    }
}
export default connectDB;