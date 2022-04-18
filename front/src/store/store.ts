import { combineReducers, configureStore } from '@reduxjs/toolkit'
import questionReducer from './reducers/QuestionSlice'
import wordReduser from './reducers/WordSlice'
import tasksReduser from './reducers/TasksSlice'

const rootReducer = combineReducers({
  questionReducer,
  wordReduser,
  tasksReduser,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
