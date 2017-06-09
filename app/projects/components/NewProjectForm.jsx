import React from 'react'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './newProjectForm.scss'

const NewProjectForm = () =>
	<Card className={styles.container}>
		<CardText className={styles.weekDaysContainer}>
			<TextField floatingLabelFixed floatingLabelText="Name" />
			<RaisedButton label="Add project" secondary />

		</CardText>
	</Card>


export default NewProjectForm