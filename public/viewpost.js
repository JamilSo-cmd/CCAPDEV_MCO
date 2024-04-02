$(document).ready(function () {
    
    const postID = new URLSearchParams(window.location.search).get('postID');
    console.log('postID to view is: ' + postID);
    alert('javascript loaded');

    /*fetch('/onePost', {
        headers: {
            'postID': postID
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                console.log('authorID is: ' + data.authorID);
                document.getElementById('posterUsername').href = ('profile.html?userID=' + data.authorID);
                
                return fetch('/userData', {
                    headers: {
                        'userID': data.authorID
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data) { 

                            console.log('User who posted is : ' + data.username);
                            document.getElementById('username').textContent = data.username;
                            document.getElementById('profilePic').src = data.profilePic;

                        } else {
                            console.error('No user data available.');
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    });

            } else {
                console.error('No post data available.');
            }
        })
        .catch(error => {
            console.error('Error fetching post data:', error);
        });*/

        async function loadViewPost() {
            try {
                const responsePost = await fetch('/onePost', {
                    headers: {
                        'postID': postID
                    }
                })
                const postData = await responsePost.json();

                console.log('post subject is : ' + postData.subject);
                document.getElementById('viewPostTitle').textContent = postData.subject;
                document.getElementById('viewPostBody').textContent = postData.message;

                /*const responsePoster = await fetch('userData', {
                    headers: {
                        'userID': postData._id
                    }
                })
                const posterData = await responsePoster.json();*/

            } catch (error) {
                console.error("post loading error: ", error);
            }
        }

        loadViewPost();  

});