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

	handleOnOpenDrawer = () => {
		this.setState({
			drawerOpen: !this.state.drawerOpen
		})
	}

	render = () => {
		return (
			<MuiThemeProvider>
				<div>
					<header className={styles.header}>
						<AppBar
  title="Title"
  iconClassNameLeft="muidocs-icon-navigation-expand-more"
  onLeftIconButtonTouchTap={this.handleOnToggleDrawer}
						/>
					</header>
					<Drawer open={this.state.drawerOpen}>
						<MenuItem>Menu Item</MenuItem>
						<MenuItem>Menu Item 2</MenuItem>
					</Drawer>
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