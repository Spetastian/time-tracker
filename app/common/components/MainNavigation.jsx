import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './mainNavigation.scss'

class MainNavigation extends Component {

    render () {
        return (
            <ul className={styles.navigation}>
                <li>
                    <NavLink exact to="/" activeClassName={styles.active}>Campaign</NavLink>
                </li>
                <li>
                    <NavLink exact to="/players" activeClassName={styles.active}>Players</NavLink>
                </li>
                <li>
                    <NavLink exact to="/characters" activeClassName={styles.active}>Characters</NavLink>
                </li>
                <li>
                    <NavLink exact to="/locations" activeClassName={styles.active}>Locations</NavLink>
                </li>
            </ul>
        )
    }
}

export default MainNavigation