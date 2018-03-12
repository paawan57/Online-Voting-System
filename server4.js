var nodemailer=require('nodemailer');
var transporter=nodemailer.createTransport({
service:'gmail',
auth:{
user:'chowhanpaawan3@gmail.com',
pass:'undertaker57'
}

});
var mailOptions={
from:'chowhanpaawan3@gmail.com',
to:'malikumar4811@gmail.com',
subject:'demo message',
text:'Hello Sir...'
};

transporter.sendMail(mailOptions,function(error,info){
if(error)
console.log(error);
});