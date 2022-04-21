import React from 'react'
import Header from 'layout/Header/Header'
import useRoutes from 'utils/routes'
import { ToastContainer } from 'react-toastify'
import styles from './App.module.scss'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

const App: React.FC = () => {
  const routes = useRoutes()

  return (
    <div className={styles.app}>
      <div className={styles.backFon}>
        <Header />
        {routes}
        <ToastContainer />
      </div>
    </div>
  )
}

export default App
