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
    fetch('/userData') // gets user Data from backend
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
                document.getElementById('toUserPosts').setAttribute('href', 'userPosts.html?userToView=' + user.username);
            } else {
                console.error('No user data available.');
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
        
        // WIP
        if(!userToView) {
            
        }

        $.get("/posts", function(data, status){

            data.forEach((post,x) => {
                
                if(post.author == userToView) {
                    const newPost= $("#postTemplate").clone();
                    newPost.attr('id',"");
                    newPost.find(".username").text(post.author);
                    newPost.find(".username").attr('href', 'profile.html?userToView=' + post.author);
                    newPost.find(".icon").attr("src", post.authorPic);
                    newPost.find(".date").text(post.date);
                    newPost.find(".subject").text(post.subject);
                    newPost.find(".message").text(post.message);
                    newPost.find(".pageNum").text("page "+ (data.length-x));
    
                    $(".postWindow").prepend(newPost);  
                }
    
            });
            $(".postWindow").append("<div  class='postFooter' style='color: rgb(96, 96, 96);'><p>end of recent history</p></div>");
    
        });

});