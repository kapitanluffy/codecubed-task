import { Document, Model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";

export interface ITodo extends Document {
  details: string;
  isComplete: boolean;
  createdAt: string;
}

export interface ITodoModel extends Model<ITodo> {
  createTodo(details: string): ITodo;
  getTodoById(id: string): ITodo;
  getTodos(page: number, complete?: boolean): [ITodo];
}

const TodoSchema: Schema = new Schema({
  details: { type: String, required: true },
  isComplete: { type: String, default: false },
  createdAt: { type: String, default: function(){ return Date.now() } },
});

TodoSchema.plugin(mongoosePaginate);

export default TodoSchema;
