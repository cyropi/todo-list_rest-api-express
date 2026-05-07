
import Jwt from "jsonwebtoken";


export function generateToken(username) 
{
    return Jwt.sign({ username: username }, 
                    process.env.TOKEN_SECRET, 
                    { expiresIn: `${24*60*60}s` });
}  


export function verifyToken(token)
{
    return Jwt.verify(token, 
                      process.env.TOKEN_SECRET);
}
