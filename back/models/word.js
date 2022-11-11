const { Schema, model } = require('mongoose')

const schema = new Schema({
  engWord: { type: String, required: true },
  uaWord: { type: String, required: true },
  fold: { type: Number, required: true },
  know: { type: Boolean, required: true },
})

module.exports = model('Word', schema)
