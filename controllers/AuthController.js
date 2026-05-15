
import { User } from "../models/Database.js";
import { generateToken } from "../utils/jwtUtils.js";


export class AuthController
{
    static async checkCredentials(req, res) 
    {
        let user = new User({ 
                                userName: req.body.username, // user data specified in the request
                                password: req.body.password
                            });

        let found = await User.findOne({ 
                                           where: 
                                           {
                                               userName: user.userName,
                                               password: user.password // password was hashed when creating user
                                           }
                                        });

        if (found === null)
            return false;
        else 
            return generateToken(user.userName);
    }


    static async saveUser(req, res)
    {
        let user = new User({ 
                                userName: req.body.username, 
                                password: req.body.password
                            });
        return user.save();
    }
}
