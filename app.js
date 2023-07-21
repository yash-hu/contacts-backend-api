const express = require('express');
const { errorHandler } = require('./middleware/errorHandler');
const { connectDB } = require('./config/dbConnection');
const app = express();
const dotenv =require('dotenv').config();

//variables

const port = process.env.PORT;

connectDB();
// use the middlewares
app.use(express.json());
app.use('/api/contacts',require('./routes/contacRoutes'));
app.use('/api/users',require('./routes/userRoutes'));
app.use(errorHandler);



app.listen(port,()=>{
    console.log(`server started on port ${port}`);
});