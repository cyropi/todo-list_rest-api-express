
import { Todo } from "../models/Database.js";


export class TodoController 
{
	static async getTodosForCurrentUser(req)
	{
		let todos = await Todo.findAll({ where: { userN: req.username } });
    	return todos;
	}
	
	
	static async saveTodo(req)
	{ 
		let todo = await Todo.create({ 
							             todo: req.body.todo,
								         userN: req.username
							   		 });
		return todo;
	}


	static async findById(req)
	{
		let todo = await Todo.findByPk(req.params.id);
		return todo;
	}


	static async update(req)
	{
		let todo = await this.findById(req);
		if (todo == null) return null
		const { todo: todoUpdated, done: doneUpdated } = req.body;
		todo.set({ todo: todoUpdated, done: doneUpdated }); // update using fields which were passed in request
		return todo.save();
	}
	

	static async delete(req)
	{
		let todo = await this.findById(req);
		if (todo == null) return null
		await todo.destroy();
		return todo;
	}


}
