import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import { repeatWord } from 'services/WordService'
import { useAppDispatch, useAppSelector } from 'store/hooks/redux'
import styles from './KnowWordsCard.module.scss'

const KnowWordsCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { knowWord, error, isLoading } = useAppSelector(
    (state) => state.wordReduser
  )

  const dispatch = useAppDispatch()

  const repeatWordFunc = (
    pageNum: number,
    wordId: string,
    controller: number
  ) => {
    dispatch(repeatWord({ pageNum, wordId, controller }))
  }

  return (
    <div className={styles.mainBlock}>
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        Open Knew Words {knowWord.length}/10
      </button>
      <div className={styles.wordsCardBlock}>
        {(isOpen &&
          knowWord.length > 0 &&
          knowWord.map((data) => (
            <>
              {error && <h1>{error}</h1>}
              {(isLoading && (
                <div className={styles['lds-ellipsis']}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )) || (
                <Card key={data._id} className={styles.card}>
                  <Card.Header className={styles.header}>
                    {data.engWord} - {data.uaWord}
                    <button
                      type="submit"
                      onClick={() => repeatWordFunc(data.fold, data._id, 2)}
                    >
                      <div className={styles.close} />
                    </button>
                  </Card.Header>
                </Card>
              )}
            </>
          ))) ||
          (isOpen && knowWord.length === 0 && (
            <p className={styles.study}>Study Harder</p>
          ))}
      </div>
    </div>
  )
}

export default KnowWordsCard
