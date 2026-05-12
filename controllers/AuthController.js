
import { TodoController } from '../controllers/TodoController.js';


export async function ensureUsersModifyOnlyOwnTodos(req, res, next)
{
	const user = req.username;
	const todoId = req.params.id;
	
	const userHasPermission = await TodoController.canUserModifyTodo(user, todoId);

  	if (userHasPermission)
		next();
 	else 
	{
		next({ 
			     status: 403, 
			     message: "Forbidden! You do not have permissions to view or modify this resource." 
			 });
  	}
}
