import { Router } from "express";
import { getAllTodosCtrl } from "../controllers/todos.controllers.js";
import { createTodoCtrl } from "../controllers/todos.controllers.js";
import { updateTodoCtrl } from "../controllers/todos.controllers.js";
import { deleteTodoCtrl } from "../controllers/todos.controllers.js";
import  validarJwt  from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/", validarJwt, getAllTodosCtrl);
todosRouter.post("/", validarJwt, createTodoCtrl);
todosRouter.put("/:id", validarJwt, updateTodoCtrl);
todosRouter.delete("/:id", validarJwt, deleteTodoCtrl);

export { todosRouter };