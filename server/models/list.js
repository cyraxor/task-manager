const mongoose = require('mongoose')
const validator= require('validator')

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
})

listSchema.virtual('tasks', {
  ref: 'task',
  localField: '_id',
  foreignField: 'listId'
})

const List = mongoose.model('list', listSchema)

module.exports = List
