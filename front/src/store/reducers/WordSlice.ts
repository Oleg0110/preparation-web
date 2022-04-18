import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  fetchKnowWords,
  fetchWord,
  fetchWordFolds,
  knowWord,
  repeatWord,
} from 'services/WordService'
import { IWord } from 'utils/interface'

const initialState = {
  foldWord: [] as IWord[],
  knowWord: [] as IWord[],
  singleWord: {} as IWord,
  singleLoading: false,
  isLoading: false,
  error: '',
}

export const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {},
  extraReducers: {
    //Get Folds
    [fetchWordFolds.fulfilled.type]: (
      state,
      action: PayloadAction<Omit<IWord[], 'engWord' | 'uaWord'>>
    ) => {
      state.isLoading = false
      state.error = ''
      state.foldWord = action.payload
    },
    [fetchWordFolds.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchWordFolds.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    //Get Word
    [fetchWord.fulfilled.type]: (state, action: PayloadAction<IWord>) => {
      state.singleLoading = false
      state.error = ''
      state.singleWord = action.payload
    },
    [fetchWord.pending.type]: (state) => {
      state.singleLoading = true
    },
    [fetchWord.rejected.type]: (state, action: PayloadAction<string>) => {
      state.singleLoading = false
      state.error = action.payload
    },
    //Get Know Words
    [fetchKnowWords.fulfilled.type]: (
      state,
      action: PayloadAction<IWord[]>
    ) => {
      state.isLoading = false
      state.error = ''
      state.knowWord = action.payload
    },
    [fetchKnowWords.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchKnowWords.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    //Request Update Word to know:true
    [knowWord.fulfilled.type]: (state, action: PayloadAction<IWord[]>) => {
      state.isLoading = false
      state.error = ''
      state.knowWord = action.payload
    },
    [knowWord.pending.type]: (state) => {
      state.isLoading = true
    },
    [knowWord.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    //Request Update Word to know:false
    [repeatWord.fulfilled.type]: (state, action: PayloadAction<IWord[]>) => {
      state.isLoading = false
      state.error = ''
      state.knowWord = action.payload
    },
    [repeatWord.pending.type]: (state) => {
      state.isLoading = true
    },
    [repeatWord.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default wordSlice.reducer
