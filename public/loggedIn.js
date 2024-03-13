var loggedIn = true


if (loggedIn === false){
                
   

    sidebuttonsList = document.getElementsByClassName("sideButtons")

    for (var x = 0; x < sidebuttonsList.length ; x++) {
    sidebuttonsList[x+1].style.visibility = "hidden";
    }

    document.getElementById("homeButton").style.visibility = "visible"
    
}

if(loggedIn === true){
   
    document.getElementById("loginlogouttext").innerHTML = "LOG OUT"
    
}