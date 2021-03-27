const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRouter = require('./src/routers/user')
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/join-collections', {useNewUrlParser: true, useUnifiedTopology: true});

app.use("/api/v1",userRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})