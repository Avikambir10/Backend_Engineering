import mongoose from "mongoose";

const connectToDB = async(url)=>{
    mongoose.connect(url);
}

export default connectToDB;