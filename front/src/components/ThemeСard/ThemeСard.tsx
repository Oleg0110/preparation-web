import React from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from 'utils/constants'
import styles from './ThemeСard.module.scss'

interface ThemeСardProps {
  themeName: string
}

const ThemeСard: React.FC<ThemeСardProps> = ({ themeName }) => {
  const navigation = useNavigate()

  const handleClick = async () => {
    navigation(`${ROUTES.questionTheme}/${themeName}`)
  }

  return (
    <button onClick={handleClick} className={styles.link}>
      <Card className={styles.card}>
        <Card.Body>
          <Card.Title className={styles.title}>{themeName}</Card.Title>
          <div className={`${styles.icon} && ${styles[`${themeName}`]}`} />
        </Card.Body>
      </Card>
    </button>
  )
}

export default ThemeСard
