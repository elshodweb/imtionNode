let { Router } = require("express");
const {
  getTodo,
  postTodo,
  deleteTodo,
  putTodos,
} = require("../controllers/todos.controllers");

let todosRouter = new Router();

todosRouter.get(["/todos", "/todos/:id"], getTodo);
todosRouter.post("/todos", postTodo);

todosRouter.put("/todos/:id", putTodos);

todosRouter.delete("/todos/:id", deleteTodo);

module.exports = todosRouter;
