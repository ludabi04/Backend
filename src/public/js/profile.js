document.addEventListener("DOMContentLoaded"), async () => {
    const response = await fetch("/profile", {
        headers: {
            "Content-type": "application/json"
        },
        method: "POST",
    });
    const result = await response.json();
    if(result.status === "success"){
        console.log("result", result.data);
        welcomeUser.innerHTML= `Bienvenido ${result.data.first_name}`;
    } else {
        window.location.href="/loginView";
    }
    console.log("Result", result)
    
};