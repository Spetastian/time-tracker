import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import { RegisterTimePageContainer } from './registerTime'
import { LoginPageContainer } from './login'

import styles from './app.scss'

const App = () => {
	return (
		<MuiThemeProvider>
			<div>
				<header className={styles.header}>
					<AppBar
  title="Title"
  iconClassNameRight="muidocs-icon-navigation-expand-more"
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

export default App