import courseModel from '../models/courseModel.js';

const getAllCourses = async (req, res) => {
    try {
        const { name, duration, page = 1 } = req.query;
        let query = {};
        if (name) {
            query.name = name;
        }
        if (duration) {
            query.duration = duration;
        }

        const limit = 5;
        const skip = (page - 1) * limit;
        const courses = await courseModel.find(query).skip(skip).limit(limit);

        if (!courses || courses.length === 0) {
            return res.json({
                success: false,
                message: "No courses found matching the given criteria",
            });
        }

        res.json({
            success: true,
            courses,
        });
    } catch (error) {
        res.json({ success: false, message: "Error fetching courses" });
    }
};



const addCourse = async(req,res) => {
    try {
        const { name, description = '', duration } = req.body;
        if(duration < 2){
            return res.json({success:false,message:"duration should be greater than 1"});
        }
        const newCourse = new courseModel({
            name,
            description:description || '',
            duration
        });
        await newCourse.save();
        res.json({success:true,newCourse});
    } catch (error) {
        res.json({success:false,message:"error adding course"});
    }
}

const getCourseById = async(req,res) =>{
    try {
        const {id} = req.params;
        const course = await courseModel.findById(id);
        if(!course){
            return res.json({success:false,message:"enter a valid ID"});
        }
        res.json({success:true,course});
    } catch (error) {
        res.json({success:false,message:"error fetching details"});
    }
}

const updateById = async(req,res) => {
    try {
        const { id } = req.params; 
        const updateData = req.body;

        const updatedCourse = await courseModel.findByIdAndUpdate(
            id, 
            updateData, 
            {new:true}
        );
        if (!updatedCourse) {
            return res.status(404).json({ message: "course not found" });
        }
        res.status(200).json({success:true,updatedCourse});

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const deleteById = async(req,res) => {
    try {
        const {id} = req.params;
        const deletedCourse = await courseModel.findByIdAndDelete(id);
        if (!deletedCourse) {
            return res.json({ success: false, message: "Course not found with the given ID" });
        }
        res.json({success:true,message:"course deleted successfully"});
    } catch (error) {
        res.json({success:false,message:"error deleting course"});
    }
}

export {getAllCourses,getCourseById,addCourse,updateById,deleteById};