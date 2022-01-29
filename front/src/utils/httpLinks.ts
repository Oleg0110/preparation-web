import { ROUTES } from './constants'

export const BASIC_URL = 'http://localhost:5000'

export const QUESTION_THEME_LINK = `${BASIC_URL}${ROUTES.questionTheme}`
export const WORD_LINK = `${BASIC_URL}${ROUTES.study}${ROUTES.wordsPages}`
export const TASK_LINK = `${BASIC_URL}${ROUTES.study}${ROUTES.tasks}`
