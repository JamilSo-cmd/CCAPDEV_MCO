$(document).ready(function () {
    fetch('/userData') // gets user Data from backend
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) { 
                const user = data[0]; 
                
                // Updates profile info in HTML based on fetch
                document.getElementById('usernameInput').value = user.username;
                document.getElementById('genderInput').value = user.gender;
                document.getElementById('dlsuIDInput').value = user.dlsuID;
                document.getElementById('roleInput').value = user.role;
                document.getElementById('descInput').value = user.description;
                console.log("Retreived relevant user data");
            } else {
                console.error('No user data available.');
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });

});