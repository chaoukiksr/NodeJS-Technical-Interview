const http = require('http');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT
const router = require('./routes/auth.routes.js')
const server = http.createServer((req,res)=>{
   res.setHeader('Content-Type','text/plain');
   router(req,res);
});

server.listen(PORT,()=>{
   console.log('Listning on PORT', PORT);
})