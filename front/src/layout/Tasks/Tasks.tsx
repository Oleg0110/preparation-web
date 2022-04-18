import React, { useEffect } from 'react'
import { AccordionAnswer, StatisticsTable } from 'components'
import { useAppDispatch, useAppSelector } from 'store/hooks/redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { controlerAccordionState, ROUTES } from 'utils/constants'
import { fetchTask, fetchTaskStatistics } from 'services/TasksService'
import styles from './Tasks.module.scss'

const b = {
  _id: '6254232a9e19f6b686814a24',
  task: 'Напишіть однорядкове рішення, яке обчислює суму квадратного коріння для всіх парних чисел цілісного масиву.Масив:[1, 4, 3, 0, 4, 5, 4]',
  answer:
    'console.log(// Вхідний масив [1, 4, 3, 0, 4, 5, 4] // Залишаємо тільки парні числа .filter(element => !(element % 2)) // Вважаємо квадратний корінь і записуємо в акумулятор .reduceRight((accumulator, element) => accumulator + Math.sqrt(element), 0)) //6 Метод reduceRight() застосовує функцію до акумулятора та кожного значення масиву (справа наліво), зводячи його до одного значення. А метод reduce() виконує функцію callback один раз для кожного елемента, що є в масиві, за винятком порожнеч, приймаючи чотири аргументи: початкове значення (або значення попереднього виклику callback) значення поточного елемента; поточний індекс; масив, яким відбувається ітерація.',
  howOffen: 1,
  knew: 0,
  didntKnow: 0,
}

const Tasks: React.FC = () => {
  const { tasks, tasksStatistics, isLoading, error } = useAppSelector(
    (state) => state.tasksReduser
  )
  const dispatch = useAppDispatch()
  const navigation = useNavigate()

  const handleClick = () => {
    dispatch(fetchTask())
  }

  useEffect(() => {
    navigation(`${ROUTES.tasks}`)
    console.log(tasksStatistics)
  }, [tasks, navigation])

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
        (b && (
          <div>
            <div className={styles.titleBlock}>
              <button
                type="button"
                className={styles.back}
                onClick={() => navigation(ROUTES.questionTheme)}
              >
                Back to Theme
              </button>
              <h1 className={styles.title}>Tasks</h1>
              <StatisticsTable
                howOffen={b.howOffen}
                knew={b.knew}
                didntKnow={b.didntKnow}
              />
            </div>
            <p className={styles.task}>{b.task}</p>
            <AccordionAnswer
              taskId={b._id}
              answer={b.answer}
              questionTheme={'React'}
              controlerState={controlerAccordionState.tasks}
            />
            <button type="submit" onClick={handleClick}>
              Next Task
            </button>
          </div>
        ))}
    </>
  )
}

export default React.memo(Tasks)
