require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");
const path = require("path");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const twilio = require("twilio");

const User = require("./models/User");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// ===============================
// MongoDB Connection
// ===============================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ===============================
// Gmail Transporter
// ===============================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

// ===============================
// OTP Store
// ===============================

const otpStore = {};

// ===============================
// Routes
// ===============================

// Home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Signup Page
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "signup.html"));
});

// Login Page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

// railway
app.get("/railway", (req, res) => {
    res.sendFile(path.join(__dirname, "rs.html"));
});

//busstand
app.get("/busstand", (req, res) => {
    res.sendFile(path.join(__dirname, "busstand.html"));
});


// ===============================
// SEND OTP
// ===============================

app.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        success: false,
        message: "Email is required.",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    otpStore[email] = otp;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Tiruvannamalai Website OTP Verification",
      html: `
            <h2>Your OTP</h2>
            <h1>${otp}</h1>
            <p>This OTP is valid for 5 minutes.</p>
        `,
    });

    console.log("OTP:", otp);

    res.json({
      success: true,
      message: "OTP Sent Successfully",
    });
  } 

  catch (err) {
  console.error("Send OTP Error:", err);

  res.json({
    success: false,
    message: err.message,
  });
}
});

// ===============================
// VERIFY OTP
// ===============================

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!otpStore[email]) {
    return res.json({
      success: false,
      message: "OTP expired.",
    });
  }

  if (otpStore[email] == otp) {
    delete otpStore[email];

    return res.json({
      success: true,
      message: "OTP Verified Successfully",
    });
  }

  res.json({
    success: false,
    message: "Invalid OTP",
  });
});

// ===============================
// SIGNUP
// ===============================


app.post("/signup", async (req,res)=>{

console.log("Signup request received");
console.log(req.body);

try{


const existingUser = await User.findOne({
email:req.body.email
});


if(existingUser){

return res.json({

success:false,

message:"Email already registered"

});

}


const user = new User({

name:req.body.name,

phone:req.body.phone,

email:req.body.email,

password:req.body.password

});


console.log("Before Mongo Save");


await user.save();


console.log("After Mongo Save");


res.json({

success:true,

message:"Registration Successful"

});


}

catch(err){

console.log("SIGNUP ERROR");
console.log(err);


res.json({

success:false,

message:err.message

});

}


});

// ===============================
// LOGIN
// ===============================

app.post("/login", async (req,res)=>{

try{

const {email,password}=req.body;


const user = await User.findOne({
email: email
});


if(!user){

return res.json({

success:false,

message:"Email not registered"

});

}



if(user.password !== password){

return res.json({

success:false,

message:"Incorrect password"

});

}



res.json({

success:true,

message:"Login Successful",

user:{
name:user.name,
email:user.email
}

});


}

catch(err){

console.log("LOGIN ERROR");
console.log(err);


res.json({

success:false,

message:err.message

});


}

});
  
// ===============================
// FORGOT PASSWORD SEND OTP
// ===============================

app.post("/forgot-password-send-otp", async(req,res)=>{

try{

const {email,phone}=req.body;


const user = await User.findOne({

email:email,
phone:phone

});


if(!user){

return res.json({

success:false,
message:"User details not matched"

});

}



const otp = otpGenerator.generate(6,{
upperCaseAlphabets:false,
lowerCaseAlphabets:false,
specialChars:false
});


otpStore[email]=otp;



await transporter.sendMail({

from:process.env.EMAIL_USER,

to:email,

subject:"Password Reset OTP",

html:`

<h2>Tiruvannamalai Guide</h2>

<h3>Your Reset OTP</h3>

<h1>${otp}</h1>

`

});


res.json({

success:true,

message:"Reset OTP sent"

});


}

catch(err){

res.json({

success:false,

message:err.message

});

}


});

// ===============================
// VERIFY RESET OTP
// ===============================


app.post("/forgot-password-verify-otp",(req,res)=>{


const {email,otp}=req.body;



if(otpStore[email]===otp){


delete otpStore[email];


res.json({

success:true,

message:"OTP verified"

});


}

else{


res.json({

success:false,

message:"Invalid OTP"

});


}


});

// ===============================
// RESET PASSWORD
// ===============================


app.post("/reset-password",async(req,res)=>{


try{


const {

email,
newPassword

}=req.body;



const user =
await User.findOne({
email:email
});



if(!user){

return res.json({

success:false,

message:"User not found"

});

}



user.password=newPassword;


await user.save();



res.json({

success:true,

message:"Password changed successfully"

});


}


catch(err){

res.json({

success:false,

message:err.message

});


}


});

// ===============================
// SEND PHONE OTP
// ===============================

app.post("/send-phone-otp", async(req,res)=>{

try{

const {phone}=req.body;


const otp = otpGenerator.generate(6,{
    upperCaseAlphabets:false,
    lowerCaseAlphabets:false,
    specialChars:false
});


otpStore[phone]=otp;


await client.messages.create({

body:`Your Tiruvannamalai Guide OTP is ${otp}`,

from:process.env.TWILIO_PHONE_NUMBER,

to:phone

});


res.json({
success:true,
message:"OTP sent to mobile"
});


}

catch(err){

console.log("TWILIO ERROR:",err);

res.json({
success:false,
message:err.message
});

}

});

// ===============================
// SERVER
// ===============================

const PORT = process.env.PORT || 5000;
console.log("Server file loaded");

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
// ==========================================
// FORGOT PASSWORD
// ==========================================


async function sendOTP(){


const email =
document.getElementById("forgotEmail").value;


const phone =
document.getElementById("forgotPhone").value;



const response =
await fetch("/forgot-password-send-otp",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email,
phone

})

});



const data =
await response.json();


alert(data.message);


}



async function verifyOTP(){


const email =
document.getElementById("forgotEmail").value;


const otp =
document.getElementById("otp").value;



const response =
await fetch("/forgot-password-verify-otp",{


method:"POST",

headers:{
"Content-Type":"application/json"
},


body:JSON.stringify({

email,
otp

})


});



const data =
await response.json();


alert(data.message);



if(data.success){


document.getElementById("resetSection")
.style.display="block";


}


}



async function resetPassword(){


const email =
document.getElementById("forgotEmail").value;



const newPassword =
document.getElementById("newPassword").value;



const response =
await fetch("/reset-password",{

method:"POST",

headers:{
"Content-Type":"application/json"
},


body:JSON.stringify({

email,
newPassword

})


});


const data =
await response.json();


alert(data.message);



if(data.success){

closeForgotPopup();

}



}