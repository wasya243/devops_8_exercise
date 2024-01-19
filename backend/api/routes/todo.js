const express = require('express');

const { todoHandlers } = require('../handlers');

const router = express.Router();

router.get('/todos/:userId', todoHandlers.getTodos);
router.post('/todo', todoHandlers.createTodo);
router.delete('/todo/:id', todoHandlers.deleteTodo);
router.put('/todo/:id', todoHandlers.updateTodo);

module.exports = router;