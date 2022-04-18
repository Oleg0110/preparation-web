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
  async (_, thunkApi) => {
    try {
      const res = await axios.get<ITask>(`${TASK_LINK}/statistics`)

      return res.data
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message)
    }
  }
)

export const updateTask = createAsyncThunk(
  'task/update',
  async (arg: IUpdateKnewProps, thunkApi) => {
    try {
      const { taskId, controlNumber } = arg

      const res = await axios.patch<ITask>(TASK_LINK, {
        taskId,
        controlNumber,
      })
      console.log(res.data)

      return res.data
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message)
    }
  }
)
