const express=require("express");
const fs=require("fs");
const path=require("path");
const app=express();
const mongoose = require('mongoose');
// const bodyparser=require("body-parser");
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance',{useNewUrlParser:true});
}
const port=8000;

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
});

var contact = mongoose.model('contact', contactSchema);

app.use('/static',express.static('static'));

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    const a={ };
    res.status(200).render('home.pug',a);
});

app.get('/contact',(req,res)=>{
    const a={}
    res.status(200).render('contact.pug',a);
});


app.post('/contact',(req,res)=>{
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to database")
    }).catch(()=>{
        res.status(400).send("item was not saved to database")
    });
    // res.status(200).render('contact.pug',a);
});

app.listen(port,()=>{
    console.log(`the application is running successfully on port ${port}`);
});