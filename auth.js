const API_URL = "http://localhost:400";

// SIGNUP
document.getElementById("signupForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("signupMessage");



    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match!";
        message.className = "text-danger mt-3";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        //    Yahan response ka matlab hai server se aaya hua poora jawab.
        // - response — server se jawab aaya ya nahi, uska object.
        // - response.ok — jawab ka HTTP status successful hai ya nahi.

        if (!response.ok) {
            throw new Error(
                data.errors?.map(error => error.msg).join(", ") ||
                data.error || data.message || "Signup failed"
            );
        }

        // Server ka status	        response.ok	       !response.ok
        // 200 OK	                true	              false
        // 201 Created	            true	              false
        // 400 Bad Request	        false	              true
        // 404 Not Found	        false	              true
        // 500 Server Error	        false	              true


        message.textContent = "Account created successfully!";
        message.className = "text-success mt-3";
        document.getElementById("signupForm").reset();
        window.location.href = "index.html";

    } catch (error) {
        message.textContent = error.message;
        message.className = "text-danger mt-3";
    }
});


// LOGIN
document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");


    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.errors?.map(error => error.msg).join(", ") ||
                data.error || data.message || "Login failed"
            );
        }
        message.textContent = "Logged In successfully!";
        message.className = "text-success mt-3";
        document.getElementById("loginForm").reset();
        localStorage.setItem("email", email);
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "index.html";

    } catch (error) {
        message.textContent = error.message;
        message.className = "text-danger mt-3";
    }
});

const logout = document.querySelector("#logoutBtn");
logout.addEventListener("click", () => {
    localStorage.setItem("isLoggedIn", "false");
    document.querySelector("#loginhide").classList.remove("d-none");
    document.querySelector("#signuphide").classList.remove("d-none");
    logout.classList.add("d-none");
    document.querySelector("#userEmail").classList.add("d-none")
})

// message.className = "text-danger mt-3"	Saari existing classes replace karta hai
// message.classList.add("d-none")	Sirf d-none add karta hai; baaki classes rehti hain