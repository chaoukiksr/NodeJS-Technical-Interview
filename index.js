const http = require('http');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT
const SECRET = process.env.SECRET
const users = [
   { id: 1, name: 'Chaouki Kess', email: 'chaouki.kess092@gmail.com', password: '123', role: 'admin' },
   { id: 2, name: 'Sara Benali', email: 'sara.benali@gmail.com', password: 'abc123', role: 'user' },
   { id: 3, name: 'Yassine Idrissi', email: 'yassine.idrissi@gmail.com', password: 'pass456', role: 'user' },
   { id: 4, name: 'Nora Haddad', email: 'nora.haddad@gmail.com', password: 'nora789', role: 'manager' },
   { id: 5, name: 'Amine Tazi', email: 'amine.tazi@gmail.com', password: 'amine321', role: 'user' }
]
const server = http.createServer((req,res)=>{

   let url = req.url;
   let method = req.method
   res.setHeader('Content-Type','text/html');

   if(url === "/" && method === "GET"){
      res.statusCode = 200
      res.write('<p>Technical NodeJS Interview Preparation </p>');
      res.end();
   }
   else if (url === '/auth/login' && method === "POST"){
      
      let body = "";
      req.on('data', (chunk)=>{
         body += chunk.toString();
      })
      req.on('end', ()=>{
         let parsedBody;
         try {
           parsedBody = JSON.parse(body);
         } catch (error) {
            console.log(error);
            res.statusCode = 400;
            res.write('Invalid Credintials');
            return res.end();
         }
         const { email, password }  = parsedBody;
         if(!email || !password){
            res.statusCode = 400;
            res.write('Missing informations');
            return res.end();
         }

         const user = users.find(x=>x.email === email);
       
         if(!user){
            res.statusCode = 400;
            res.write('User does not exist');
           return res.end();
         }

         if(user.password === password){
            const token = jwt.sign({id:user.id,password:user.password,role:user.role},SECRET,{
               expiresIn:"1d",
            });

            res.setHeader('Set-Cookie', [
               `token=${token};HttpOnly;path=/;SameSite = Lax`
            ])

            res.statusCode = 302;
            
            res.setHeader('Location','/me');
            return res.end();
         }else{
            res.statusCode = 401;
            res.write(`Unvalid password`);
            return res.end();
         }
        
      });
   } else if(url === '/auth/signup' && method === "POST"){
      let body = "";

      res.setHeader('Content-Type','text/plain');
      req.on('data', (chunk)=>{
         body += chunk;
      })
      req.on('end', ()=>{
         let parsedBody;
         try {
            parsedBody = JSON.parse(body);
         } catch (error) {
            console.log(error);
            res.statusCode = 400;
            res.write('Invalid Credintials');
            return res.end();
         }
         const { name,email,password,role} = parsedBody;
         if(!name || !email || !password || !role){
            console.log('missing signup data');
            res.statusCode = 400;
            res.write('missing signup data');
            return res.end();
         }
         if(users.find(user => user.email === email)) {
            console.log(`a user with this email ${email} already exist`);
            res.statusCode = 400;
            res.write(`a user with this email ${email} already exist`);
            return res.end();
         }
         const newUser = { id: users.length + 2, name: name, email: email, password: password, role: role }; 
         users.push(newUser);
         res.statusCode = 201;
         res.write(`A new user is created, Welcome: ${name}`);
         return res.end();
      })
   } else if (url ==='/me' && method ==='GET'){

      let rawPayload = req.headers.cookie;
      if(!rawPayload) return null;
      const cookies = {};

      rawPayload.split(';').forEach(pair =>{
         const [key,value] = pair.trim().split('=');
         cookies[key] = value;
      })

      let token = cookies['token'];
      console.log(token);
      const payload = jwt.verify(token,SECRET);
      res.statusCode = 200;
      res.write(`welcome:${payload.id}`);
      return res.end();
   } else{
      res.statusCode = 404;
      res.write('Route is not found');
      res.end();
   }
   
});

server.listen(PORT,()=>{
   console.log('Listning on PORT', PORT);
})