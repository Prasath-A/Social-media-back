const express=require('express');
const app=express();
const cors=require('cors');
const body_parse=require('body-parser');
const router=require('./router');
const mongoose=require('mongoose');
app.use(express.static('Public'));
app.use(body_parse.urlencoded({extended:false}));
app.use(body_parse.json());
app.use(cors());
mongoose.connect('mongodb+srv://veerandraprasath:PrasathMongoAtlas@intern.eoccier.mongodb.net/?retryWrites=true&w=majority');
app.use('/data',router);

app.use((req,res,next)=>{
    const error=new Error('not found');
    error.status=404;
    next(error);

});
app.use((error,req,res,next)=>{
    res.status(error.status);
    res.json({
        error:{
            title : error.message,
            error_code : error.status
        }
    });
});
module.exports=app;



