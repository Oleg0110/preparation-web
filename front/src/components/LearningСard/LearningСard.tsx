import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './LearningСard.module.scss'

interface LearningСardProps {
  title: string
  link: string
  text: string
}

const LearningСard: React.FC<LearningСardProps> = ({ title, link, text }) => {
  return (
    <Link to={link} className={styles.link}>
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
