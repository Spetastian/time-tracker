import React from 'react'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import styles from './weekEntry.scss'

const WeekEntry = ({ projectId }) =>
	<Card className={styles.container}>
		<CardHeader title = {`Project ${projectId}`} />
		<CardText className={styles.weekDaysContainer}>
			<TextField floatingLabelFixed floatingLabelText="Monday" />
			<TextField floatingLabelFixed floatingLabelText="Tuesday" />
			<TextField floatingLabelFixed floatingLabelText="Wednesday" />
			<TextField floatingLabelFixed floatingLabelText="Thursday" />
			<TextField floatingLabelFixed floatingLabelText="Friday" />
			<TextField floatingLabelFixed floatingLabelText="Saturday" />
			<TextField floatingLabelFixed floatingLabelText="Sunday" />
		</CardText>
	</Card>


export default WeekEntry