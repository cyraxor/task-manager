const express = require('express')
require('./db/mongoose')

const app = express()
const port = process.env.PORT

// Router handling
const { listRouter, taskRouter, userRouter } = require('./routers')

// CORS Headers Middleware
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Auth-Token, X-Requested-With, Content-Type, Accept, Authorization, X-Custom-header,  x-access-token, x-refresh-token, _id');
  res.setHeader('Access-Control-Allow-Origin', 'http://deneb.traubing.local');
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Expose-Headers','x-access-token, x-refresh-token');
  next()
})


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use(listRouter)

app.listen(port, () => {
  console.log('Server is up at port ' + port)
})
