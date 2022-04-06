const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'List'
  }
}, {
  timestamps: true
})

const Task = mongoose.model('task', taskSchema)



module.exports = Task
