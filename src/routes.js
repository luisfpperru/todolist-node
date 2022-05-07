const express = require('express');
const router = express.Router();
const todoController = require('./TodoController');

router.get('/todos', todoController.list)

router.post('/todos', todoController.create)

router.get('/todos/:id', todoController.findById)

router.put('/todos/:id',todoController.update)

router.delete('/todos/:id', todoController.delete)

module.exports = router;