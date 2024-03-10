import express from "express";
import path from 'path';

const app = express();
const port = 3000;
const __dirname = path.resolve();

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
