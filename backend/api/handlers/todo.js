const { Todo } = require('../../db/models/todo');

const createTodo = async (req, res, next) => {
  try {
    const { text, userId } = req.body;

    await Todo.create({
      text,
      userId
    });

    res.send('created');
  } catch (err) {
    next(err);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { completed } = req.body;

    await Todo.findOneAndUpdate({ _id: id }, { $set: { completed: completed } });

    res.send('updated');
  } catch (err) {
    next(err);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const id = req.params.id;

    await Todo.findOneAndDelete({ _id: id });

    res.send('deleted');
  } catch (err) {
    next(err);
  }
};

const getTodos = async (req, res, next) => {
  try {
    const id = req.params.userId;

    const todos = await Todo.find({ userId: id });

    res.send(todos);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodos
};