import AuthModel from "../model/authModel.js";


export const getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        const users = await AuthModel.find().select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getUserProfile = async (req, res) => {
    try {
        const user = await AuthModel.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateUserProfile = async (req, res) => {
    const { fullName, phone } = req.body
    const update = { fullName, phone }

    try {
        const updatedUser = await AuthModel.findByIdAndUpdate(
            req.user.id,
            update,
            { new: true }
        ).select('-password');
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};