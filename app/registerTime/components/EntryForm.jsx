import React, { Component } from 'react'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './entryForm.scss'

class EntryForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
            selectedProject: this.props.projects[0],
			projectMenuOpen: false
		}
	}

    handleCreateButtonPress = () => {
        
    }

	handleOnMenuItemSelected = (event, item) => {
		this.setState({
            selectedProject: item.props.value,
			projectMenuOpen: false
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
				key={day.dayOfMonth}
				value={day.amount}
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