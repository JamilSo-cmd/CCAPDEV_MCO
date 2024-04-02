$(document).ready(function () {
    
    const postID = new URLSearchParams(window.location.search).get('postID');
    const userID = new URLSearchParams(window.location.search).get('userID');
    console.log('postID to view is: ' + postID);
    console.log(userID);

        async function loadViewPost() {
            try {
                const responsePost = await fetch('/onePost', {
                    headers: {
                        'postID': postID
                    }
                })
                const postData = await responsePost.json();
            
                console.log('post id is : ' + postData[0]._id);
                console.log('post id is : ' + postData[0].date);
                document.getElementById('viewPostTitle').textContent = postData[0].subject;
                document.getElementById('viewPostBody').textContent = postData[0].message;
                document.getElementById('likeCount').textContent = postData[0].likes;
                document.getElementById('dislikeCount').textContent = postData[0].dislikes;
                document.getElementById('posterDate').textContent = postData[0].date;
                
                //to show/hide edit button
                const responseUser = await fetch('/userData', {
                    headers: {
                        'userID': userID
                    }
                })

                const userData = await responseUser.json();
                console.log(userData);  

                if (userData[0]._id === postData[0].authorID || userData[0]._id === "660c5d556224905450a1c10b" /*adminstrator's id*/){
                    $(".post").find(".editButton").show();
                }

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
                                
                                newComment.attr("id",'');  
                                newComment.find(".commentIcon").attr('src', user.profilePic);  
                                newComment.find(".username").text(user.username);                         
                            } else {
                                console.error('No user data available.');
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching user data:', error);
                        });
        
                    newComment.find(".comment").text(comment.comment);
                    newComment.find(".commentDate").text(comment.date);
                    newComment.find(".username").attr('href', 'profile.html?userID=' + String(comment.authorID));

        
                    $(".postFooter").prepend(newComment); 
                    }
                
            });
            //$(".postWindow").append("<div  class='postFooter' style='color: rgb(96, 96, 96);'><p>end of recent history</p></div>");
    
        });

});