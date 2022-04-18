import React, { useEffect } from 'react'
import { ThemeСard } from 'components'
import { useAppDispatch, useAppSelector } from 'store/hooks/redux'
import { fetchQuestionTheme } from 'services/QuestionService'
import styles from './QuestionTheme.module.scss'

const QuestionTheme: React.FC = () => {
  const { questionTheme, isLoading, error } = useAppSelector(
    (state) => state.questionReducer
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchQuestionTheme())
  }, [dispatch])

  return (
    <>
      <h1 className={styles.title}>Question Theme</h1>
      {error && <h1>{error}</h1>}

      {(isLoading && (
        <div className={styles['lds-ellipsis']}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )) || (
        <>
          <div className={styles.cardsBlock}>
            <div className={styles.cardPosition}>
              {questionTheme &&
                questionTheme.map((data) => (
                  <div key={data._id}>
                    <ThemeСard themeName={data.theme} />
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default QuestionTheme
