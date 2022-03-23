import React, { useEffect } from 'react'
import { WordPageCard } from 'components'
import { useAppDispatch, useAppSelector } from 'store/hooks/redux'
import styles from './WordsPages.module.scss'
import { fetchWordFolds } from 'services/WordService'

const WordsPages: React.FC = () => {
  const { word, isLoading, error } = useAppSelector(
    (state) => state.wordReduser
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchWordFolds())
  }, [dispatch])

  return (
    <div>
      <h1 className={styles.title}>Words Pages</h1>
      <p className={styles.text}>Every fold has 10 words</p>
      {error && <h1>{error}</h1>}
      {isLoading && (
        <div className={styles['lds-ellipsis']}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <div className={styles.cardPosition}>
        {word &&
          word.map((data) => (
            <WordPageCard
              key={data._id}
              pageNumber={data.fold}
              firstWordId={data._id}
            />
          ))}
      </div>
    </div>
  )
}

export default WordsPages
