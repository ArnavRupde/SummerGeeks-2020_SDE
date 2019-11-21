const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var mysql = require('mysql');

var unirest = require("unirest");
// var req = unirest("GET", "https://www.fast2sms.com/dev/bulk");
var moment = require('moment');
moment().format();
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'br*******@gmail.com', //system email here
    pass: '******'   //system password here
  },
  tls: {
        rejectUnauthorized: false
    }
});



con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/example', (req, res) => {
  res.send(`Full name is:${req.body.fname} ${req.body.lname}.`);

  var sql = "INSERT INTO visitors (name, email,phone) VALUES ( '" + req.body.fname + "','" + req.body.lname + "','" + req.body.pname + "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    //mail here
    var txtt=" Name "+req.body.fname + " Email "+req.body.lname + " phone "+req.body.pname;
    console.log(txtt)
      var mailOptions = {
      from: 'br****@gmail.com',  // system email
      to: 'arnavrupade@gmail.com',  //host email here
      subject: 'New Checkin',
      text: ` ${txtt} `,
      // html: '<h1>Hi </h1><p>Your Messsage</p>'        
      };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
        var reqq = unirest("GET", "https://www.fast2sms.com/dev/bulk");

        reqq.query({
          "authorization": "2ndrfwRFhotlDvcy3*****************************************", // API key here
          "sender_id": "FSTSMS",
          "message": ` ${txtt} `,
          "language": "english",
          "route": "p",
          "numbers": "9834******", // host phone number
        });

        reqq.headers({
          "cache-control": "no-cache"
        });


        reqq.end(function (ress) {
          if (ress.error) throw new Error(ress.error);

          console.log(ress.body);
        });

  });
});

app.post('/checkout', (req, res) => {
  res.send(`Email Sent`);
  var adr = req.body.pname;
var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
var sql = 'UPDATE visitors SET checkout = '+ mysql.escape(mysqlTimestamp) +' WHERE phone = ' + mysql.escape(adr);
console.log(sql);
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log(result);
});

var sql = 'SELECT * FROM visitors WHERE phone = ' + mysql.escape(adr);
con.query(sql, function (err, result) {
  if (err) throw err;
  // result = JSON.stringify(result);
  var txtt=" Name "+result[0]["name"] + " Email "+result[0].email + " phone "+result[0].phone + " Checkin "+result[0].checkin + " Checkout "+result[0].checkout + " Host Name: Arnav Rupde   Address: Mumbai, Maharashtra  ";
  // console.log(result[0]);
  var too= ""+result[0].email+"";
  console.log(too);
  console.log(txtt);
  var too= ""+result[0].email+"";
  console.log(too);


  var mailOptions = {
      from: 'br********@gmail.com', // system email here
      to: ` ${too} `,
      subject: 'Your Visit Details',
      text: ` ${txtt} `,
      // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
      };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
});
// var too= result[0].email;



});

});

const port = 8080;

app.listen(port, () => {
  console.log(`Server running on port${port}`);
});



// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO customers (name, address) VALUES (${req.body.fname}, ${req.body.lname})";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });