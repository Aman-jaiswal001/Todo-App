import db from "../models/todoModel.js";

export const createNewTodo = async (req , res ) => {
    try {
        const newItem = db.create({
            task:req.body.task,
            user:req.user.id
        });
        return res.status(200).json({success: true, message: "Item added successfully", item:newItem})
    } catch (error) {
        res.status(500).json({success : false, message:"Internal server error"})
    }
}

export const fetchAllItem = async (req,res) => {
    try {
        const allItem = await db.find({
            user:req.user.id
        });
        return res.status(200).json({success: true, message: "Item fetched successfully", item:allItem})
    } catch (error) {
        res.status(500).json({success : false, message:"Internal server error"})
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedItem = await db.findByIdAndDelete(id)
        return res.status(200).json({success: true, message:"Item deleted successfully", item : deletedItem});
    } catch (error) {
        res.status(500).json({success : false, message:"Internal server error"})
    }
}
