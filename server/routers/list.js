const express = require('express')
const List = require('../models/list')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

// Create new List
router.post('/lists', auth, async( req, res) => {
  const list = new List({
    ...req.body,
    owner: req.user._id
  })

  try {
    await list.save()
    res.status(201).send(list)
  } catch (error) {
    res.status(400).send('Error: ', error)
  }
})

//  read all my lists
router.get('/lists', auth, async (req, res) => {
  const match = {}
  const sort = {}
  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    await req.user.populate({
      path: 'lists',
      match,
      options: {
        limit: parseInt(req.query.limit) || 10,
        skip: parseInt(req.query.skip) || null,
        sort
      }
    })
    res.send(req.user.lists)
  } catch (e) {
    res.status(500).send(e)
  }
})

// read single list from me
router.get('/lists/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const list = await List.findOne( { _id, owner: req.user._id })
    if (!list) {
      return res.status(404).send( {error: 'There is no list matching to you'})
    }
    res.send(list)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
