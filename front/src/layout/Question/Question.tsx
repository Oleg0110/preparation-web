import React, { useEffect } from 'react'
import { AccordionAnswer, StatisticsTable } from 'components'
import { useAppDispatch, useAppSelector } from 'store/hooks/redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { controlerAccordionState, ROUTES } from 'utils/constants'
import { fetchQuestion } from 'services/QuestionService'
import styles from './Question.module.scss'

const Question: React.FC = () => {
  const { question, isLoading, error } = useAppSelector(
    (state) => state.questionReducer
  )
  const dispatch = useAppDispatch()
  const navigation = useNavigate()

  const location = useLocation()
  const theme = location.pathname.split('/')[3]

  const handleClick = () => {
    dispatch(fetchQuestion(theme))
  }

  useEffect(() => {
    navigation(`${ROUTES.questionTheme}/${theme}/${question._id}`)
  }, [theme, question, navigation])

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
              <StatisticsTable
                howOffen={question.howOffen}
                knew={question.knew}
                didntKnow={question.didntKnow}
              />
            </div>
            <p className={styles.question}>{question.question}</p>
            <AccordionAnswer
              questionId={question._id}
              answer={question.answer}
              questionTheme={theme}
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
