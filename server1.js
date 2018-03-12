var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');
var fs = require('fs');
var csv = require('fast-csv');
var formidable = require('formidable');
var $ = require('jquery');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var options = { stats: true }; //prints stats on console

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'image_upload'
});


app.set('views', __dirname + '/views');
app.engine('.html', require('ejs').renderFile);
var path = require('path');
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({ secret: 'ssshhs' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use('assets/javascripts',express.static(path.static ))
var sess;


app.get('/', function (req, res) {
  sess = req.session;
  //Session set when user Request our app via URL
  if (sess.aadhar_id) {

    res.redirect('/admin');
  }
  else {
    //   res.redirect('/login');
    res.render('login.html');

  }
});


app.post('/new', urlencodedParser, function (req, res) {

  // if(err)throw err;
  console.log("CONNECTION ESTABLISHED\nyou can start your query now");
  con.query('select aadhar_id,name,age,address,state from voter where aadhar_id=\'' + req.body.aadhar_id + '\' AND password=\'' + req.body.password + '\'', function (err, result) {

    console.log(result);
    if (err) throw err;
    if (result.length != 0) {
      console.log("you are authorized to access");
      sess = req.session;
      sess.aadhar_id = req.body.aadhar_id;
      res.redirect('/admin');
    }
    else {
      console.log("you are not authorized to access");
      res.redirect('/login');

    }
  });

});

app.get('/exit',function(req,res)
{
    res.render('login.html');    
        
        });

app.get('/admin', function (req, res) {
  sess = req.session;
  if (sess.aadhar_id) {
    //res.write('<h1>Hello '+sess.roll_no+'</h1> ');
    //res.end('<a href="/logout">Logout</a>');

    con.query('select aadhar_id,name,age,address,state from voter where aadhar_id=\'' + sess.aadhar_id + '\'', function (err, result) {

      console.log(result);
      if (err) throw err;
      res.render('admin.html', { v_id: result[0].aadhar_id, v_name: result[0].name, v_age: result[0].age, v_state: result[0].state, v_address: result[0].address });
    });
  } else {
    res.render('login.html');

  }
});







app.get('/register', function (req, res) {
  sess = req.session;
  //Session set when user Request our app via URL
  if (sess.aadhar_id) {

    res.redirect('/admin');
  }
  else {
    res.render('register.html');

  }
});

app.get('/vote', function (req, res) {
  console.log("CONNECTION ESTABLISHED\nyou can start your query now");

  con.query('select candidate_id,name,party from candidate where state= \'' + req.query.state + '\'', function (err, result) {

    if (err) throw err;
    if (result.length != 0) {
      con.query('select * from voting where voter_id = ' + req.session.aadhar_id, function(e, r){
        res.render('test1.html', {data: r.length==0?result:[], state : req.query.state});
      })

    }
    else {
      console.log("you are not authorized to access");
      res.render('register.html');


    }



  });
});
app.post('/vote', urlencodedParser, function (req, res) {
  con.query('select * from voting where voter_id = ' + req.session.aadhar_id, function(e, r){
    if(r.length == 0){
      con.query('insert into voting(candidate_id,voter_id,state) values(\'' + req.body.candidate + '\',\'' + req.session.aadhar_id + '\',\'' + req.body.state + '\')', function (err, result) {
        
            if (err) throw err;
            else {
              console.log("you are not authorized to access");
              res.render('test1.html', {data: [], state: req.body.state});
            }
        
        
        
      });
    }
  })
  
});



app.get('/lockscreen', function (req, res) {
  sess = req.session;
  if (sess.aadhar_id) {
    //sess.roll_no=req.body.username;
    res.redirect('/User_admin');
  }
  else {
    res.render('lockscreen.html');
  }
});



app.post('/user_register', urlencodedParser, function (req, res) {


  console.log("CONNECTION ESTABLISHED\nyou can start your query now");
  if (req.body.age >= 18) {
    con.query('insert into voter(aadhar_id,name,age,address,state,password) values(\'' + req.body.aadhar_id + '\',\'' + req.body.name + '\',\'' + req.body.age + '\',\'' + req.body.address + '\',\'' + req.body.state + '\',\'' + req.body.password + '\')', function (err, result) {
      console.log(result);
      if (err) throw err;
      if (result.length != 0) {
        console.log("you are authorized to access");
        res.render('login.html');

      }
      else {
        console.log("you are not authorized to access");
        res.render('register.html');


      }
    });
  }




});






app.listen(8081, function () {
  console.log("App Started on PORT 8081");
});
