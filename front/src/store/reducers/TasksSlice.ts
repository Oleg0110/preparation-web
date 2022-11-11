import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  fetchTask,
  fetchTaskStatistics,
  updateTaskStatistics,
} from 'services/TasksService'
import { ITask } from 'utils/interface'

const initialState = {
  task: {} as ITask,
  taskStatistics: {} as Omit<ITask, 'answer' | 'task'>,
  statisticsIsLoading: false,
  isLoading: false,
  error: '',
}

export const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: {
    //Get Task
    [fetchTask.fulfilled.type]: (state, action: PayloadAction<ITask>) => {
      state.isLoading = false
      state.error = ''
      state.task = action.payload
    },
    [fetchTask.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchTask.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    //Get Task Statistics
    [fetchTaskStatistics.fulfilled.type]: (
      state,
      action: PayloadAction<ITask>
    ) => {
      state.isLoading = false
      state.error = ''
      state.taskStatistics = action.payload
    },
    [fetchTaskStatistics.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchTaskStatistics.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false
      state.error = action.payload
    },
    //Update Task Statistics
    [updateTaskStatistics.fulfilled.type]: (
      state,
      action: PayloadAction<ITask>
    ) => {
      state.statisticsIsLoading = false
      state.error = ''
      state.taskStatistics = action.payload
    },
    [updateTaskStatistics.pending.type]: (state) => {
      state.statisticsIsLoading = true
    },
    [updateTaskStatistics.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.statisticsIsLoading = false
      state.error = action.payload
    },
  },
})

export default tasksSlice.reducer
