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

        $.get("/comments", function(data, status){

            data.forEach((post,x) => {
                
                console.log(post);
    
                const newComment= $("#commentTemplate").clone();
    
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
    
                newPost.attr('id',"");
                newPost.find(".username").attr('href', 'profile.html?userID=' + post.authorID);
                newPost.find(".viewPostLink").attr('href', 'viewpost.html?postID=' + String(post._id));
                newPost.find(".date").text(post.date);
                newPost.find(".subject").text(post.subject);
                newPost.find(".message").text(post.message);
                newPost.find(".pageNum").text("page "+ (data.length-x));
    
                $(".postWindow").prepend(newPost); 
                
            });
    
            $(".postWindow").append("<div  class='postFooter' style='color: rgb(96, 96, 96);'><p>end of recent history</p></div>");
    
        });

});