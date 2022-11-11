import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from 'utils/constants'
import styles from './Home.module.scss'

const Home: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1 className={styles.title}>Preparation</h1>
      <p className={styles.info}>Here you can prepare for the interview</p>
      <p className={styles.technology}>
        "JavaScript, React, CSS, SCSS, HTML, English Words etc."
      </p>
      <Button
        variant="outline-secondary"
        onClick={() => navigate(ROUTES.study)}
      >
        <span className={styles.btn}>Let's Study</span>
      </Button>
    </div>
  )
}

export default Home
