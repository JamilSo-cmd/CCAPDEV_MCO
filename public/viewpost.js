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

});