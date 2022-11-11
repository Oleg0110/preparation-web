import { createAsyncThunk } from '@reduxjs/toolkit'
import { WORD_PAGES_LINK } from 'utils/httpLinks'
import { IWord } from 'utils/interface'
import axios from 'axios'

interface IKnowWordProps {
  wordId: string
  pageNum: number
  controller: number
}

export const fetchWordFolds = createAsyncThunk(
  'word/folds',
  async (_, thunkApi) => {
    try {
      const res = await axios.get<Omit<IWord[], 'engWord' | 'uaWord' | 'know'>>(
        WORD_PAGES_LINK
      )

      return res.data
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message)
    }
  }
)

export const fetchWord = createAsyncThunk(
  'word',
  async (pageNum: number, thunkApi) => {
    try {
      const res = await axios.get<IWord>(`${WORD_PAGES_LINK}/number=${pageNum}`)

      return res.data
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message)
    }
  }
)

export const fetchKnowWords = createAsyncThunk(
  'word/know',
  async (pageNum: number, thunkApi) => {
    try {
      const res = await axios.get<IWord[]>(
        `${WORD_PAGES_LINK}/number=${pageNum}/know`
      )

      return res.data
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message)
    }
  }
)

export const knowWord = createAsyncThunk(
  'word/update',
  async (arg: IKnowWordProps, thunkApi) => {
    try {
      const { pageNum, wordId, controller } = arg

      const res = await axios.patch<IWord[]>(
        `${WORD_PAGES_LINK}/number=${pageNum}`,
        { wordId, controller }
      )

      return res.data
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message)
    }
  }
)

export const repeatWord = createAsyncThunk(
  'word/reapet',
  async (arg: IKnowWordProps, thunkApi) => {
    try {
      const { pageNum, wordId, controller } = arg

      const res = await axios.patch<IWord[]>(
        `${WORD_PAGES_LINK}/number=${pageNum}`,
        { wordId, controller }
      )

      return res.data
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message)
    }
  }
)
