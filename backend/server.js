import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js'
import todoRouter from './Routes/todoRouter.js'

const app = express()

app.use(express.json())
app.use(cors())

await connectDB();

//routes
app.get('/', (req , res) => res.send('Server is running'))
app.use('/api',todoRouter);

const PORT = process.env.PORT || 3001

app.listen(PORT , () => {
    console.log(`Server is running on port : http://localhost:${PORT}`);
})