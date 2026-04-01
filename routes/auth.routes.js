const {login, signup, me} = require('../controllers/auth.controller.js');
const router = (req,res) =>{
   const {url,method} = req;
   if (url === "/" && method === "GET") {
      res.statusCode = 200
      res.write('<p>Technical NodeJS Interview Preparation </p>');
      res.end();
   }
   else if (url === '/auth/login' && method === "POST") {
      login(req, res);
   }

   else if (url === '/auth/signup' && method === "POST") {
      signup(req, res);

   } else if (url === '/me' && method === 'GET') {
      me(req, res)

   } else {
      res.statusCode = 404;
      res.write('Route is not found');
      res.end();
   }
}

module.exports = router;