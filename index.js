const http = require('http');
require('dotenv').config();
const PORT = process.env.PORT

const server = http.createServer((req,res)=>{
   res.setHeader('Content-Type','text/plain');
   res.statusCode = 200
   res.write('Technical NodeJS Interview Preparation');
   res.end();
});

server.listen(PORT,()=>{
   console.log('Listning on PORT', PORT);
})