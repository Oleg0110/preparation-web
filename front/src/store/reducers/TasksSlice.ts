import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  fetchTask,
  fetchTaskStatistics,
  updateTask,
} from 'services/TasksService'
import { ITask } from 'utils/interface'

const initialState = {
  tasks: {} as ITask,
  tasksStatistics: {} as ITask,
  isLoading: false,
  error: '',
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: {
    //Get Task
    [fetchTask.fulfilled.type]: (state, action: PayloadAction<ITask>) => {
      state.isLoading = false
      state.error = ''
      state.tasks = action.payload
    },
    [fetchTask.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchTask.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    //
    [fetchTaskStatistics.fulfilled.type]: (
      state,
      action: PayloadAction<ITask>
    ) => {
      state.isLoading = false
      state.error = ''
      state.tasksStatistics = action.payload
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
    [updateTask.fulfilled.type]: (state, action: PayloadAction<ITask>) => {
      state.isLoading = false
      state.error = ''
      state.tasks = action.payload
    },
    [updateTask.pending.type]: (state) => {
      state.isLoading = true
    },
    [updateTask.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default tasksSlice.reducer
