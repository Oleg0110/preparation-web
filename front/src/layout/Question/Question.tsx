import React, { useEffect, useState } from 'react'
import { AccordionAnswer, StatisticsTable } from 'components'
import { useAppDispatch, useAppSelector } from 'store/hooks/redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { controlerAccordionState, ROUTES } from 'utils/constants'
import {
  fetchQuestion,
  fetchQuestionStatistics,
} from 'services/QuestionService'
import { toast } from 'react-toastify'
import styles from './Question.module.scss'

const Question: React.FC = () => {
  const { question, questionStatistics, isLoading, error } = useAppSelector(
    (state) => state.questionReducer
  )

  const [isEmpty, setIsEmpty] = useState(false)

  const dispatch = useAppDispatch()
  const navigation = useNavigate()
  const location = useLocation()

  const theme = location.pathname.split('/')[3]

  useEffect(() => {
    const asyncFunc = async () => {
      question._id
        ? isEmpty &&
          dispatch(fetchQuestionStatistics({ theme, questionId: question._id }))
        : (await dispatch(fetchQuestion(theme))) && setIsEmpty(true)

      question._id &&
        navigation(`${ROUTES.questionTheme}/${theme}/${question._id}`)
    }
    asyncFunc()
  }, [isEmpty, dispatch, theme, question, navigation])

  const handleClick = async () => {
    question.knew !== questionStatistics.knew ||
    question.didntKnow !== questionStatistics.didntKnow
      ? (await dispatch(fetchQuestion(theme))) &&
        dispatch(fetchQuestionStatistics({ theme, questionId: question._id }))
      : toast.error("Choose: Know or Didn't know")
  }

  return (
    <>
      {error && <h1>{error}</h1>}
      {(isLoading && (
        <div className={styles['lds-ellipsis']}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )) ||
        (question && (
          <div>
            <div className={styles.titleBlock}>
              <button
                type="button"
                className={styles.back}
                onClick={() => navigation(ROUTES.questionTheme)}
              >
                Back to Theme
              </button>
              <h1 className={styles.title}>Question</h1>
              <StatisticsTable controller={controlerAccordionState.question} />
            </div>
            <p className={styles.question}>{question.question}</p>
            <AccordionAnswer
              controlerState={controlerAccordionState.question}
            />
            <button type="submit" onClick={handleClick}>
              Next Question
            </button>
          </div>
        ))}
    </>
  )
}

export default React.memo(Question)
