import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    task : {type : String, required: true},

},{timestamps : true})

const db = mongoose.model('My-todo-app', todoSchema);

export default db;