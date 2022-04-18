import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  fetchQuestion,
  fetchQuestionTheme,
  updateQuestionStatistics,
} from 'services/QuestionService'
import { IQuestion } from 'utils/interface'

const initialState = {
  question: {} as IQuestion,
  questionTheme: [] as IQuestion[],
  questionStatistics: [] as IQuestion[],
  isLoading: false,
  error: '',
}

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {},
  extraReducers: {
    //Get Qoustion Theme
    [fetchQuestionTheme.fulfilled.type]: (
      state,
      action: PayloadAction<IQuestion[]>
    ) => {
      state.isLoading = false
      state.error = ''
      state.questionTheme = action.payload
    },
    [fetchQuestionTheme.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchQuestionTheme.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false
      state.error = action.payload
    },
    //Get Qoustion
    [fetchQuestion.fulfilled.type]: (
      state,
      action: PayloadAction<IQuestion>
    ) => {
      state.isLoading = false
      state.error = ''
      state.question = action.payload
    },
    [fetchQuestion.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchQuestion.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    //Update Qoustion Statistics
    [updateQuestionStatistics.fulfilled.type]: (
      state,
      action: PayloadAction<IQuestion[]>
    ) => {
      state.isLoading = false
      state.error = ''
      state.questionStatistics = action.payload
    },
    [updateQuestionStatistics.pending.type]: (state) => {
      state.isLoading = true
    },
    [updateQuestionStatistics.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default questionSlice.reducer
