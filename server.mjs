import express from 'express';
import path from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();
const port = 3000;
const __dirname = path.resolve();

app.use(express.urlencoded({ extended: true })); // Add this line for form data


// MongoDB connection setup
const uri = "mongodb+srv://ZTORlIlsVr6pGCNc:ZTORlIlsVr6pGCNc@cluster0.bvg7nag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
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

app.use(express.static('public'))

app.get('/', (req, res) =>{

  res.sendFile('./public/index.html', { root: __dirname });

});

app.get('/index', (req, res) =>{

  res.sendFile('./public/index.html', { root: __dirname });

});

app.get('/search', (req, res) =>{

  res.sendFile('./public/search.html', { root: __dirname });

});

app.get('/login', (req, res) =>{

  res.sendFile('./public/login.html', { root: __dirname });

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
    return res.redirect('/index.html'); // Change the redirect URL as needed

  } catch (error) {
    console.error("Error occurred during login:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

app.get('/profile', (req, res) =>{

  res.sendFile('./public/profile.html', { root: __dirname });

});

app.get('/create', (req, res) =>{

  res.sendFile('./public/create.html', { root: __dirname });

});

app.get('/delete', (req, res) =>{

  res.sendFile('./public/delete.html', { root: __dirname });

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
          password: password
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

app.get('/editProfile', (req, res) =>{

  res.sendFile('./public/editProfile.html', { root: __dirname });

});

app.get('/viewpost', (req, res) =>{

  res.sendFile('./public/viewpost.html', { root: __dirname });

});
