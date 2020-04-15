import crypto from "crypto";
import { sign } from "jsonwebtoken";
import mongoose from "mongoose";
import env from "../config/environment";
import TodoSchema, { ITodo, ITodoModel } from "../schemas/todo";
import dateUtils from "../utils/date";
import logger from "../utils/logger";

const { SECRET } = env;
const PAGINATION_LIMIT = 10;

const createTodo = async (details: string) => {
  try {
    const todo = new Todo({ details });
    await todo.save();
    return todo;
  } catch (err) {
    logger.error("Error: ", err);
    throw Error("Could not create new todo.");
  }
};

const getTodoById = async (id: string) => {
  try {
    return await Todo.findById(id);
  } catch (err) {
    logger.error("Error: ", err);
    throw err;
  }
};

const getTodos = async (page: number, complete?: boolean) => {
  try {
    // @ts-ignore
    // TODO: add createdAt field and sort properly.
    const { docs, total, limit, page: pageNum, pages } = await Todo.paginate(
      {
        isComplete: complete
      },
      {
        page,
        limit: PAGINATION_LIMIT,
        lean: true,
        sort: { createdAt: -1 },
      },
    );
    return { todos: docs, total, limit, page: pageNum, pages };
  } catch (err) {
    logger.error("Error: ", err);
    throw new Error(`Could not get new todos.`);
  }
};

TodoSchema.statics.createTodo = createTodo;

TodoSchema.statics.getTodoById = getTodoById;

TodoSchema.statics.getTodos = getTodos;

const Todo = mongoose.model<ITodo, ITodoModel>("Todo", TodoSchema);

export default Todo;
