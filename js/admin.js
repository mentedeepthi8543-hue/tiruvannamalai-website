// ===============================
// Dashboard
// ===============================

async function loadDashboard() {

    loadUsers();
    loadTemples();

}

// ===============================
// USERS
// ===============================

async function loadUsers() {

    try {

        const response = await fetch("/users");
        const users = await response.json();

        document.getElementById("totalUsers").innerText = users.length;

        const table = document.getElementById("usersTable");

        table.innerHTML = "";

        users.forEach(user => {

            table.innerHTML += `

            <tr>

                <td>${user.name}</td>

                <td>${user.email}</td>

                <td>${user.phone}</td>

                <td>
                    <span class="badge bg-success">
                        Active
                    </span>
                </td>

                <td>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteUser('${user._id}')">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }

    catch(err){

        console.log(err);

    }

}

// ===============================
// DELETE USER
// ===============================

async function deleteUser(id){

    if(!confirm("Delete this user?")) return;

    await fetch("/delete-user/"+id,{

        method:"DELETE"

    });

    loadUsers();

}

// ===============================
// TEMPLES
// ===============================

async function loadTemples(){

    try{

        const response = await fetch("/temples");

        const temples = await response.json();

        document.getElementById("totalTemples").innerText = temples.length;

    }

    catch(err){

        console.log(err);

    }

}

// ===============================
// DUMMY DATA
// Until backend is created
// ===============================

document.getElementById("activeUsers").innerText = 0;
document.getElementById("totalParking").innerText = 0;
document.getElementById("totalHotels").innerText = 0;
document.getElementById("totalRestaurants").innerText = 0;
document.getElementById("totalEmergency").innerText = 0;
document.getElementById("totalFeedback").innerText = 0;

// ===============================
// USER CHART
// ===============================

new Chart(document.getElementById("userChart"),{

    type:"bar",

    data:{

        labels:["Users"],

        datasets:[{

            label:"Registered Users",

            data:[10]

        }]

    }

});

// ===============================
// PARKING CHART
// ===============================

new Chart(document.getElementById("parkingChart"),{

    type:"pie",

    data:{

        labels:["Available","Occupied"],

        datasets:[{

            data:[70,30]

        }]

    }

});

// ===============================
// LOGOUT
// ===============================

document.getElementById("logoutBtn").onclick=function(){

    if(confirm("Logout?")){

        window.location.href="login.html";

    }

}

// ===============================
// START
// ===============================

loadDashboard();