import React, { Component } from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { RegisterTimePageContainer } from './registerTime'
import { LoginPageContainer } from './login'

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
						/>
					</header>
					<div className={styles.mainWrapper}>
						<article>
							<Switch>
								<Route exact path="/" component={RegisterTimePageContainer} />
								<Route exact path="/login" component={LoginPageContainer} />
								<Route exact path="/timecard" component={RegisterTimePageContainer} />
							</Switch>
						</article>
					</div>
				</div>
			</MuiThemeProvider>
		)
	}

}


export default App