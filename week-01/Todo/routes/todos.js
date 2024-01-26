const express = require('express');
const router= express.Router();

//import controller
const {createtodo}=require('../controllers/createtodo');

const {getTodo,getTodoById
}=require('../controllers/getTodo');

const {updateTodo}=require('../controllers/updateTodo');
const {deleteTodo}=require('../controllers/deleteTodo');



// define api routes
router.post('/createtodo',createtodo);
router.get('/getTodos',getTodo);
router.get('/getTodos/:id',getTodoById);
router.put('/updateTodo/:id',updateTodo);
router.delete('/deleteTodo/:id',deleteTodo);




module.exports = router;