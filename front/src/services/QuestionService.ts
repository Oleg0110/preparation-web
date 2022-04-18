import { createAsyncThunk } from '@reduxjs/toolkit'
import { QUESTION_THEME_LINK } from 'utils/httpLinks'
import { IQuestion } from 'utils/interface'
import axios from 'axios'

interface IUpdateKnewProps {
  questionTheme: string
  questionId: string
  controlNumber: number
}

export const fetchQuestionTheme = createAsyncThunk(
  'question/getAllTheme',
  async (_, thunkApi) => {
    try {
      const res = await axios.get<IQuestion[]>(QUESTION_THEME_LINK)

      return res.data
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message)
    }
  }
)
export const fetchQuestion = createAsyncThunk(
  'question/getCurrentTheme',
  async (theme: string, thunkApi) => {
    try {
      const res = await axios.get<IQuestion[]>(
        `${QUESTION_THEME_LINK}/${theme}`
      )
      console.log(res.data)

      return res.data
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message)
    }
  }
)

export const updateQuestionStatistics = createAsyncThunk(
  'question/update',
  async (arg: IUpdateKnewProps, thunkApi) => {
    try {
      const { questionTheme, questionId, controlNumber } = arg
      const res = await axios.patch<IQuestion[]>(
        `${QUESTION_THEME_LINK}/${questionTheme}`,
        {
          questionId,
          controlNumber,
        }
      )

      return res.data
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message)
    }
  }
)
