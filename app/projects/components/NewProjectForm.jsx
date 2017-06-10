import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './newProjectForm.scss'

class NewProjectForm extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			name: ''
		}
	}

	handleAddProjectButtonPressed = () => {
		this.props.onProjectAdded(this.state.name)
		this.setState({ name: '' })
	}

	handleNameChanged = evt =>
		this.setState({ name: evt.target.value })
	
	render = () =>
		<Paper className={styles.container}>
			<TextField
				onChange={this.handleNameChanged}
				value={this.state.name}
				floatingLabelFixed
				floatingLabelText="Name"
			/>
			<RaisedButton
				label="Add project"
				secondary
				onTouchTap={this.handleAddProjectButtonPressed}
			/>
		</Paper>
}

export default NewProjectForm