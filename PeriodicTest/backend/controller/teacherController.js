import TeacherModel from '../model/teacher.js';
import teacherPositionModel from '../model/teacherPosition.js';
import UserModel from '../model/user.js';

//1.1 Trả ra danh sách toàn bộ thông tin giáo viên
//1.2 Thực hiện phân trang với các giá trị query

export const getTeacher = async(req,res) =>{
    try{
        const pageNumber = req.query.pageNumber ? req.query.pageNumber : 1;
        const pageSize = req.query.pageSize ? req.query.pageSize : 5;

        const totalItems = await TeacherModel.countDocuments( { isActive: true });
        const totalPages = Math.ceil(totalItems / pageSize);

        const skip = (pageNumber - 1) * pageSize;

        const teachers = await TeacherModel.find({ isActive: true })
        .populate('teacherPositions')
        .populate('userId', 'name email phoneNumber address')
        .select('code degrees isActive') 
        .skip(skip)
        .limit(pageSize);
         res.send({
            success: true,
            totalItems,
            totalPages,
            currentPage: pageNumber,
            pageSize,
            items: teachers
        })
    } catch (e) {
        console.log(e)
    }
};
  
//1.3 Thực hiện tạo thông tin của 1 giáo viên
const generateRandomCode = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString(); 
};

export const postTeacher = async (req, res) => {
    try {
        const {
            name,
            email,
            phoneNumber,
            address,
            identity,
            dob,
            teacherPositions,
            degrees,
        } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                message: 'Email already exists',
                success: false,
                data: null,
            });
        }

        let code;
        let exitCode = true;

        if(exitCode) {
            code = generateRandomCode(); 
            exitCode = await TeacherModel.findOne({ code }); 
        }


        const newTeacher = await TeacherModel.create({
            name,
            email,
            phoneNumber,
            address,
            identity,
            dob,
            code, 
            isActive: true,
            isDeleted: false,
            startDate: new Date(),
            teacherPositions,
            degrees,
        });
        res.status(201).send({
            message: 'Teacher created successfully!',
            success: true,
            data: newTeacher,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false,
            data: null,
        });
    }
};
//1.4 Trả ra danh sách  toàn bộ thông tin của các vị trí công tác
export const getPosition = async(req,res) =>{
    try {
        const positions = await teacherPositionModel.find()
        if(!positions) throw new Error ('positions is not exists!')
        res.status(200).send({
            message : 'Get positions successfully!',
            data : positions,
            success : true
        })
    }catch (error) {
        res.status(404).send({
            message: error.message,
            data: null,
            success: false
        });
    }
};
//1.5 Tạo mới thông tin vị trí công tác, lưu ý: code - là duy nhất 
const generateUniqueCode = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString(); // Generate a 10-digit random number
};

export const createTeacherPosition = async (req, res) => {
    try {
        const { name, des } = req.body;

        // Validate input
        if (!name || !des) {
            return res.status(400).json({
                message: "Name and description are required",
                success: false,
                data: null,
            });
        }

        // Generate a unique code
        let code;
        let existingPosition = true;

        while (existingPosition) {
            code = generateUniqueCode();
            existingPosition = await teacherPositionModel.findOne({ code }); // Check if the code already exists in DB
        }

        // Create new teacher position
        const newTeacherPosition = await teacherPositionModel.create({
            code,
            name,
            des,
            isActive: true,  // Default value, can be changed if required
            isDeleted: false, // Default value
        });

        // Send success response
        res.status(201).json({
            message: "Teacher position created successfully!",
            success: true,
            data: newTeacherPosition,
        });
    } catch (error) {
        console.error("Error creating teacher position:", error); // Log error for debugging
        res.status(500).json({
            message: error.message || 'An error occurred while creating the teacher position.',
            success: false,
            data: null,
        });
    }
};

