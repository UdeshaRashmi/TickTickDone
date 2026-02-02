import Todo from "../models/todo.model.js";

// CREATE TODO
export const createTodo = async (req, res) => {
  const todo = await Todo.create({
    title: req.body.title,
    user: req.user
  });
  res.status(201).json(todo);
};

// GET TODOS
export const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user });
  res.json(todos);
};

// UPDATE TODO
export const updateTodo = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(todo);
};

// DELETE TODO
export const deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
};
