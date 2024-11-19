
import express from 'express';
const app = express();
const PORT = 8000;

import connectToDB from './dbConnect.js';
import studentRouter from './routes/studentRoutes.js';
import courseRouter from './routes/courseRoutes.js';

app.use(express.json());
app.use('/students',studentRouter);
app.use('/courses',courseRouter);

connectToDB("mongodb://localhost:27017/assignment")
    .then(() => {
        console.log("connected to db");
        app.listen(PORT,(err) => {
            if(err) console.log("error connecting to server");
            else console.log(`Connected at :http://localhost:8000`)
        })
    }).catch(()=>console.log("error connecting to db"));
