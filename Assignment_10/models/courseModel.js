import mongoose , {Schema} from 'mongoose';

const courseSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    duration:{
        type:Number,
        required:true
    }
});

const courseModel = mongoose.model("courses",courseSchema);

export default courseModel;