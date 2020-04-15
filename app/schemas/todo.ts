import { Document, Model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";

export interface ITodo extends Document {
  details: string;
  isComplete: boolean;
}

export interface ITodoModel extends Model<ITodo> {
  createTodo(details: string): ITodo;
  getTodoById(id: string): ITodo;
  getTodos(page: number): [ITodo];
}

const TodoSchema: Schema = new Schema({
  details: { type: String, required: true },
  isComplete: { type: String, default: false },
});

TodoSchema.plugin(mongoosePaginate);

export default TodoSchema;
