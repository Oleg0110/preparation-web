import React, { useState } from 'react'
import { updateQuestionStatistics } from 'services/QuestionService'
import { updateTaskStatistics } from 'services/TasksService'
import { useAppDispatch, useAppSelector } from 'store/hooks/redux'
import styles from './AccordionAnswer.module.scss'

interface IAccordionAnswerProps {
  controlerState: number
}

const AccordionAnswer: React.FC<IAccordionAnswerProps> = ({
  controlerState,
}) => {
  const [isOpened, setIsOpened] = useState(false)
  const [isController, setIsController] = useState(false)

  const { question } = useAppSelector((state) => state.questionReducer)
  const { task } = useAppSelector((state) => state.tasksReduser)

  const dispatch = useAppDispatch()

  const updateQuestion = (controlNumber: number) => {
    question &&
      dispatch(
        updateQuestionStatistics({
          questionTheme: question.theme,
          questionId: question._id,
          controlNumber,
        })
      )
  }

  const updateTasks = (controlNumber: number) => {
    task && dispatch(updateTaskStatistics({ taskId: task._id, controlNumber }))
  }

  const knowFunc = () => {
    setIsController(true)
    !isController && controlerState === 1
      ? updateQuestion(1)
      : !isController && controlerState === 2 && updateTasks(1)
  }

  const didntKnowFunc = () => {
    setIsController(true)
    !isController && controlerState === 1
      ? updateQuestion(2)
      : !isController && controlerState === 2 && updateTasks(2)
  }

  const openAnswerStyle =
    isOpened && controlerState === 1
      ? styles.openedQuestionAccor
      : isOpened && controlerState === 2 && styles.openedTaskAccor

  const answer = controlerState === 1 ? question.answer : task.answer

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
              knowFunc()
            }}
          >
            Know
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              didntKnowFunc()
            }}
          >
            Didn't know
          </button>
          <div
            className={`${styles.plusIcon} ${isOpened && styles.minusIcon}`}
          />
        </div>
      </button>
      <div className={`${styles.accordionAnswer} ${openAnswerStyle} `}>
        <div className={styles.goTo}>
          <p className={styles.contentAnswer}>{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default AccordionAnswer
