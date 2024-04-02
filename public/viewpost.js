$(document).ready(function () {
    
    const postID = new URLSearchParams(window.location.search).get('postID');
    console.log('postID to view is: ' + postID);

        async function loadViewPost() {
            try {
                const responsePost = await fetch('/onePost', {
                    headers: {
                        'postID': postID
                    }
                })
                const postData = await responsePost.json();
            
                console.log('post id is : ' + postData[0]._id);
                document.getElementById('viewPostTitle').textContent = postData[0].subject;
                document.getElementById('viewPostBody').textContent = postData[0].message;

                const responsePoster = await fetch('userData', {
                    headers: {
                        'userID': postData[0].authorID
                    }
                })
                const posterData = await responsePoster.json();
                document.getElementById('posterUsername').textContent = posterData[0].username;
                document.getElementById('posterUsername').href = ('profile.html?userID=' + posterData[0]._id);
                document.getElementById('posterPic').src = posterData[0].profilePic;

            } catch (error) {
                console.error("post loading error: ", error);
            }
        }

        loadViewPost();  

        // loads comments of post
        $.get("/comments", function(data, status){

            data.forEach((comment,x) => {
                
                // if the postID of the comment matches the current post being viewed
                if(comment.postID == postID){
                    console.log(comment);
        
                    const newComment= $("#commentTemplate").clone();
                    // fetches user data of the comment author
                    fetch('/userData', {
                        headers: {
                            'userID': comment.authorID
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.length > 0) { 
                                const user = data[0]; 

                                newComment.find(".commentIcon").attr('src', user.profilePic);  
                                newComment.find(".username").text(user.username);       
                                newComment.find(".username").attr('href', 'profile.html?userID=' + String(user._id));                  
                            } else {
                                console.error('No user data available.');
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching user data:', error);
                        });
        
                    newComment.find(".comment").text(comment.comment);

        
                    $(".postFooter").prepend(newComment); 
                    }
                
            });
            //$(".postWindow").append("<div  class='postFooter' style='color: rgb(96, 96, 96);'><p>end of recent history</p></div>");
    
        });

});