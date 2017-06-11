import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

export default class PopoverExampleAnimation extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			open: false
		}
	}

	handleOnMenuItemSelected = (event, item) => {
		this.props.onProjectSelected(item.props.value)
		this.setState({
			open: false
		})
	}

	handleOnNewEntryButtonPressed = (event) => {
    // This prevents ghost click.
		event.preventDefault()

		this.setState({
			open: true,
			anchorEl: event.currentTarget
		})
	};

	handleRequestClose = () => {
		this.setState({
			open: false
		})
	};

	render() {
		return (
			<div>
				<RaisedButton
					onTouchTap={this.handleOnNewEntryButtonPressed}
					label="+ New Entry"
					primary
				/>
				<Popover
					open={this.state.open}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
					targetOrigin={{ horizontal: 'left', vertical: 'top' }}
					onRequestClose={this.handleRequestClose}
					animation={PopoverAnimationVertical}
				>
					<Menu onItemTouchTap={this.handleOnMenuItemSelected}>
						{this.props.projects.map((project, i) =>
							<MenuItem
								key={i}
								value={project._id}
								primaryText={project.name}
							/>
						)}
					</Menu>
				</Popover>
			</div>
		)
	}
}