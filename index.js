const express = require('express');
const app = express();

var bodyParser=require('body-parser');

app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}));

const userRouter=require('./user');
app.use('/user',userRouter);


app.listen(8080,console.log("your server start on port 8080"));
