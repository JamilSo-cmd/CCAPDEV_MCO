import express from "express";

const app = express();
const port = 3000;

const http = require('http');
const fs = require('fs');    

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

http.createServer(function (req,res){

    fs.readFile('index.html', function (err, data){

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();

    });

}).listen(3000);