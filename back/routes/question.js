const { Router } = require('express')
const question = require('../models/question')
const router = Router()
const Question = require('../models/question')

router.get('/theme', async (req, res) => {
  try {
    const findJavaScriptQuestion = await Question.findOne({
      theme: 'JavaScript',
    })
    const findReactQuestion = await Question.findOne({ theme: 'React' })
    const findHTMLQuestion = await Question.findOne({ theme: 'HTML' })
    const findCssScssQuestion = await Question.findOne({ theme: 'CSS' })

    const questions = [
      findJavaScriptQuestion,
      findReactQuestion,
      findHTMLQuestion,
      findCssScssQuestion,
    ]

    res.status(200).json(questions)
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
})

router.get('/theme/:topic', async (req, res) => {
  try {
    const { topic } = req.params

    if (!topic) {
      return res.status(400).json({ error: 'invalid data' })
    }

    const findQiustion = await Question.aggregate([
      { $match: { theme: topic } },
      { $sample: { size: 1 } },
    ])

    const [question] = findQiustion

    const findQuestion = await Question.findOneAndUpdate(
      { _id: question._id },
      { $set: { howOffen: question.howOffen + 1 } },
      { new: true }
    )

    res.status(200).json(findQuestion)
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
})

router.patch('/theme/:theme', async (req, res) => {
  try {
    const { questionId, controlNumber } = req.body

    if (!questionId && !controlNumber) {
      return res.status(400).json({ error: 'invalid data' })
    }

    if (controlNumber === 1) {
      const findQiustion = await Question.findOne({ _id: questionId })

      const updated = await Question.findOneAndUpdate(
        { _id: questionId },
        { $set: { knew: findQiustion.knew + 1 } },
        { new: true }
      )

      return res.status(200).json([updated])
    }

    if (controlNumber === 2) {
      const findQiustion = await Question.findOne({ _id: questionId })

      const updated = await Question.findOneAndUpdate(
        { _id: questionId },
        { $set: { didntKnow: findQiustion.didntKnow + 1 } },
        { new: true }
      )

      return res.status(200).json([updated])
    }
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
})

module.exports = router
