const { Router } = require('express')
const router = Router()
const Word = require('../models/word')

router.get('/', async (req, res) => {
  try {
    let folds = []

    await (
      await Word.find({})
    ).map(({ fold, _id }) => folds.push({ fold: fold, _id: _id }))

    uniqFolds = folds.reduce(
      (acc, cur) => [...acc.filter((obj) => obj.fold !== cur.fold), cur],
      []
    )

    const sortUniqFolds = uniqFolds.sort((a, b) => a.fold - b.fold)

    res.status(200).json(sortUniqFolds)
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
})

router.get('/number=:num', async (req, res) => {
  try {
    const { num } = req.params

    if (!num) {
      return res.status(400).json({ error: 'invalid data' })
    }

    const findWord = await Word.aggregate([
      { $match: { fold: +num, know: false } },
      { $sample: { size: 1 } },
    ])

    const [word] = findWord

    res.status(200).json(word)
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
})

router.get('/number=:num/know', async (req, res) => {
  try {
    const { num } = req.params

    const knowWord = await Word.find({ fold: +num, know: true })

    res.status(200).json(knowWord)
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
})

router.patch('/number=:num', async (req, res) => {
  try {
    const { num } = req.params
    const { wordId, controller } = req.body

    if (!wordId && controller && !num) {
      return res.status(400).json({ error: 'invalid data' })
    }

    if (controller === 1) {
      await Word.findOneAndUpdate(
        { _id: wordId },
        { $set: { know: true } },
        { new: true }
      )

      const words = await Word.find({ fold: +num, know: true })

      res.status(200).json(words)
    }

    if (controller === 2) {
      await Word.findOneAndUpdate(
        { _id: wordId },
        { $set: { know: false } },
        { new: true }
      )

      const words = await Word.find({ fold: +num, know: true })

      res.status(200).json(words)
    }
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
})

module.exports = router
