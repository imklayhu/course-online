// server.js mock server
const jsonServer = require('json-server');
const db = require('./db.js');
const routes = require('./routes.js');
const port = 4000;

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();
const rewriter = jsonServer.rewriter(routes);

server.use(middlewares);
server.use((resquire,res,next)=>{
  require.method = 'GET';
  next();
})

server.use(rewriter);
server.use(router);

server.listen(port,()=>{
  console.log(`open mock server at localhost:${port}`);
})