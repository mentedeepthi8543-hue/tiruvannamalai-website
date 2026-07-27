document.addEventListener("DOMContentLoaded", function () {


    const guestMenu = document.getElementById("guestMenu");
    const profileArea = document.getElementById("profileArea");

    const profileBtn = document.getElementById("profileBtn");
    const dropdownMenu = document.getElementById("dropdownMenu");

    const userName = document.getElementById("userName");
    const logoutBtn = document.getElementById("logoutBtn");


    // Get logged user
    const user = JSON.parse(localStorage.getItem("user"));


    // =========================
    // USER LOGGED IN
    // =========================

    if(user){

        guestMenu.style.display = "none";

        profileArea.style.display = "block";


        userName.textContent = user.name;


    }


    // =========================
    // USER NOT LOGGED IN
    // =========================

    else{

        guestMenu.style.display = "block";

        profileArea.style.display = "none";

    }



    // =========================
    // PROFILE DROPDOWN
    // =========================

    if(profileBtn){

        profileBtn.addEventListener("click", function(e){

            e.stopPropagation();


            dropdownMenu.style.display =
            dropdownMenu.style.display === "block"
            ? "none"
            : "block";


        });

    }



    // Close dropdown outside click

    document.addEventListener("click",function(){

        if(dropdownMenu){

            dropdownMenu.style.display="none";

        }

    });



    // =========================
    // LOGOUT
    // =========================

    if(logoutBtn){

        logoutBtn.addEventListener("click",function(e){

            e.preventDefault();


            localStorage.removeItem("user");

            localStorage.removeItem("username");

            localStorage.removeItem("loggedIn");


            window.location.href="index.html";


        });

    }


});