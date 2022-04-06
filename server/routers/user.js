const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const auth = require('../middleware/auth')
const User = require('../models/user')
const {sendWelcomeEmail, sendDeleteEmail } = require('../emails/account')
const router = new express.Router()

//  Create new User
router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    sendWelcomeEmail(user.email, user.name)
    const token = await user.generateAuthToken()
    res.status(201).send({user, token})
  } catch (e) {
    res.status(400).send(e)
  }
})

// Login User
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({user, token})
  } catch (e) {
    res.status(400).send()
  }
})

// logout User
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.session = req.user.session.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()

    res.send('User logged out successfully')
  } catch (e) {
    res.status(500).send()
  }
})

// logout user everywhere
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.session= []
    await req.user.save()

    res.send('User logged out everywhere')
  } catch (e) {
    res.status(500).send()
  }
})

// read me
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

// read all users
router.get('/users', auth, async (req, res) => {
  try {
    const user = await User.find({})
    res.send(user)
  } catch (e) {
    res.status(500).send()
  }
})

// Update User
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!'})
  }
  try {
    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()

    res.send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Delete User
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    sendDeleteEmail(req.user.email, req.user.name)
    res.send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

// preparing Avatar Upload
const upload = multer({
  limits: {
    fileSize: 1048576
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
      return cb(new Error('Only images from jpg, jpeg or png are allowed'))
    }
    cb(undefined, true)
  }
})

// Upload Avatar Image and crop it to defined size
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
  req.user.avatar = buffer

  await req.user.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({error: error.message})
})

// Delete Avatar image
router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined
  await req.user.save()
  res.send({message: 'avatar deleted'})
})

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user || !user.avatar) {
      throw new Error()
    }

    res.set('Content-Type', 'image/jpg')
    res.send(user.avatar)
  } catch (e) {
    res.status(404).send()
  }
})
module.exports = router
