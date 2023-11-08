const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults({
    static: "../build"
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
server.use(router);
server.listen(port, ()=>{
    console.log('jsonserver is running!!');
});