
import { database } from "../models/Database.js";


export class ResetController
{
    static async resetApp(req, res)
    {
        return database.sync({ force: true }); // drop and re-create all tables
    }
}
