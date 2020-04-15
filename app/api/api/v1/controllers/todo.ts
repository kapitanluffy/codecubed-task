import { NextFunction, Request, Response } from "express";
import passport from "passport";
import Todo from "../../../../models/todo";
import errors from "../../../../utils/errors";
import logger from "../../../../utils/logger";

const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { details } = req.body;

    if (!details) {
      throw errors.invalidParams("Details are required.", next);
    }

    const _todo = await Todo.createTodo(details);
    return res.send({ todo: _todo });
  } catch (err) {
    logger.error("Error: ", err);
    return errors.internalError(next);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw errors.invalidParams("ID is required.", next);
    }

    const _todo = await Todo.getTodoById(id);
    return res.send({ data: _todo });
  } catch (err) {
    logger.error("Error: ", err);
    return errors.internalError(next);
  }
};

const listTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { page, complete } = req.query;

    if (!page) page = 1
    if (!complete) complete = false

    const _list = await Todo.getTodos(parseInt(page), complete);
    return res.send({ data: _list });
  } catch (err) {
    logger.error("Error: ", err);
    return errors.internalError(next);
  }
};

const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  // email, newPassword
  const { id } = req.params;

  if (!id) {
    throw errors.invalidParams("ID is required.", next);
  }

  try {
    await Todo.findOneAndDelete({ _id: id });
    return res.sendStatus(200);
  } catch (err) {
    logger.error("Error: ", err);
    return errors.internalError(next);
  }
};

const completeTodo = async (req: Request, res: Response, next: NextFunction) => {
  // email, newPassword
  const { id } = req.params;

  if (!id) {
    throw errors.invalidParams("ID is required.", next);
  }

  try {
    await Todo.findOneAndUpdate({ _id: id }, { isComplete: true });
    return res.sendStatus(200);
  } catch (err) {
    logger.error("Error: ", err);
    return errors.internalError(next);
  }
};

export default {
  listTodos,
  createTodo,
  getById,
  deleteTodo,
  completeTodo,
};
