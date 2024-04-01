$(document).ready(function () {
    
    const postID = new URLSearchParams(window.location.search).get('postID');
    console.log('postID to view is: ' + postID);

    /*$.get("/onePost", {postID: postID}, function(data, status) {

        console.log("Post's author is: " + data.author);

    })*/

    fetch('/onePost', {
        headers: {
            'postID': postID
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data) { 

                console.log("Post's author is: " + data.author);
                
            } else {
                console.error('No post data available.');
            }
        })
        .catch(error => {
            console.error('Error fetching post data:', error);
        });
     
});