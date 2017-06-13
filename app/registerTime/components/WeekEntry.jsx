import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import styles from './weekEntry.scss'

class WeekEntry extends Component {

	renderDays(){
		return this.props.days.map(day=>
			<TextField 
				key={day.dayOfMonth} 
				value={day.amount} 
				floatingLabelFixed 
				floatingLabelText={`${this.props.monthShortName} ${day.dayOfMonth}`} />
		)
	}

	render(){
		return (
		<Card className={styles.container}>
			<CardHeader title = {this.props.projectName} />
			<CardText className={styles.daysContainer}>
				{this.renderDays()}
			</CardText>
		</Card>
		)
	}
}


export default WeekEntry