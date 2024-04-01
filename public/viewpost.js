$(document).ready(function () {
    
    const postID = new URLSearchParams(window.location.search).get('postID');
    console.log('postID to view is: ' + postID);

    $.get("/onePost", function(data, status) {


        
    })
     
});