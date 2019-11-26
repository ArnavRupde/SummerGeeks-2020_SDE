# SummerGeeks-2020_SDE
SummerGeeks 2020 SDE assignment

#Technologies Used:
Node JS, Bootstrap

#Databse Used:
MySQL

#SMS API used: 
FAST2SMS

#Mailing Using:
NodeMailer

Instructions
Install required node packages using NPM

Run example.js file using command node example.js

Database Setup

   Create databse mydb in MySQL.
   Import visitor.sql file in it.
   Run Xampp/Wampp and make sure Server is running.
   
Requirements

Please perform this changes in Example.js
  Set up fast2sms api and Enter API key in Express.js file where mentioned.
  System mail should contain mail id using which email will be sent.
  For this,Set up Nodemailer transported by Editing Email and Password in Example.js
  Set host email as Email of host who should get all checkin Details.
  Set host Phone as Phone number of host who should get all checkin Details.
  

Go to index.html file
It has 2 options.
1) Checkin
2) Checkout

Checkin form takes Name, Email, Phone as Input.
It send Email to Host.
It also send SMS to host.

Checkout form takes Phone Number as Input.
It send Email to guest about his visit.


