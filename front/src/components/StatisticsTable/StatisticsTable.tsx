import React from 'react'
import { Table } from 'react-bootstrap'
import { useAppSelector } from 'store/hooks/redux'
import styles from './StatisticsTable.module.scss'

interface StatisticsTableProps {
  controller: number
}

const StatisticsTable: React.FC<StatisticsTableProps> = ({ controller }) => {
  const { questionStatistics } = useAppSelector(
    (state) => state.questionReducer
  )
  const { taskStatistics } = useAppSelector((state) => state.tasksReduser)

  const howOffenStatistic =
    controller === 1 ? questionStatistics.howOffen : taskStatistics.howOffen
  const knowStatistic =
    controller === 1 ? questionStatistics.knew : taskStatistics.knew
  const didntKnowStatistic =
    controller === 1 ? questionStatistics.didntKnow : taskStatistics.didntKnow

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
          <th className={styles.count}>{howOffenStatistic}</th>
          <th className={styles.count}>{knowStatistic}</th>
          <th className={styles.count}>{didntKnowStatistic}</th>
        </tr>
      </tbody>
    </Table>
  )
}

export default StatisticsTable
