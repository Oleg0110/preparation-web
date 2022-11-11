import React from 'react'
import { KnowWordsCard, WordCard } from 'components'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'store/hooks/redux'
import { ROUTES } from 'utils/constants'
import { fetchWord, knowWord } from 'services/WordService'
import styles from './Words.module.scss'

const Words: React.FC = () => {
  const { singleWord, error, singleLoading } = useAppSelector(
    (state) => state.wordReduser
  )

  const dispatch = useAppDispatch()
  const navigation = useNavigate()
  const location = useLocation()

  const pageNum = +location.pathname.split('=')[1].split('&')[0]

  const isEmpty = Object.keys(singleWord).length !== 0

  const nextWord = () => {
    dispatch(fetchWord(pageNum))
  }

  const knowWordFunc = (controller: number) => {
    dispatch(knowWord({ pageNum, wordId: singleWord._id, controller }))
  }

  return (
    <div>
      <div className={styles.titleBlock}>
        <button
          type="button"
          className={styles.back}
          onClick={() => navigation(ROUTES.wordsPages)}
        >
          Back to Pages
        </button>
        <h1 className={styles.title}>Words</h1>
      </div>
      {error && <h1>{error}</h1>}
      <div className={styles.dataBlock}>
        {(singleLoading && (
          <div className={styles['lds-ellipsis']}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )) ||
          (isEmpty && (
            <>
              <WordCard
                engWord={singleWord.engWord}
                uaWord={singleWord.uaWord}
              />
            </>
          )) ||
          (!isEmpty && (
            <div className={styles.message}>
              <p>Congratulations!</p>
              <p>You have learnt 10 word</p>
            </div>
          ))}
      </div>
      <div className={styles.buttonField}>
        <button
          type="button"
          onClick={() => {
            knowWordFunc(1)
            nextWord()
          }}
        >
          I know this word
        </button>
        <button type="button" onClick={nextWord} className={styles.next}>
          next
        </button>
        <br />
      </div>
      <KnowWordsCard />
    </div>
  )
}

export default Words
