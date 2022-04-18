import React, { useState } from 'react'
import { updateQuestionStatistics } from 'services/QuestionService'
import { updateTask } from 'services/TasksService'
import { useAppDispatch } from 'store/hooks/redux'
import styles from './AccordionAnswer.module.scss'

interface IAccordionAnswerProps {
  answer: string
  questionId?: string
  taskId?: string
  questionTheme: string
  controlerState: number
}

const AccordionAnswer: React.FC<IAccordionAnswerProps> = ({
  answer,
  questionId,
  taskId,
  questionTheme,
  controlerState,
}) => {
  const [isOpened, setIsOpened] = useState(false)

  const dispatch = useAppDispatch()

  const updateQuestion = (controlNumber: number) => {
    questionId &&
      dispatch(
        updateQuestionStatistics({ questionTheme, questionId, controlNumber })
      )
  }

  const updateTasks = (controlNumber: number) => {
    taskId && dispatch(updateTask({ taskId, controlNumber }))
  }

  return (
    <div className={styles.accordionSection}>
      <button
        type="button"
        className={`${styles.accordion} `}
        onClick={() => setIsOpened(!isOpened)}
      >
        <p className={styles.accordionTitle}>Answer</p>
        <div className={styles.accordionButtons}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              controlerState === 1 ? updateQuestion(1) : updateTasks(1)
            }}
          >
            Knew
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              controlerState === 1 ? updateQuestion(2) : updateTasks(2)
            }}
          >
            Didn't know
          </button>
          <div
            className={`${styles.plusIcon} ${isOpened && styles.minusIcon}`}
          />
        </div>
      </button>
      <div
        className={`${styles.accordionAnswer} ${isOpened && styles.opened} `}
      >
        <div className={styles.goTo}>
          <p className={styles.contentAnswer}>{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default AccordionAnswer
