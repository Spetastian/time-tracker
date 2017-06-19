import React, { Component } from 'react'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './entryForm.scss'

class EntryForm extends Component {
	constructor(props) {
		super(props)
        const dayFields = this.props.days.reduce((acc, day) => { 
            acc[`day${day.dayOfMonth}`] = day.amount
            return acc
        }, {})

		this.state = Object.assign({
            selectedProject: this.props.projects[0],
			projectMenuOpen: false
		}, dayFields)
	}

    handleCreateButtonPress = () => {
        const { selectedProject, days } = this.state
        const values = days.reduce((acc, day) => {
            acc.push({ 
                dayOfMonth: day.dayOfMonth,  
                amount: this.state[`day${day.dayOfMonth}`]
            })
            return acc
         }, [])
         this.props.onSubmit({ selectedProject, values })
    }

	handleOnMenuItemSelected = (event, item) => {
		this.setState({
            selectedProject: item.props.value,
			projectMenuOpen: false
		})
	}

    handleDayValueChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    renderProjectList(){
        return <Menu onItemTouchTap={this.handleOnMenuItemSelected}>
            {this.props.projects.map((project, i) =>
                <MenuItem
                    key={i}
                    value={project._id}
                    primaryText={project.name}
                />
            )}
        </Menu>
    }

	renderDays() {
		return this.props.days.map(day =>
			<TextField
                name={`day${day.dayOfMonth}`}
				key={day.dayOfMonth}
				value={this.state[day.dayOfMonth]}
                onChange={this.handleDayValueChange}
				floatingLabelFixed
				floatingLabelText={`${this.props.monthShortName} ${day.dayOfMonth}`}
			/>
		)
	}

    render (){
       return <div className={styles.nameContainer}>
            {this.renderProjectList()}
            {this.renderDays()}
            <RaisedButton
                onTouchTap={this.handleCreateButtonPress}
                label="Create"
                secondary
            />
        </div>
    }
}

export default EntryForm