import React, { Component } from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import SocialPerson from 'material-ui/svg-icons/social/person'
import { ProfileCardContainer } from './common/profile'
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

	handleOnAvatarPressed = () => {
		console.log('AVATAR!')
	}

	render = () => {
		return (
			<MuiThemeProvider>
				<div>
					<header className={styles.header}>
						<AppBar
  title="Time tracker POC"
  showMenuIconButton={false}
  iconElementRight={<FlatButton label="Sign out" />}
  onRightIconButtonTouchTap={this.handleOnAvatarPressed}
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