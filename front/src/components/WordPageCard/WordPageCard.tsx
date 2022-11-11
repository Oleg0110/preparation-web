import React from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { fetchKnowWords, fetchWord } from 'services/WordService'
import { useAppDispatch } from 'store/hooks/redux'
import { ROUTES } from 'utils/constants'
import styles from './WordPageCard.module.scss'

interface WordPageCardProps {
  pageNumber: number
  firstWordId: string
}

const WordPageCard: React.FC<WordPageCardProps> = ({ pageNumber }) => {
  const dispatch = useAppDispatch()
  const navigation = useNavigate()

  const handleClick = () => {
    dispatch(fetchWord(pageNumber))
    dispatch(fetchKnowWords(pageNumber))
    navigation(`${ROUTES.wordsPages}/number=${pageNumber}`)
  }
  return (
    <button onClick={handleClick} className={styles.link}>
      <Card className={styles.card}>
        <p className={styles.title}>#{pageNumber}</p>
        <div className={styles.foldIcon} />
      </Card>
    </button>
  )
}

export default WordPageCard
