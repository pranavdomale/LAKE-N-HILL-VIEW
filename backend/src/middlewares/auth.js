const jwt=require('jsonwebtoken');

async function getToken(req,res,next) {
    const token =req.cookies.userToken;
    if(!token){
        return res.status(401).json({message:"Unauthorized"});

    }
    const key="user_key";
    const data=await jwt.verify(token,key);

    if(!data){
        return res.status(400).res({error:"error in decoding token"});
    }

    req.user=data;
    next();
}
module.exports={getToken}