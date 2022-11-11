import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { IButtonStyleTypes } from 'utils/types'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

interface IButtonProps {
  id: string
  name: string
  link: string
  style: IButtonStyleTypes
}

const buttons: IButtonProps[] = [
  {
    id: '0',
    name: 'Home',
    link: '/',
    style: 'mainButtonStyle',
  },
  {
    id: '1',
    name: 'Study',
    link: '/study',
    style: 'mainButtonStyle',
  },
]

const Header: React.FC = () => {
  const nav = buttons.map((button) => (
    <Nav.Link key={button.id} className="nav-link" as={Link} to={button.link}>
      {button.name}
    </Nav.Link>
  ))

  return (
    <>
      <Navbar
        collapseOnSelect
        className={styles.navBar}
        expand="lg"
        variant="light"
      >
        <Nav style={{ marginLeft: '50px' }}>
          <Link className={`${styles.logo} ${'nav-link'}`} to="/">
            Preparation
            <div className={styles.logoIcon} />
          </Link>
        </Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" />
        <Nav className={styles.navButtons}>{nav}</Nav>
      </Navbar>
    </>
  )
}

export default Header
