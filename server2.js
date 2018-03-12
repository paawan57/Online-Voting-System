var http=require('http');
var url=require('url');
var dt=require('./server3');
var fs=require('fs');
var uc=require('upper-case');
var express=require('express');
var nodemailer=require('nodemailer');
var app=express();
var mysql = require('mysql');
var path=require('path');
var con=mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database:'paawan'
});




http.createServer(function(req,res){
   
       res.writeHead(200,{'Content-Type':'text/html'});
    fs.readFile('./views/login.html',function(err,data){

    if(err)
    console.log(err);
   
   res.writeHead(200,{'Content-Type':'text/html'});
   res.write(data);
        
   res.end();    
       
});
    
     var q=url.parse(req.url,true).query;
    
     
    if(q.roll_no!=undefined&&q.username!=undefined)
    {
/*var transporter=nodemailer.createTransport({
service:'gmail',
auth:{
user:'chowhanpaawan3@gmail.com',
pass:'undertaker57'
}

});
var mailOptions={
from:q.roll_no,
to:q.username,
subject:'Hi',
text:'How are you??'
};

transporter.sendMail(mailOptions,function(error,info){
if(error)
console.log(error);
});*/
    
         
        
     
  /* console.log("CONNECTION ESTABLISHED\nyou can start your query now");
    con.query('delete from student where name=\''+q.roll_no+'\' and  percentage=\''+q.username+'\'',function(err,result)
    {

      console.log(result);
     if(err) console.log(err);
     if(result.length!=0)
    {console.log("you are authorized to access");
     
    }
    else
    {
      console.log("you are not authorized to access");
      
    }
       
  });
        
        
     con.query('select * from student order by percentage ',function(err,result)
    {

      console.log(result);
     if(err) console.log(err);
     if(result.length!=0)
    {console.log("you are authorized to access");
     
    }
    else
    {
      console.log("you are not authorized to access");
      
    }
       
  });
  }*/
    
    
    if(q.rollno=='good' && q.username=='good')
    {
        console.log("Its good!");
        fs.readFile('./good.html',function(err,data){

    if(err)
    console.log(err);
   
   //res.writeHead(200,{'Content-Type':'text/html'});
   res.write(data);
        
   res.end();    
       
});}
    else if(q.rollno=="bad" && q.username=="bad")
    {
        console.log("Its bad!");
        fs.readFile('./bad.html',function(err,data){

            if(err)
                console.log(err);
   
  // res.writeHead(200,{'Content-Type':'text/html'});
   res.write(data);
        
   res.end();    
       
});} }

      }).listen(8080);  
   
    
 





 //<form action= "./bad.html" method = "POST" id="loginForm" novalidate>



/*res.writeHead(200,{'Content-Type':'text/html'});
res.write('Hello,My name is Paawan<br> How you doing??<br>');

res.write('The time and date is:'+dt.DateTime()+'<br>');
    var q=url.parse(req.url,true).query;
    var txt=q.year+" "+q.month;*/




 /* if(req.url=='/bad')
   { fs.readFile('bad.html',function(err,data){

    if(err)
    console.log(err);
   
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write(data);
    res.end();
});}
    else if(req.url=='/good')
        { fs.readFile('bad.html',function(err,data){

    if(err)
    console.log(err);
   
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write(data);
    res.end();
});
        }*/




/*res.writeHead(200,{'Content-Type':'text/html'});
    res.write(uc('hello'));
    res.end();*/