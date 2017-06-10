import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import styles from './newUserForm.scss'

class NewUserForm extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			email: '',
			firstname: '',
			lastname: '',
			role: ''
		}
	}

	handleAddUserButtonPressed = () => {
		this.props.onUserAdded(this.state)
		this.setState({
			username: '',
			password: '',
			email: '',
			firstname: '',
			lastname: '',
			role: ''
		})
	}

	handleInputChange = evt =>
		this.setState({ [evt.target.name]: evt.target.value })
	
	render = () =>
		<Card className={styles.container}>
			<CardHeader title = "Users" />
			<CardText className={styles.weekDaysContainer}>
				<div>
					<TextField
						name="username"
						value={this.state.username}
						floatingLabelFixed
						onChange={this.handleInputChange}
						floatingLabelText="Username"
					/>
					<TextField
						name="password"
						value={this.state.password}
						floatingLabelFixed
						onChange={this.handleInputChange}
						floatingLabelText="Password"
					/>
					<TextField
						name="email"
						value={this.state.email}
						floatingLabelFixed
						onChange={this.handleInputChange}
						floatingLabelText="Email"
					/>
					<TextField
						name="firstname"
						value={this.state.firstname}
						floatingLabelFixed
						onChange={this.handleInputChange}
						floatingLabelText="Firstname"
					/>
					<TextField
						name="lastname"
						value={this.state.lastname}
						floatingLabelFixed
						onChange={this.handleInputChange}
						floatingLabelText="Lastname"
					/>
					<TextField
						name="role"
						value={this.state.role}
						floatingLabelFixed
						onChange={this.handleInputChange}
						floatingLabelText="Role"
					/>
				</div>
				<RaisedButton
					label="Add user"
					secondary
					onTouchTap={this.handleAddUserButtonPressed}
				/>
			</CardText>
		</Card>
}

export default NewUserForm