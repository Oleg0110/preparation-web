import { LearningСard } from 'components'
import React from 'react'
import {
  questionInfoText,
  ROUTES,
  taskInfoText,
  wordInfoText,
} from 'utils/constants'
import styles from './Study.module.scss'

const Study: React.FC = () => {
  return (
    <div>
      <h1 className={styles.title}>What do you want to learn?</h1>
      <div className={styles.cardPosition}>
        <LearningСard
          title="Question"
          text={questionInfoText}
          link={ROUTES.questionTheme}
        />
        <LearningСard title="Tasks" text={taskInfoText} link={ROUTES.task} />
        <LearningСard
          title="Words"
          text={wordInfoText}
          link={ROUTES.wordsPages}
        />
      </div>
    </div>
  )
}

export default Study
