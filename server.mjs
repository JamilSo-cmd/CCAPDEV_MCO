import express from 'express';
import path from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { ObjectId } from 'mongodb';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoose from 'mongoose';

// unique ID generation for sessions
import {v4 as uuidv4} from 'uuid';

const app = express();
const port = 3000;
const __dirname = path.resolve();

// initialize session (WIP)
app.use(session(
  { name:'SessionCookie',
    genid: function(req) {
      //console.log('Generated session id');
      return uuidv4();
    },
    secret: 'secretpass',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 7 * 24 * 3600 * 1000 }
  }));

var curUser; // should be a user

app.use(express.urlencoded({ extended: true })); // Add this line for form data

// MongoDB connection setup
const uri = "mongodb+srv://ZTORlIlsVr6pGCNc:ZTORlIlsVr6pGCNc@cluster0.bvg7nag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  }
});

async function connectToMongoDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if there's an error connecting to MongoDB
  }
}

// Initialize MongoDB connection
connectToMongoDB();


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.use('/', express.static('public', {index: "index.html"}))

app.get('/index', (req, res) =>{

  res.sendFile('./public/index.html', { root: __dirname });

});

// gets posts
app.get('/posts', async (req,res) =>{

  const postCollection = client.db("ForumsDB").collection("Posts");

  // Execute query 
  const cursor = postCollection.find();
  
  // Print a message if no documents were found
  if ((postCollection.countDocuments()) === 0) {
    console.log("No documents found!");
  }

  const array =  await cursor.toArray();

  res.status(200).json(array);
  
});

// gets comments
app.get('/comments', async (req,res) =>{

  const commCollection = client.db("ForumsDB").collection("Comments");

  // Execute query 
  const cursor = commCollection.find();
  
  // Print a message if no documents were found
  if ((commCollection.countDocuments()) === 0) {
    console.log("No documents found!");
  }

  const array =  await cursor.toArray();

  res.status(200).json(array);
  
});

app.get('/trending',async (req,res)=> {

  const postCollection = client.db("ForumsDB").collection("Posts");

  
  // Execute query 
  const cursor = postCollection.find().sort({likes:1,dislikes:1}).limit(5);
  
  // Print a message if no documents were found
  if ((postCollection.countDocuments()) === 0) {
    console.log("No documents found!");
  }

  const array =  await cursor.toArray();

  res.status(200).json(array);
  

});

// gets a single post (WIP)
app.get('/onePost', async (req,res) =>{

  try{
    const postCollection = client.db("ForumsDB").collection("Posts");
    var postID = req.header('postID');
    var postObjID = new ObjectId(postID);

    console.log('Received post ID: ' + postID);

    // Execute query 
    var postToSend = await postCollection.findOne({ _id: postObjID });

    console.log('post found to send has the subject of: ' + postToSend.subject);
    
    const postData = [{
      '_id': postToSend._id,
      'subject': postToSend.subject,
      'message': postToSend.message,
      'tag': postToSend.tag,
      'date': postToSend.date,
      'dislikes': postToSend.dislikes,
      'likes': postToSend.likes,
      'authorID': postToSend.authorID
    }];

    // sends post back
    if(postData) {
      console.log("post sent");
      res.json(postData);
    }
    else {
      console.error('Error finding post to send back', error);
      return res.status(404).json({ message: "Post not found." });
    }

  } catch (error) {
    console.log("Error locating single post", error);
  }

});

// gets a single comment
app.get('/oneComment', async (req,res) =>{

  try{
    const commCollection = client.db("ForumsDB").collection("Comments");
    var commID = req.header('commID');
    var commObjID = new ObjectId(commID);

    console.log('Received comment ID: ' + commID);

    // Execute query 
    var commToSend = await commCollection.findOne({ _id: commObjID });

    console.log('comment found to send has the subject of: ' + commToSend.comment);
    
    const commData = [{
      '_id': commToSend._id,
      'comment': commToSend.comment,
      'date': commToSend.date,
      'userID': commToSend.userID
    }];

    // sends comment back
    if(commData) {
      console.log("comment sent");
      res.json(commData);
    }
    else {
      console.error('Error finding comment to send back', error);
      return res.status(404).json({ message: "Comment not found." });
    }

  } catch (error) {
    console.log("Error locating single comment", error);
  }

});

app.get('/categories',async (req,res)=>{

  const postCollection = client.db("ForumsDB").collection("Posts");

  // Execute query 
  const cursor = await postCollection.distinct("tag");

  // Print a message if no documents were found
  if ((postCollection.countDocuments()) === 0) {
    console.log("No documents found!");
  }
  
  res.status(200).json(cursor);
  
});

//in progress (trying to fix query)
app.get('/filter', async (req, res) => {

  const postCollection = client.db("ForumsDB").collection("Posts");
  const searchStr = req.query.search;
  const sortStr = req.query.sort;
  const categoryStr = req.query.category;

  console.log("looking for: "+searchStr)
  console.log("sorted  by:  "+sortStr)
  console.log("with category: "+categoryStr)
  console.log("----------------------------")

  const query = {
    subject:{$regex:searchStr},
    tag:{$regex:categoryStr}
  }

  //sort by newest
  let sort = {};

  if (sortStr == "Alphabetical"){

    sort = {subject:-1}

  }
  else if (sortStr == "Oldest"){

    sort = {_id:-1}

  }


  // Execute query 
  const cursor = postCollection.find(query).collation({'locale':'en'}).sort(sort);

  // Print a message if no documents were found
  if ((postCollection.countDocuments()) === 0) {
    console.log("No documents found!");
  }

  const array =  await cursor.toArray();

  
  res.status(200).json(array);
})

app.get('/login', (req, res) =>{
  res.sendFile('./public/login.html', { root: __dirname });

});

// Handle editing profile and validation that username is unique (WIP)
app.post('/editProfile', async (req, res) => {
  try {
    console.log("edit Profile function started");
    const { usernameInput, profilePicInput, genderInput, dlsuIDInput, roleInput, descInput } = req.body;
    const usersCollection = client.db("ForumsDB").collection("Users");
    const user = await usersCollection.findOne({ username: curUser.username });

    if (!user) {
      console.error("User editing error: User not found");
      return res.status(404).json({ message: "User not found." });
    } else {
      if (usernameInput) {
        // Check if the new username already exists in the database
        const existingUser = await usersCollection.findOne({ username: usernameInput });
        if (existingUser && existingUser.username !== curUser.username) {
          console.error("User editing error: Username already exists");
          return res.status(400).json({ message: "Username already exists." });
        }
      }

      const filter = { username: curUser.username };
      const updates = {};

      if (usernameInput) {
        updates.username = usernameInput;
      }
      if (profilePicInput) {
        updates.profilePic = profilePicInput;
      }
      if (genderInput) {
        updates.gender = genderInput;
      }
      if (dlsuIDInput) {
        updates.dlsuID = dlsuIDInput;
      }
      if (roleInput) {
        updates.dlsuRole = roleInput;
      }
      if (descInput) {
        updates.description = descInput;
      }

      // Update the user document with the accumulated updates
      await usersCollection.updateOne(filter, { $set: updates });

      // Update curUser with the new profile information
      if (curUser) {
        if (usernameInput) curUser.username = usernameInput;
        if (profilePicInput) curUser.profilePic = profilePicInput;
        if (genderInput) curUser.gender = genderInput;
        if (dlsuIDInput) curUser.dlsuID = dlsuIDInput;
        if (roleInput) curUser.dlsuRole = roleInput;
        if (descInput) curUser.description = descInput;
      }

      console.log("User profile updated successfully");
      return res.redirect('/profile.html');
      
      
    }
  } catch (error) {
    console.error("Error occurred during editing of profile info", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// Handle logging in and validation that user exists in DB
app.post('/login', async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Make sure email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // 'users' collection in MongoDB database
    const usersCollection = client.db("ForumsDB").collection("Users");

    // Find user with the provided email and password
    const user = await usersCollection.findOne({ email: email, password: password });

    // If user not found or password doesn't match, redirect to login page with error message
    if (!user) {
      return res.redirect('/login.html?error=invalid_credentials');
    }

    // If authentication successful, redirect to profile page or dashboard
    curUser = user; // assigns global variable to the user who just logged in
    req.session.userInfo = user; // sets session userInfo to be user who just logged in (WIP)
    console.log('User logged in: ' + req.session.userInfo.username); // to see if the username was gotten correctly
    return res.redirect('/index.html'); // Change the redirect URL as needed

  } catch (error) {
    console.error("Error occurred during login:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// function for getting profile info
app.get('/userData', async (req, res) => {

  let userID = req.header('userID');
  
  if (userID === null || userID === "null"){
    try{
      userID = req.session.userInfo._id;
    }
    catch(err){
      console.log(err);
    }
    if (userID === null || userID === "null"){
      console.log(true);
      return res.status(401).json({message:"No logged in user found",status:401});
    }
  }
  if(userID){
    
    try{
      const usersCollection = client.db("ForumsDB").collection("Users");
  
      /*if(req.header('userToView')) { // if userToView was sent in header, should be a String
        var userToView = req.header('userToView');
        var userToSend = await usersCollection.findOne({ username: userToView });
        console.log('sending user based on userToView');
      }
      else */ // if userID was sent in header, should be a String
      var userToSend = await usersCollection.findOne({ _id: new ObjectId(userID) });
      
      // if no user was found
      if(!userToSend) {
        console.log('No valid user found');
        return res.status(404).json({ message: "User not found or could not be deleted." });
      }
  
      const userData = [{
        '_id': userToSend._id,
        'username': userToSend.username,
        'profilePic': userToSend.profilePic,
        'dlsuID': userToSend.dlsuID,
        'dlsuRole': userToSend.dlsuRole,
        'gender': userToSend.gender,
        'description': userToSend.description
      }];
      
      if(userData) {
        res.json(userData);
      }
    } catch (error) {
      console.error("Error locating the user: " , error);
    }

  }  

  
})

app.get('/profile', (req, res) =>{

  res.sendFile('./public/profile.html', { root: __dirname });

});

app.get('/create',(req, res) =>{
    res.sendFile('./public/create.html', { root: __dirname });
  }
);

// registers posts into the db
app.post('/create', async (req,res) => {
  
  try{

    let userID = req.session.userInfo;
    console.log(req.session.userInfo);

    const {subject,message,tag} = req.body;

    if (!subject || !message || !tag){
      return res.redirect('/create');
    }
    
    const date = new Date(Date.now()).toUTCString();

    const postsCollection = client.db("ForumsDB").collection("Posts");

    const result = await postsCollection.insertOne({
      author:userID.username,
      authorPic:curUser.profilePic,
      subject:subject,
      message:message,
      tag:tag,
      date:date,
      dislikes: 0,
      likes: 0,
      authorID:curUser._id.toString(),
    });

    console.log("test");
  // If insertion is successful, respond with a success message
    res.redirect("/index");

  }
  catch(error){
      console.error("Error occurred during post creation.", error);
      return res.status(500).json({ message: "Internal server error." });
  }

});

app.get('/delete', (req, res) =>{

  res.sendFile('./public/delete.html', { root: __dirname });

});

app.post('/delete', async (req, res) => {
  try {
    // Parse postId from the request body
    const postId = req.body.postId;

    // Check if postId is provided
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required." });
    }

    // Convert postId to ObjectId
    const objectId = new ObjectId(postId);

    // Get the Posts collection from the database
    const postsCollection = client.db("ForumsDB").collection("Posts");

    // Delete the post with the provided post ID
    const result = await postsCollection.deleteOne({ _id: objectId });

    // Check if the post was deleted successfully
    if (result.deletedCount === 1) {
      console.log("Post deleted successfully");
      return res.redirect('/index.html');
    } else {
      return res.status(404).json({ message: "Post not found or could not be deleted." });
    }
  } catch (error) {
    console.error("Error occurred during post deletion:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});


app.get('/signup', (req, res) =>{

  res.sendFile('./public/signup.html', { root: __dirname });

});

// Handle registering users to the DB
app.post('/signup', async (req, res) => {
  try {
      // Extract email, username, and password from the request body
      const { email, username, password } = req.body;

      // Make sure all required fields are provided
      if (!email || !username || !password) {
          return res.status(400).json({ message: "Email, username, and password are required." });
      }

      // 'users' collection in MongoDB database
      const usersCollection = client.db("ForumsDB").collection("Users");

      // Insert the user data into the database
      const result = await usersCollection.insertOne({
          email: email,
          username: username,
          password: password,
          profilePic: "https://news.tulane.edu/sites/default/files/headshot_icon_0.jpg",
          description: "",
          dlsuID: "",
          dlsuRole: "",
          gender: ""
      });

      // If insertion is successful, respond with a success message
      if (result.insertedCount === 1) {
          return res.redirect('/login.html'); // Redirect to login page
      } else {
          // If insertion failed for some reason
          return res.redirect('/login.html'); // Redirect to login page
      }
  } catch (error) {
      console.error("Error occurred during signup:", error);
      return res.status(500).json({ message: "Internal server error." });
  }
});

app.get('/editPost', (req, res) =>{

  res.sendFile('./public/editPost.html', { root: __dirname });

});

app.post('/editPost', async (req, res) => {
  try {
    // Parse postId from the request body
    const postId = req.body.postId;

    // Extract subject and message from the request body
    const { subject, message, tag } = req.body;

    // Check if postId, subject, and message are provided
    if (!postId || !subject || !message || !tag) {
      return res.status(400).json({ message: "Post ID, subject, and message are required." });
    }

    // Convert postId to ObjectId
    const objectId = new ObjectId(postId);

    // Get the Posts collection from the database
    const postsCollection = client.db("ForumsDB").collection("Posts");

    // Update the post with the provided post ID
    const result = await postsCollection.updateOne(
      { _id: objectId }, // Using ObjectId for post IDs
      { $set: { subject: subject, message: message, tag: tag } }
    );

    // Check if the post was updated successfully
    if (result.modifiedCount === 1) {
      console.log("Post edited successfully");
      return res.redirect('/index.html');
    } else {
      return res.status(404).json({ message: "Post not found or could not be updated." });
    }
  } catch (error) {
    console.error("Error occurred during post editing:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});


app.get('/editProfile', (req, res) =>{

  res.sendFile('./public/editProfile.html', { root: __dirname });

});

app.get('/viewpost', (req, res) =>{

  res.sendFile('./public/viewpost.html', { root: __dirname });

});

app.post('/viewpost', (req, res) =>{

  res.sendFile('./public/viewpost.html', { root: __dirname });

});

app.get('/about', (req, res) =>{

  res.sendFile('./public/about.html', { root: __dirname });

});