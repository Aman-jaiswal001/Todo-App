import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    task : {type : String, required: true},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps : true})

const db = mongoose.model('My-todo-app', todoSchema);

export default db;