import React, { useEffect, useState } from 'react'
import { AccordionAnswer, StatisticsTable } from 'components'
import { useAppDispatch, useAppSelector } from 'store/hooks/redux'
import { useNavigate } from 'react-router-dom'
import { controlerAccordionState, ROUTES } from 'utils/constants'
import { fetchTask, fetchTaskStatistics } from 'services/TasksService'
import { toast } from 'react-toastify'
import styles from './Task.module.scss'

const Task: React.FC = () => {
  const { task, taskStatistics, isLoading, error } = useAppSelector(
    (state) => state.tasksReduser
  )

  const [isEmpty, setIsEmpty] = useState(false)

  const dispatch = useAppDispatch()
  const navigation = useNavigate()

  const handleClick = async () => {
    task.knew !== taskStatistics.knew ||
    task.didntKnow !== taskStatistics.didntKnow
      ? (await dispatch(fetchTask())) && dispatch(fetchTaskStatistics(task._id))
      : toast.error("Choose: Know or Didn't know")
  }

  useEffect(() => {
    const asyncFunc = async () => {
      task._id
        ? isEmpty && dispatch(fetchTaskStatistics(task._id))
        : (await dispatch(fetchTask())) && setIsEmpty(true)

      task._id && navigation(`${ROUTES.task}/${task._id}`)
    }
    asyncFunc()
  }, [isEmpty, dispatch, task, navigation])

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
        (task && (
          <div>
            <div className={styles.titleBlock}>
              <button
                type="button"
                className={styles.back}
                onClick={() => navigation(ROUTES.study)}
              >
                Back to Study
              </button>
              <h1 className={styles.title}>Tasks</h1>
              <StatisticsTable controller={controlerAccordionState.task} />
            </div>
            <div className={styles.taskField}>
              <p className={styles.task}>{task.task}</p>
            </div>
            <AccordionAnswer controlerState={controlerAccordionState.task} />
            <button type="submit" onClick={handleClick}>
              Next Task
            </button>
          </div>
        ))}
    </>
  )
}

export default React.memo(Task)
