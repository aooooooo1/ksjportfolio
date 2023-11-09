const express = require('express');
const path = require('path');
const app = express();

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults({
    static: "./build"
});


const port = process.env.PORT || 3002;

server.use(middlewares);

server.use(
    jsonServer.rewriter({
        "/api/posts*": "/posts/$1",
        "/api/user*": "/user/$1",
        "/api/adminPosts*": "/adminPosts/$1",
        "/api/comments*": "/comments/$1",
        "/api/likePost*": "/likePost/$1",
    })
);

// app.get('./*', function(req, res){
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.listen(port, () => {
//     console.log('Server is running!');
// });

server.use(router);
server.listen(port, ()=>{
    console.log('jsonserver is running!!');
});