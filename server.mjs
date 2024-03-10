import express from "express";
import path from 'path';
import {MongoClient,ServerApiVersion} from 'mongodb';

const app = express();
const port = 3000;
const __dirname = path.resolve();
const uri = "mongodb+srv://ZTORlIlsVr6pGCNc:ZTORlIlsVr6pGCNc@cluster0.bvg7nag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

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

app.get('/editPost', (req, res) =>{

  res.sendFile('./public/editPost.html', { root: __dirname });

});

app.get('/editProfile', (req, res) =>{

  res.sendFile('./public/editProfile.html', { root: __dirname });

});

app.get('/viewpost', (req, res) =>{

  res.sendFile('./public/viewpost.html', { root: __dirname });

});
