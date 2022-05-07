const { v4: uuid } = require("uuid");

let todos = [];

const todoController = {
    list: async (request, response) => {
        return response.status(200).json(todos);
    },
    create: async (request, response) => {
        const { body } = request;
        const todo = {
            id: uuid(),
            name: body.name,
            created_at: new Date(),
            updated_at: new Date(),
            done: false,
        };
    
    
        todos.push(todo);
    
        return response.status(201).json(todo);
    },
    findById: async (request, response) => {
        const { id } = request.params;

        const todoFound = todos.find((todo) => todo.id === id);

        if (!todoFound) {
            return response.status(404).json({ message: "TODO not found!" });
        }
        return response.status(200).json({ todoFound });
    },
    update: async (request, response) => {
        const { body, params } = request;
        const { id } = params;

        const index = todos.findIndex((todo) => todo.id === id);

        if (index < 0) {
            return response.status(404).json({ message: "TODO not found!" });
        }

        const updatedTodo = {
            ...todos[index],
            name: body.name,
            done: body.done,
            updated_at: new Date(),
        };

        todos[index] = updatedTodo;
        return response.status(200).json(updatedTodo);
    },
    delete: async (request, response) => {
        const { id } = request.params;

        const index = todos.findIndex((todo) => todo.id === id);

        if (!index < 0) {
            return response.status(204).send();
        }

        todos.splice(index, 1);

        return response.status(204).send();
    }
}

module.exports = todoController;