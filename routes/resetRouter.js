
import express from 'express'

import { ResetController } from '../controllers/ResetController.js'


export const resetRouter = express.Router();


resetRouter.post('/reset', async (req, res, next) => {
                                                         try 
                                                         {
                                                             await ResetController.resetApp(req, res);

                                                             res.json();
                                                         } 
                                                         catch (error) 
                                                         {
                                                             next(error);
                                                         }
                                                     });