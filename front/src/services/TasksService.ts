import { createAsyncThunk } from '@reduxjs/toolkit'
import { TASK_LINK } from 'utils/httpLinks'
import { ITask } from 'utils/interface'
import axios from 'axios'

interface IUpdateKnewProps {
  taskId: string
  controlNumber: number
}

export const fetchTask = createAsyncThunk('task', async (_, thunkApi) => {
  try {
    const res = await axios.get<ITask>(TASK_LINK)

    return res.data
  } catch (error) {
    return thunkApi.rejectWithValue((error as Error).message)
  }
})

export const fetchTaskStatistics = createAsyncThunk(
  'task/statistics',
  async (taskId: string, thunkApi) => {
    try {
      const res = await axios.get<Omit<ITask, 'answer' | 'task'>>(
        `${TASK_LINK}/${taskId}`
      )

      return res.data
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message)
    }
  }
)

export const updateTaskStatistics = createAsyncThunk(
  'task/update',
  async (arg: IUpdateKnewProps, thunkApi) => {
    try {
      const { taskId, controlNumber } = arg

      const res = await axios.patch<Omit<ITask, 'answer' | 'task'>>(TASK_LINK, {
        taskId,
        controlNumber,
      })
      console.log(2, res.data)

      return res.data
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message)
    }
  }
)
