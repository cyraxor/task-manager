const express = require('express')
const { Task } = require('../models')
const auth = require('../middleware/auth')
const router = new express.Router()

// Create new Task
router.post('/lists/:listid/tasks', auth, async (req, res) => {
  const _id = req.params.listid
  const task = new Task({
    ...req.body,
    owner: req.user._id,
    listId: req.params.listid
  })
  // console.log(task)
  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send('Fehler:', e)
  }
})

//  read all my tasks of a single list
router.get('/lists/:listid/tasks', auth, async (req, res) => {
  // const match = {}
  // const sort = {}
  // const _id = req.params.listid
  try {
    const task = await Task.find({ listId: req.params.listid, owner: req.user._id })
    if (!task) {
      return res.status(404).send( {error: 'There is no task matching to you'})
    }
    res.send(task)
  } catch (e) {
    res.status(500).send()
  }


  // if (req.query.completed) {
  //     match.completed = req.query.completed === 'true'
  // }

  // if (req.query.sortBy) {
  //     const parts = req.query.sortBy.split(':')
  //     sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  // }
  // try {
  //     await req.user.populate({
  //         path: 'tasks',
  //         match,
  //         options: {
  //             limit: parseInt(req.query.limit) || 10,
  //             skip: parseInt(req.query.skip) || null,
  //             sort
  //         }
  //     })
  //     res.send(req.user.tasks)
  // } catch (e) {
  //     res.status(500).send(e)
  // }
})

// read single task from me
router.get('/lists/:listId/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findOne( { _id, owner: req.user._id })
    if (!task) {
        return res.status(404).send( {error: 'There is no task matching to you'})
    }
    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})

// Update Task
router.patch('/lists/:listId/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['title', 'completed']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalud updates!'})
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

    if (!task) {
      return res.status(404).send( {error: 'No task with this id for updating'})
    }
    updates.forEach((update) => task[update] = req.body[update])
    await task.save()
    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Delete own Task
router.delete('/lists/:listId/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id, listId: req.params.listId})

    if (!task) {
        return res.status(404).send({error: 'Invalid task id!'})
    }

    res.send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router
