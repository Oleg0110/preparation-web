import React from 'react'
import { Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { fetchTask, fetchTaskStatistics } from 'services/TasksService'
import { useAppDispatch } from 'store/hooks/redux'
import { ROUTES } from 'utils/constants'
import styles from './LearningСard.module.scss'

interface LearningСardProps {
  title: string
  link: string
  text: string
}

const LearningСard: React.FC<LearningСardProps> = ({ title, link, text }) => {
  const dispatch = useAppDispatch()

  const handleClick = () => {
    if (link === ROUTES.tasks) {
      dispatch(fetchTask())
      dispatch(fetchTaskStatistics())
    }
  }
  return (
    <Link to={link} className={styles.link} onClick={handleClick}>
      <Card className={styles.card}>
        <Card.Header className={styles.header}>{title}</Card.Header>
        <Card.Body>
          <Card.Text className={styles.text}>{text}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default LearningСard
