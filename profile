<DOCTYPE! html>

<html>
    <head>

        <title>Home Page</title>
        <link rel="stylesheet" href="style.css">

    </head>

    <body>

        <table class="main">
        <!--Header Box-->
            <tr>
                <td colspan="2"><div id="homeHeader"> 

                    <table id="headerOptions">
                        <!--icon (placeholder image present)-->
                        <td><div style="width:200px;"><img src="https://icons.iconarchive.com/icons/iconarchive/dogecoin-to-the-moon/512/Doge-icon.png" style="width: 40px;height: 40px;"></div></td>
                        <!--Search button-->
                        <td><div id="button" class="highlight"><p>SEARCH</p></div></td>
                        <!--Search Text Field-->
                        <td style="width:200px;"><input type="text" size="50" style="font-size: 18px;"></td>
                        <!--Login button-->
                        <td style="padding-left:330px;float: right;"><a class="loginbutton" href="login.html"><div id="button" class="highlight"><p>LOGIN</p></div></a></td>
                    </table>

                </div></td>
            </tr>

            <tr>
            <!--Side Box-->    
                <td class="sideBox">     
                    
                    <div class="sidePanel">
                            
                            <button id="sideButton" class="highlight" style="top:80px;">HOME</button>

                            <button id="sideButton" class="highlight" style="top:140px;">PROFILE</button>
                            
                            <button id="sideButton" class="highlight" style="top:600px;"> + CREATE POST</button>

                    </div>
            
                </td>

                <!--Content here (images are placeholders)-->
                <td>
                    <div class="postWindow">
                        
                        <div class="profileWindow">
                            <img class="profilePic" src="testface.png"/>
                        </div>

                        <div class="post">
                            <!--Post Header-->
                            <div class="postHeader"> 
                                <img class="icon" src="https://e0.pxfuel.com/wallpapers/547/174/desktop-wallpaper-visartheking-twitter-dog-memes-dog-icon-dog-doggo-meme.jpg">
                                <div><a href><b>Josef Tan</b></a></div>
                            </div>
                            <!--Post Contents -->
                            <div class="postBody">
                                <h2 style="margin: 0;">Subject here</h2>
                                <hr>
                                <p>Body of text here</P>
                            </div>
                            <div class="postFooter"><p>Page 3</p></div>
                        </div>

                        <div class="post">
                            <!--Post Header-->
                            <div class="postHeader"> 
                                <img class="icon" src="https://e0.pxfuel.com/wallpapers/547/174/desktop-wallpaper-visartheking-twitter-dog-memes-dog-icon-dog-doggo-meme.jpg">
                                <div><a href><b>Lorenzo Lyon Izo Donaire</b></a></div>
                            </div>
                            <!--Post Contents -->
                            <div class="postBody">
                                <h2 style="margin: 0;">Subject here</h2>
                                <hr>
                                <p>Body of text here</P>
                            </div>
                            <div class="postFooter"><p>Page 4</p></div>
                        </div>
                        
                        <div class="post">
                            <!--Post Header-->
                            <div class="postHeader"> 
                                <img class="icon" src="https://e0.pxfuel.com/wallpapers/547/174/desktop-wallpaper-visartheking-twitter-dog-memes-dog-icon-dog-doggo-meme.jpg">
                                <div><a href><b>Mar Christian Herrera</b></a></div>
                            </div>
                            <!--Post Contents -->
                            <div class="postBody">
                                <h2 style="margin: 0;">Subject here</h2>
                                <hr>
                                <p>Body of text here</P>
                            </div>
                            <div class="postFooter"><p>Page 5</p></div>
                        </div>

                        <div  class="postFooter" style="color: rgb(96, 96, 96);">
                            <p>end of recent history</p>
                        </div>

                    </div>
                </td>

            </tr>
        </table>    
                
    </body>

</html>
