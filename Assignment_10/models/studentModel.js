import mongoose,  { Schema } from 'mongoose';

const studentSchema = new Schema ({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    grade:{
        type:String,
        required:true
    },
    courses:{
        type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'courses' }],
        default:[]
    }
})

const studentModel = mongoose.model("Student",studentSchema);

export default studentModel;