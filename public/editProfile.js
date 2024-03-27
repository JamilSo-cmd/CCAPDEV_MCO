$(document).ready(function () {
    fetch('/userData') // gets user Data from backend
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) { 
                const user = data[0]; 
                
                // Updates profile info in HTML based on fetch
                document.getElementById('profileName').textContent = user.username;
                document.getElementById('profileID').textContent = user.dlsuID;
                document.getElementById('profileRole').textContent = user.role;
                document.getElementById('profileGender').textContent = user.gender;
                document.getElementById('descText').text = user.description;
            } else {
                console.error('No user data available.');
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });

});