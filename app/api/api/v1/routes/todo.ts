// TODO: role-based auth.
import express from "express";
import jwt from "express-jwt";
import env from "../../../../config/environment";
import todoController from "../controllers/todo";

const { SECRET } = env;

const router = express.Router();

const getTokenFromHeaders = (req) => {
  const {
    headers: { authorization },
  } = req;

  if (authorization && authorization.split(" ")[0] === "Token") {
    return authorization.split(" ")[1];
  }

  return null;
};

const auth = {
  required: jwt({
    secret: SECRET,
    userProperty: "payload",
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: SECRET,
    userProperty: "payload",
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

router.get("/:id", auth.optional, todoController.getById);
router.post("/:id/complete", auth.optional, todoController.completeTodo);
router.delete("/:id", auth.optional, todoController.deleteTodo);

router.get("/", auth.optional, todoController.listTodos);
router.post("/", auth.optional, todoController.createTodo);

export default router;
