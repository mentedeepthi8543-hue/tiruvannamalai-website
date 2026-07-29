// ==========================================
// AUTH.JS
// Tiruvannamalai Guide
// ==========================================


// ==========================================
// PASSWORD TOGGLE
// ==========================================

function togglePassword() {

    const password = document.getElementById("password");

    if(password){

        password.type =
        password.type === "password"
        ? "text"
        : "password";

    }
}


function toggleConfirmPassword(){

    const confirmPassword =
    document.getElementById("confirmPassword");


    if(confirmPassword){

        confirmPassword.type =
        confirmPassword.type === "password"
        ? "text"
        : "password";

    }

}


function toggleLoginPassword(){

    const password =
    document.getElementById("loginPassword");


    if(password){

        password.type =
        password.type === "password"
        ? "text"
        : "password";

    }

}



// ==========================================
// NAVIGATION
// ==========================================

function showSignup(){

    window.location.href="signup.html";

}


function showLogin(){

    window.location.href="login.html";

}



// ==========================================
// PHONE VALIDATION
// ==========================================

function validatePhone(){

    const phone =
    document.getElementById("phone");


    if(!phone) return;


    phone.value =
    phone.value.replace(/\D/g,"");


    if(phone.value.length > 10){

        phone.value =
        phone.value.slice(0,10);

    }


    if(phone.value.length === 10){

        phone.style.border =
        "2px solid green";

        phone.setCustomValidity("");

    }

    else{

        phone.style.border =
        "2px solid red";

        phone.setCustomValidity(
        "Enter valid 10 digit number"
        );

    }

}



// ==========================================
// EMAIL VALIDATION
// ==========================================

function validateEmail(){


    const email =
    document.getElementById("email");


    if(!email) return;



    const regex =
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/;



    if(regex.test(email.value)){


        email.style.border =
        "2px solid green";

        email.setCustomValidity("");

    }

    else{


        email.style.border =
        "2px solid red";


        email.setCustomValidity(
        "Enter valid Gmail address"
        );

    }

}



// ==========================================
// PASSWORD VALIDATION
// ==========================================

function validateStrongPassword(){


    const password =
    document.getElementById("password");


    if(!password) return;



    const regex =
    /^[A-Z](?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{7,}$/;



    if(regex.test(password.value)){


        password.style.border =
        "2px solid green";


        password.setCustomValidity("");

    }

    else{


        password.style.border =
        "2px solid red";


        password.setCustomValidity(
        "Password must start Capital and contain number & special character"
        );

    }

}



// ==========================================
// CONFIRM PASSWORD
// ==========================================

function validatePassword(){


    const password =
    document.getElementById("password");


    const confirmPassword =
    document.getElementById("confirmPassword");


    if(!password || !confirmPassword)
    return;



    if(password.value === confirmPassword.value){


        confirmPassword.style.border =
        "2px solid green";


        confirmPassword.setCustomValidity("");

    }

    else{


        confirmPassword.style.border =
        "2px solid red";


        confirmPassword.setCustomValidity(
        "Passwords do not match"
        );

    }

}




// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
"DOMContentLoaded",
()=>{

// ===============================
// SEND OTP
// ===============================

const sendOtpBtn = document.getElementById("sendOtpBtn");

if (sendOtpBtn) {

    sendOtpBtn.addEventListener("click", async () => {

        validatePhone();
        validateEmail();
        validateStrongPassword();
        validatePassword();

        const email = document.getElementById("email").value.trim();
        const phone = "+91" + document.getElementById("phone").value.trim();

        const otpMethod = document.querySelector(
            'input[name="otpMethod"]:checked'
        ).value;

        try {

            let response;

            if (otpMethod === "email") {

                response = await fetch("/send-otp", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email
                    })
                });

            } else {

                response = await fetch("/send-phone-otp", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        phone: phone
                    })
                });

            }

            const data = await response.json();

            alert(data.message);

            if (data.success) {

                document.getElementById("otpBox").style.display = "block";

            }

        } catch (err) {

            console.log(err);
            alert("OTP sending failed");

        }

    });

}


// ===============================
// VERIFY OTP
// ===============================


const verifyOtpBtn =
document.getElementById("verifyOtpBtn");



if(verifyOtpBtn){



verifyOtpBtn.addEventListener(
"click",
async()=>{

const email = document.getElementById("email").value.trim();

const phone = "+91" + document.getElementById("phone").value.trim();

const otp =document.getElementById("otp").value.trim();

const otpMethod = document.querySelector(
    'input[name="otpMethod"]:checked'
).value;



if(!otp){


alert(
"Enter OTP"
);

return;

}



try{


// VERIFY OTP

const response =
await fetch("/verify-otp",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email,
phone,
otp,
otpMethod

})

});


const data =
await response.json();



if(!data.success){


alert(data.message);

return;

}



alert(
"OTP Verified Successfully"
);




// SAVE USER


const signupResponse =
await fetch("/signup",{


method:"POST",


headers:{


"Content-Type":
"application/json"


},


body:JSON.stringify({


name:
document.getElementById("name")
.value.trim(),



phone:
document.getElementById("phone")
.value.trim(),



email:
document.getElementById("email")
.value.trim(),



password:
document.getElementById("password")
.value


})


});




const signupData =
await signupResponse.json();



console.log(
"SERVER RESPONSE:",
signupData
);



if(signupData.success){

    alert("Account Created Successfully");

    localStorage.setItem("loggedIn", "true");

    localStorage.setItem("username",
        document.getElementById("name").value.trim()
    );

    localStorage.setItem("user", JSON.stringify({
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim()
    }));

    window.location.href = "index.html";

}

else{


alert(
"Registration Failed : "
+ signupData.message
);


}



}


catch(error){


console.log(error);

alert(
"Verification Failed"
);


}


});


}



});

// ==========================================
// LOGIN SYSTEM
// ==========================================

document.addEventListener(
"DOMContentLoaded",
()=>{


const loginForm =
document.getElementById("loginForm");


if(loginForm){


loginForm.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const email =
document.getElementById("loginEmail")
.value.trim();



const password =
document.getElementById("loginPassword")
.value;



try{


const response =
await fetch("/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},


body:JSON.stringify({

email,
password

})


});



const data =
await response.json();



console.log(data);

if(data.success){

    alert(data.message);

    localStorage.setItem("loggedIn", "true");


    // ADMIN LOGIN
    if(data.role === "admin"){

        localStorage.setItem("role","admin");

        window.location.href = "admin.html";

}


    // USER LOGIN
    else{

        localStorage.setItem("username", data.user.name);

        localStorage.setItem("user", JSON.stringify(data.user));

        localStorage.setItem("role","user");

        window.location.href = "dashboard.html";

    }


}

else{


alert(data.message);


}



}

catch(error){


console.log(error);

alert("Login Failed");


}


});


}


});
// ==========================================
// FORGOT PASSWORD POPUP
// ==========================================


function openForgotPopup(){

    document.getElementById("forgotPopup")
    .style.display="flex";

}



function closeForgotPopup(){

    document.getElementById("forgotPopup")
    .style.display="none";

}

// SEND OTP FOR PASSWORD RESET

async function sendOTP(){

    const email =
    document.getElementById("forgotEmail")
    .value.trim();


    if(!email){

        alert("Enter registered email");
        return;

    }


    try{


        const response =
        await fetch("/send-otp",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                email:email

            })

        });



        const data =
        await response.json();



        alert(data.message);



    }


    catch(error){

        console.log(error);

        alert("OTP sending failed");

    }


}



// VERIFY OTP

async function verifyOTP(){


const email =
document.getElementById("forgotEmail")
.value.trim();


const otp =
document.getElementById("otp")
.value.trim();



const response =
await fetch("/verify-otp",{

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



if(data.success){


alert("OTP Verified");


document.getElementById("resetSection")
.style.display="block";


}

else{


alert(data.message);


}


}
// ===============================
// RESET PASSWORD
// ===============================

async function resetPassword(){

    const email =
    document.getElementById("forgotEmail")
    .value.trim();


    const newPassword =
    document.getElementById("newPassword")
    .value;


    const confirmPassword =
    document.getElementById("confirmNewPassword")
    .value;


    console.log("New Password:", newPassword);
console.log("Confirm Password:", confirmPassword);


if(newPassword !== confirmPassword){

    alert("Passwords do not match");
    return;

}

    const response =
    await fetch("/reset-password",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            email:email,

            newPassword:newPassword

        })

    });



    const data =
    await response.json();



    alert(data.message);



    if(data.success){

        closeForgotPopup();

        window.location.href="login.html";

    }


}