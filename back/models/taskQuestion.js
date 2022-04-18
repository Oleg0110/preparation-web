const { Schema, model } = require('mongoose')

const schema = new Schema({
  text: { type: String, required: true },
  answer: { type: String, required: true },
  howOffen: { type: Number, required: true },
  knew: { type: Number, required: true },
  didntKnow: { type: Number, required: true },
})

module.exports = model('TaskQustion', schema)
