import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch } from 'react-router'
import { Route, Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import { ManageUsersPageContainer } from './users'
import { ManageProjectsPageContainer } from './projects'
import { RegisterTimePageContainer } from './registerTime'
import { LoginPageContainer } from './login'
import { SignOutButtonContainer } from './common/auth'

import styles from './app.scss'

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			drawerOpen: false
		}
	}

	render = () => {
		return (
			<MuiThemeProvider>
				<div>
					<header className={styles.header}>
						<AppBar
							title="Time tracker POC"
							showMenuIconButton={false}
							iconElementRight={<SignOutButtonContainer />}
						/>
					</header>
					<div className={styles.mainWrapper}>
						<nav>
							<Paper className={styles.mainMenuContainer}>
								<Menu menuItemStyle={{ width: '160px' }}>
									<MenuItem>
										<Link to="/time">
											Register time
										</Link>
									</MenuItem>
									<MenuItem>
										<Link to="/reports">
											Reports
										</Link>
									</MenuItem>
									<MenuItem>
										<Link to="/users">
											Manage users
										</Link>
									</MenuItem>
									<MenuItem>
										<Link to="/projects">
											Manage projects
										</Link>
									</MenuItem>
								</Menu>
							</Paper></nav>
						<article>
							<Switch>
								<Route exact path="/" component={ManageUsersPageContainer} />
								<Route exact path="/time" component={RegisterTimePageContainer} />
								<Route exact path="/users" component={ManageUsersPageContainer} />
								<Route exact path="/projects" component={ManageProjectsPageContainer} />
								<Route exact path="/login" component={LoginPageContainer} />
							</Switch>
						</article>
					</div>
				</div>
			</MuiThemeProvider>
		)
	}

}

export default App
