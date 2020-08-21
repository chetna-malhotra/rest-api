const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
require('dotenv').config();

var todoRouter=require('./routes/listRouter');

app.use(bodyParser.json());
app.use(('/'),todoRouter);
app.listen(3000);
/*mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true },()=>{
    console.log('Connected to db');
});*/
var mongoDB = 'mongodb://127.0.0.1/my';
mongoose.connect(mongoDB, { useNewUrlParser: true },()=>{
    console.log('Connected to db');
});
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.all('*',(req,res,next)=>{
	if(req.secure){
		return next();
	}
	else{
		res.redirect(307,'https://'+req.hostname+':'+app.get('secPort')+req.url);
	}
});

 
 module.exports=app;
