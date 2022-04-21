const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

app.use('/question', require('./routes/question'))
app.use('/words-pages', require('./routes/word'))
app.use('/task', require('./routes/task'))

const asyncStart = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://Oleg:1234567890@react.9fxwt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
      }
    )
    app.listen(5000, () => {
      console.log('Start on port 5000.....')
    })
  } catch (error) {
    console.log(error)
  }
}

asyncStart()
