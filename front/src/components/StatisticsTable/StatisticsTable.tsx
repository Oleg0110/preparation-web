import React from 'react'
import { Table } from 'react-bootstrap'
import { useAppSelector } from 'store/hooks/redux'
import styles from './StatisticsTable.module.scss'

interface StatisticsTableProps {
  howOffen: number
  knew: number
  didntKnow: number
}

const StatisticsTable: React.FC<StatisticsTableProps> = ({
  howOffen,
  knew,
  didntKnow,
}) => {
  const { questionStatistics, isLoading, error } = useAppSelector(
    (state) => state.questionReducer
  )
  return (
    <Table className={styles.table}>
      <thead>
        <tr>
          <th>How offen</th>
          <th>Knew</th>
          <th>Didn't know</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th className={styles.count}>{howOffen}</th>
          <th className={styles.count}>{knew}</th>
          <th className={styles.count}>{didntKnow}</th>
        </tr>
      </tbody>
    </Table>
  )
}

export default StatisticsTable
