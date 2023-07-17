const mongoose= require('mongoose')

const BoardModel = mongoose.model('Board', {
    name: String,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  });
  
  // Task model
  const TaskModel = mongoose.model('Task', {
    title: String,
    description: String,
    status: { type: String, enum: ['Todo', 'Doing', 'Done'], default: 'Todo' },
    subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subtask' }],
  });
  
  // Subtask model
  const SubtaskModel = mongoose.model('Subtask', {
    title: String,
    isCompleted: Boolean,
  })

        module.exports={
            BoardModel,TaskModel,SubtaskModel
        }