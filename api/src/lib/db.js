import mongoose from "mongoose"

export const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Data is Connected ${conn.connection.host}`)
    }catch(error){
        console.log("MONGO connected Error", error)
    }
}