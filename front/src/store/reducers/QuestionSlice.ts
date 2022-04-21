import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  fetchQuestion,
  fetchQuestionStatistics,
  fetchQuestionTheme,
  updateQuestionStatistics,
} from 'services/QuestionService'
import { IQuestion } from 'utils/interface'

const initialState = {
  question: {} as IQuestion,
  questionTheme: [] as IQuestion[],
  questionStatistics: {} as Omit<IQuestion, 'answer' | 'question' | 'theme'>,
  statisticsIsLoading: false,
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
    //Get Qoustion Statistics
    [fetchQuestionStatistics.fulfilled.type]: (
      state,
      action: PayloadAction<IQuestion>
    ) => {
      state.statisticsIsLoading = false
      state.error = ''
      state.questionStatistics = action.payload
    },
    [fetchQuestionStatistics.pending.type]: (state) => {
      state.statisticsIsLoading = true
    },
    [fetchQuestionStatistics.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.statisticsIsLoading = false
      state.error = action.payload
    },
    //Update Qoustion Statistics
    [updateQuestionStatistics.fulfilled.type]: (
      state,
      action: PayloadAction<IQuestion>
    ) => {
      state.statisticsIsLoading = false
      state.error = ''
      state.questionStatistics = action.payload
    },
    [updateQuestionStatistics.pending.type]: (state) => {
      state.statisticsIsLoading = true
    },
    [updateQuestionStatistics.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.statisticsIsLoading = false
      state.error = action.payload
    },
  },
})

export default questionSlice.reducer
