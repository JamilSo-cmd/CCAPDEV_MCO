$(document).ready(function () {
    
    $.get("/posts", function(data, status){

        data.forEach((post,x) => {
            
            console.log(post);

            const newPost= $("#postTemplate").clone();
            newPost.attr('id',"");
            newPost.find(".date").text(post.date);
            newPost.find(".subject").text(post.subject);
            newPost.find(".message").text(post.message);
            newPost.find(".pageNum").text("page "+ (data.length-x));

            $(".postWindow").prepend(newPost);  
        });
        $(".postWindow").append("<div  class='postFooter' style='color: rgb(96, 96, 96);'><p>end of recent history</p></div>");

      });

     
});

