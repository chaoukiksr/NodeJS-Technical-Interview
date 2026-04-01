const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const parseCookies = (rawPayload) =>{
   if (!rawPayload) return null;
   const cookies = {};
   rawPayload.split(';').forEach(pair => {
      const [key, value] = pair.trim().split('=');
      cookies[key] = value;
   })

   return cookies;
}
const verifyToken = (req,res)=>{
   let cookies = parseCookies(req.headers.cookie);
   const token = cookies['token'];
   if(!token) return null;
   return jwt.verify(token,SECRET)
}

module.exports = {verifyToken}