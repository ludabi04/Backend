const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formValues = {
        email: e.target.userEmail.value,
        password: e.target.passUser.value
    };
    const response = await fetch("/login", {
        headers: {
            "Content-type":"application/json"
        },
        method:"POST",
        body: JSON.stringify(formValues)
    });
    // const result = await response.json();
    // console.log("result", result)
if(response.status === "success"){
        window.location.href="/profile"
    } else {
        errorMsg.innerHTML="No fue posible loguear el usuario";
  }
});