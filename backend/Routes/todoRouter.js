import express from 'express'
import { createNewTodo, deleteTodo, fetchAllItem } from '../Controllers/todoController.js';

const todoRouter = express.Router();

todoRouter.get('/fetchAll', fetchAllItem)
todoRouter.post('/add', createNewTodo)
todoRouter.delete('/delete/:id', deleteTodo)

export default todoRouter;
