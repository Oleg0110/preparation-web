import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import styles from './WordCard.module.scss'

interface WordCardProps {
  engWord: string
  uaWord: string
}

const WordCard: React.FC<WordCardProps> = ({ engWord, uaWord }) => {
  const [isClick, setIsClick] = useState(false)

  const handleClick = () => {
    setIsClick(!isClick)
  }

  return (
    <ReactCardFlip
      isFlipped={isClick}
      flipDirection="vertical"
      flipSpeedBackToFront={1}
      flipSpeedFrontToBack={1}
    >
      <button onClick={handleClick}>
        <div className={styles.card}>
          <h2 className={styles.title}>{engWord}</h2>
        </div>
      </button>
      <button onClick={handleClick}>
        <div className={styles.card}>
          <h2 className={styles.title}>{uaWord}</h2>
        </div>
      </button>
    </ReactCardFlip>
  )
}

export default WordCard
