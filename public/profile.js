$(document).ready(function () {
    // very WIP
    //$("#profileRole").text("Javascript loaded");
    /*
    const newData = fetch('/userData')
                        .then(response => response.json())
                        .then(data => console.log(data))

    async function fetchUserInfo() {
        try {
            const response = await fetch('/userData');
            if(!response.ok) {
                throw new Error("Response failed due to network");
            }
        }
    }*/
    //alert('javascript loaded');
    //const userToView = new URLSearchParams(window.location.search).get('userToView');
    const userID = new URLSearchParams(window.location.search).get('userID');
    var userPostCount = 0;
            
    // gets user Data from backend
    fetch('/userData', {
        headers: {
            'userID': userID
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) { 
                const user = data[0]; 
                
                // Updates profile info in HTML based on fetch
                document.getElementById('profileName').textContent = user.username;
                document.getElementById('profilePic').src = user.profilePic;
                document.getElementById('profileID').textContent = user.dlsuID;
                document.getElementById('profileRole').textContent = user.dlsuRole;
                document.getElementById('profileGender').textContent = user.gender;
                document.getElementById('descText').text = user.description;

                // set the link to "more posts by user" to the send the username of the current profile
                document.getElementById('toUserPosts').setAttribute('href', 'userPosts.html?userID=' + String(user._id));
            } else {
                console.error('No user data available.');
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
        
        // for the 3 most recent posts of the user to be displayed
        $.get("/posts", function(data, status){

            data.forEach((post,x) => {
                
                if(post.authorID == userID &&
                    userPostCount < 3) {
                    const newPost= $("#postTemplate").clone();
                    newPost.attr('id',"");

                    fetch('/userData', {
                        headers: {
                            'userID': post.authorID
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.length > 0) { 
                                const user = data[0]; 
                                
                                newPost.find(".username").text(user.username);
                                newPost.find(".icon").attr("src", user.profilePic);
                               
                            } else {
                                console.error('No user data available.');
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching user data:', error);
                        });

                    newPost.find(".username").attr('href', 'profile.html?userID=' + post.authorID);
                    newPost.find(".date").text(post.date);
                    newPost.find(".subject").text(post.subject);
                    newPost.find(".message").text(post.message);
                    newPost.find(".pageNum").text("page "+ (data.length-x));
    
                    $(".userPostWindow").prepend(newPost); 
                    userPostCount++; 
                }
    
            });

            // if there were no posts by the user in the profile or userToView was not set
            if(userPostCount == 0 ||
               !userID) {
                console.log('no posts by user found');
                document.getElementById('postTemplate').remove(); // removes the template
            }

            console.log('User had: ' + userPostCount + ' posts');

            $(".userPostWindow").append("<div  class='postFooter' style='color: rgb(96, 96, 96);'><p>end of recent history</p></div>");
    
        });

});