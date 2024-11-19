import studentModel from '../models/studentModel.js';

const getStudentsData = async (req, res) => {
    try {
        const { name, page = 1 } = req.query;
        const limit = 5;
        const skip = (page - 1) * limit;

        let studentsData;
        const query = name ? { name } : {};

        studentsData = await studentModel.find(query).skip(skip).limit(limit).populate('courses');

        if (!studentsData || studentsData.length === 0) {
            return res.json({ success: false, message: `No students found matching the criteria` });
        }
        return res.json({
            success: true,
            studentsData,
        });
    } catch (error) {
        return res.json({ success: false, message: "Error fetching data" });
    }
};



const addStudent = async(req,res) => {
    try {
        const {name,age,grade} = req.body;
        const newStudent = new studentModel({
            name,
            age,
            grade
        })
        await newStudent.save();
        res.json({success:true,newStudent});
    } catch (error) {
        res.json({success:false,message:"error adding student"});
    }
}

const getByID = async(req,res) => {
    try {
        const {id} = req.params;
        const student = await studentModel.findById(id).populate('courses');
        if(!student) return res.json({success:false,message:"invalid id"});
        res.json({success:true,student});
    } catch (error) {
        res.json({success:false,message:"error fetching data"});
    }
}


const updateStudentData = async (req, res) => {
    try {
        const { id } = req.params; 
        const updateData = req.body;

        const updatedStudent = await studentModel.findByIdAndUpdate(
            id, 
            updateData, 
            {new:true}
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json({success:true,updatedStudent});

    } catch (error) {
        console.error(error);
        res.json({ message: "Server error", error: error.message });
    }
};

const enrollStudent = async(req,res) => {
    try {
        const {id,courseID} = req.params;
        if(!id || !courseID){
            return res.json({success:false,message:"please provide complete details"});
        }
        const student = await studentModel.findById(id);
        if(!student){
            return res.json({success:false,message:"invalid student ID"});
        }
        const isEnrolled = student.courses.includes(courseID);
        if (isEnrolled) {
            return res.status(400).json({ success: false, message: "Student already enrolled in this course" });
        }
        student.courses.push(courseID);
        await student.save();
        res.json({success:true,message:"student successfully enrolled"});
    } catch (error) {
        res.json({ message: "Server error", error: error.message });
    }
}

const deleteStudent = async(req,res) => {
    try {
        const {id} = req.params;
        await studentModel.findByIdAndDelete(id);
        res.json({success:true,message:`deleted student with id ${id}`})
    } catch (error) {
        res.json({success:false,message:`failed to delete`});
    }
}

export {getStudentsData,getByID,addStudent,updateStudentData,deleteStudent,enrollStudent};