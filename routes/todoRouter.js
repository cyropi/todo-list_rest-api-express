
import express from "express";

import { TodoController } from "../controllers/TodoController.js";
import { ensureUsersModifyOnlyOwnTodos } from "../middlewares/authorization.js";


export const todoRouter = express.Router();


todoRouter.route('/todos')
          .get(async (req, res, next) => {
                                             try 
                                             {
                                                 const todos = await TodoController.getTodosForCurrentUser(req);

                                                 res.json({ todos });
                                             } 
                                             catch (error) 
                                             {
                                                 next(error);  
                                             }
                                         })
          .post(async (req, res, next) => {
                                              try 
                                              {
                                                  const todo = await TodoController.saveTodo(req);
                                                  
                                                  res.status(201);
                                                  res.json({ todo });
                                              } 
                                              catch (error) 
                                              {
                                                  next(error);
                                              }
                                          });


todoRouter.route('/todos/:id')
          .get(ensureUsersModifyOnlyOwnTodos, async (req, res, next) => {
                                                                            try 
                                                                            {
                                                                                const item = await TodoController.findById(req);

                                                                                if (item) 
                                                                                    res.json({ item });
                                                                                else 
                                                                                    next({ status: 404, message: "Todo not found" });
                                                                            } 
                                                                            catch (error) 
                                                                            {
                                                                                next(error);
                                                                            }
                                                                        })
          .put(ensureUsersModifyOnlyOwnTodos, async (req, res, next) => {
                                                                            try
                                                                            {
                                                                                const item = await TodoController.update(req)

                                                                                if (item)
                                                                                    res.json({ item });
                                                                                else 
                                                                                    next({ status: 404, message: "Todo not found" });
                                                                            }
                                                                            catch (error)
                                                                            {
                                                                                next(error);
                                                                            }
                                                                        })
          .delete(ensureUsersModifyOnlyOwnTodos, async (req, res, next) => {
                                                                               try
                                                                               {
                                                                                   const item = await TodoController.delete(req);

                                                                                   if (item)
                                                                                       res.json({ item });
                                                                                   else 
                                                                                       next({ status: 404, message: "Todo not found" });
                                                                               }
                                                                               catch (error)
                                                                               {
                                                                                   next(error);
                                                                               }
                                                                           });    
