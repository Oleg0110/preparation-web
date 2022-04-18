const { Router } = require('express')
const question = require('../models/question')
const router = Router()
const Tasks = require('../models/taskQuestion')

router.get('/', async (req, res) => {
  try {
    const findTask = await Tasks.aggregate([{ $sample: { size: 1 } }])

    const [task] = findTask

    const find = await Tasks.findOneAndUpdate(
      { _id: task._id },
      { $set: { howOffen: task.howOffen + 1 } },
      { new: true }
    )
    console.log(1, find)
    res.status(200).json(find)
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
})
router.get('/statistics', async (req, res) => {
  try {
    const findTask = await Tasks.aggregate([{ $sample: { size: 1 } }])

    const [task] = findTask

    const find = await Tasks.findOneAndUpdate(
      { _id: task._id },
      { $set: { howOffen: task.howOffen + 1 } },
      { new: true }
    )
    console.log(find)
    res.status(200).json(find)
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
})

router.patch('/', async (req, res) => {
  try {
    const { taskId, controlNumber } = req.body

    if (!taskId && !controlNumber) {
      return res.status(400).json({ error: 'invalid data' })
    }

    if (controlNumber === 1) {
      const findTask = await Tasks.findOne({ _id: taskId })

      const updated = await Tasks.findOneAndUpdate(
        { _id: taskId },
        { $set: { knew: findTask.knew + 1 } },
        { new: true }
      )

      return res.status(200).json(updated)
    }

    if (controlNumber === 2) {
      const findTask = await Tasks.findOne({ _id: taskId })

      const updated = await Tasks.findOneAndUpdate(
        { _id: taskId },
        { $set: { didntKnow: findTask.didntKnow + 1 } },
        { new: true }
      )

      return res.status(200).json(updated)
    }
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
})

module.exports = router
