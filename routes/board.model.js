const express= require('express')
const { BoardModel, TaskModel, SubtaskModel } = require('../model/user.model')
const boardRouter = express.Router()


boardRouter.get("/",(req,res)=>{
    res.send("board")
})

boardRouter.post('/api/boards', async (req, res) => {
    try {
      const { name } = req.body;
      const board = new BoardModel({ name });
      await board.save();
      res.json(board);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create board' });
    }
  });
  
  boardRouter.get('/api/boards', async (req, res) => {
    try {
      const boards = await BoardModel.find().populate('tasks');
      res.json(boards);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch boards' });
    }
  });
  
  // Create a new task
  boardRouter.post('/api/tasks', async (req, res) => {
    try {
      const { title, description, status, subtasks } = req.body;
      const task = new TaskModel({ title, description, status, subtasks });
      await task.save();
  
      // Add the task to the board
      const boardId = req.body.boardId;
      const board = await BoardModel.findById(boardId);
      board.tasks.push(task);
      await board.save();
  
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create task' });
    }
  });
  
  // Update a task
  boardRouter.put('/tasks/:taskId', async (req, res) => {
    try {
      const { taskId } = req.params;
      const { title, description, status, subtasks } = req.body;
  
      const task = await TaskModel.findByIdAndUpdate(taskId, { title, description, status, subtasks }, { new: true });
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  });
  
  // Delete a task
  boardRouter.delete('/tasks/:taskId', async (req, res) => {
    try {
      const { taskId } = req.params;
  
      // Remove the task from the board
      const boardId = req.body.boardId;
      const board = await BoardModel.findById(boardId);
      board.tasks.pull(taskId);
      await board.save();
  
      // Delete the task and its subtasks
      await TaskModel.findByIdAndDelete(taskId);
      await SubtaskModel.deleteMany({ task: taskId });
  
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  });
module.exports={
    boardRouter
}