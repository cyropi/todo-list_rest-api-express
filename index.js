
"use strict";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import { todoRouter } from "./routes/todoRouter.js";
import { authenticationRouter } from "./routes/authenticationRouter.js";
import { resetRouter } from "./routes/resetRouter.js";
import { enforceAuthentication } from "./middlewares/authentication.js";


function main()
{
    const app = express();
    const PORT = 3000;

    // generate OpenAPI spec, using swaggerJSDoc -> returns validated swagger spec in json format
    const swaggerSpec = swaggerJSDoc({
                                         definition: 
                                         {
                                            openapi: '3.1.0',
                                            info: 
                                            {
                                                title: 'To-do List REST API',
                                                version: '1.0.0'
                                            }
                                        },
                                         apis: ['./routes/*Router.js'], // files containing annotations
                                     });


    // IMPORTED MIDDLEWARE
    app.use(morgan("dev"));
    app.use(cors());
    app.use(express.json());
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec)); // show swagger ui


    // CUSTOM MIDDLEWARE


    // ROUTES
    app.use(authenticationRouter);
    app.use(enforceAuthentication); // all routes defined after this line will require authentication
    app.use(todoRouter)
    app.use(resetRouter);


    app.use((err, req, res, next) => {
                                         console.error(err.stack);

                                         res.status(err.status || 500)
                                            .json({ 
                                                      code: err.status || 500,
                                                      description: err.message || "An error occurred"
                                                  });
                                     });

    
    app.listen(PORT);
}


main();
