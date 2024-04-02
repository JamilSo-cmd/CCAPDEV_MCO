$(document).ready(function () {
    
    $.get("/posts", function(data, status){

        data.forEach((post,x) => {
            
            console.log(post);

            const newPost= $("#postTemplate").clone();

            fetch('/userData', {
                headers: {
                    'userID': post.authorID
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) { 
                        const user = data[0]; 
                        
                        console.log('User who posted is: ' + user.username);                        
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

    $('#submitButton').on('click', function(){

        var queryStr = $('#SearchStr').val();
        // console.log(queryStr);
        // $.get('/filter/'+ queryStr, function(data, status){
        //     //TODO:clear and append posts
        //     console.log(data);

        //     $('.postWindow').empty();

        //     data.forEach((post,x) => {
            
        //     console.log(post);

        //     const newPost= $("#postTemplate").clone();
        //     newPost.attr('id',"");
        //     newPost.find(".username").text(post.author);
        //     newPost.find(".username").attr('href', 'profile.html?userToView=' + post.author);
        //     newPost.find(".viewPostLink").attr('href', 'viewpost.html?postID=' + String(post._id));
        //     newPost.find(".icon").attr("src", post.authorPic);
        //     newPost.find(".date").text(post.date);
        //     newPost.find(".subject").text(post.subject);
        //     newPost.find(".message").text(post.message);
        //     newPost.find(".pageNum").text("page "+ (data.length-x));

        //     $(".postWindow").prepend(newPost);  
        // });
        // $(".postWindow").append("<div  class='postFooter' style='color: rgb(96, 96, 96);'><p>end of recent history</p></div>");
        // });


        $.get('/filter?search='+ queryStr, function(data, status){
            //TODO:clear and append posts
            console.log(data);

            $('.postWindow').empty();

            data.forEach((post,x) => {
            
            console.log(post);

            const newPost= $("#postTemplate").clone();
            newPost.attr('id',"");
            newPost.find(".username").text(post.author);
            newPost.find(".username").attr('href', 'profile.html?userToView=' + post.author);
            newPost.find(".viewPostLink").attr('href', 'viewpost.html?postID=' + String(post._id));
            newPost.find(".icon").attr("src", post.authorPic);
            newPost.find(".date").text(post.date);
            newPost.find(".subject").text(post.subject);
            newPost.find(".message").text(post.message);
            newPost.find(".pageNum").text("page "+ (data.length-x));

            $(".postWindow").prepend(newPost);  
        });
        $(".postWindow").append("<div  class='postFooter' style='color: rgb(96, 96, 96);'><p>end of recent history</p></div>");
        });

    })

});
     

