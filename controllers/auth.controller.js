const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { verifyToken } = require('../middlewares/auth.middelware.js');
const users = require('../models/user.model.js');

function parseBody(req) {
   return new Promise((resolve, reject) => {
      let body = "";
      req.on('data', (chunck) => data += chunck);
      req.on('end', () => {
         try {
            resolve(JSON.parse(body));
         } catch (error) {
            reject(new Error('Invalid JSON'))
         }
      })
   })
}

const login = async (req, res) => {
   const { email, password } = await parseBody(req);

   if (!email || !password) {
      res.statusCode = 400;
      res.write('Missing informations');
      return res.end();
   }

   const user = users.find(x => x.email === email);

   if (!user) {
      res.statusCode = 400;
      res.write('User does not exist');
      return res.end();
   }

   if (user.password === password) {
      const token = jwt.sign({ id: user.id, password: user.password, role: user.role }, SECRET, {
         expiresIn: "1d",
      });

      res.setHeader('Set-Cookie', [
         `token=${token};HttpOnly;path=/;SameSite = Lax`
      ])

      res.statusCode = 302;

      res.setHeader('Location', '/me');
      return res.end();
   } else {
      res.statusCode = 401;
      res.write(`Unvalid password`);
      return res.end();
   }
}

const signup = async (req, res) => {
   const { name, email, password, role } = await parseBody(req);
   if (!name || !email || !password || !role) {
      console.log('missing signup data');
      res.statusCode = 400;
      res.write('missing signup data');
      return res.end();
   }
   if (users.find(user => user.email === email)) {
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
}
const me = (req,res)=>{
  const payload =  verifyToken(req,res);
  if(!payload) {
   res.statusCode = 401
   return res.end();
   }
   res.statusCode = 200;
   res.end(`welcome: ${payload.id}`)
}
module.exports = { login, signup,me }