const logoutFormHanlder = async (event) => {

    event.preventDefault();
}

    const response = await fetch("/api/user/logout", {
        method: "post",
        headers: { 'Content-Type': 'application/json' },
    });

     if (response.ok){
        document.location.replace("/");
        
     }else{
        alert("failed to logout")
     }

     document.querySelector(".btn-outline-success").addEventListener("click", logoutFormHanlder);



