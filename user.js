const express=require('express');
const router=express.Router();
const crypto = require('crypto');
var db=require('./db.js');

router.route('/register').post((req,res)=>{
    //get params
    var name=req.body.name;
    var email=req.body.email;
    var phone=req.body.phone;
    var password=req.body.password;

    //create query
    var sqlQuery="INSERT INTO user(name,email,phone,password) VALUES (?,?,?,?)";

    //call database to insert so add or include database
    // ???? pass params here
    db.query(sqlQuery,[name,email,phone,password],function(error,data,fields){

        if(error)
        {
            // if error send response here
            res.send(JSON.stringify({success:false,message:error}));
        }else{
            // if success send response here
            res.send(JSON.stringify({success:true,message:'register'}));
        }
    });

});


router.route('/login').post((req,res)=>{

    var eamil=req.body.email;
    var password=req.body.password;
    const encryptedPassword = crypto.createHash('md5').update(password).digest('hex');
    console.log(password);
    console.log(encryptedPassword);

    var sql="SELECT * FROM user WHERE email=? AND password=?";
    
    if(eamil != "" && encryptedPassword !=""){
        db.query(sql,[eamil,encryptedPassword],function(err,data,fields){
            if(err){
                res.send(JSON.stringify({success:false,message:'error de datos'}));

            }else{
                
                if(data.length > 0)
                {
                    res.send(JSON.stringify({success:true,user:data}));
                }else{
                    res.send(JSON.stringify({success:false,message:'Empty Data'}));
                }
            }
        });
    }else{
        res.send(JSON.stringify({success:false,message:'Email and password required!'}));
    }

});


module.exports =router;