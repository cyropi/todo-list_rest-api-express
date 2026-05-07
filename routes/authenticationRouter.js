

import express from 'express';

import { AuthController } from '../controllers/AuthController.js';


export const authenticationRouter = express.Router();


authenticationRouter.route('/auth')
                    .post(async (req, res) => { 
                                                  const token = await AuthController.checkCredentials(req, res); 

                                                  if (token)
                                                    res.json({ token: token });
                                                  else
                                                  {
                                                      res.status(401);
                                                      res.json({ errors: ["Invalid credentials. Try again."] });
                                                  }
                                              });


authenticationRouter.route('/signup')
                    .post(async (req, res) => { 
                                                  AuthController.saveUser(req, res).then((user) => {
                                                                                                       res.status(201);
                                                                                                       res.json(user);
                                                                                                   })
                                                                                   .catch((err) => {
                                                                                                       res.status(500);
                                                                                                       res.json({ errors: [`Could not save user (${err}). Try again.`] });
                                                                                                   });         
                                              });
