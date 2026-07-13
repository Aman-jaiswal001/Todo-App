import express from 'express'
import { createNewTodo, deleteTodo, fetchAllItem } from '../Controllers/todoController.js';
import auth from '../middleware/authMiddleware.js';

const todoRouter = express.Router();

todoRouter.get('/fetchAll',auth, fetchAllItem)
todoRouter.post('/add',auth, createNewTodo)
todoRouter.delete('/delete/:id',auth, deleteTodo)

export default todoRouter;
