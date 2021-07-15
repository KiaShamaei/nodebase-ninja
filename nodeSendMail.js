var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  // service: 'https://businessmoshaver.com',
  host: "mail.businessmoshaver.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'admin@businessmoshaver.com',
    pass: 'kia852147154'
  }
});

var mailOptions = {
  from: 'admin@businessmoshaver.com',
  to: 'kiarash.shamaii@gmail.com',
  subject: 'Sending Email using Node.js',
  text: `Hi Smartherd, thank you for your nice Node.js tutorials.
          I will donate 50$ for this course. Please send me payment options.`
  // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

//https://myaccount.google.com/lesssecureapps must be set ... when you are login 