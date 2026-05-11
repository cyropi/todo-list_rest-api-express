
import { verifyToken } from '../utils/jwtUtils.js';


export function enforceAuthentication(req, res, next)
{
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token)
    {
        next({ status: 401, message: "Unauthorized" });
        return;
    }

    try 
    {
        const decodedToken = verifyToken(token);
        req.username = decodedToken.username;

        next();
    }
    catch (error)
    {
        next({ status: 401, message: "Unauthorized" });
    }
}
