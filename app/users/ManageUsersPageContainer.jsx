import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    fetchPlayerListRequest,
    createPlayerRequest
 } from './actions'

import { AuthRequiredContainer } from '../common/auth'
import { Tabs, Tab } from 'material-ui/Tabs'
import { List, ListItem } from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin'

class ManagePageContainer extends Component {
    
	componentDidMount() {
		// this.props.loadUserList()
	}

	render() {
		return (
			<AuthRequiredContainer>
				<Tabs>
					<Tab
						icon={<FontIcon className="material-icons">phone</FontIcon>}
						label="RECENTS"
					>
      
						<List>
							<ListItem
								primaryText="James Moriarty"
								secondaryText={<p>jmort@gmail.com</p>}
								secondaryTextLines={2}
							/>
							<ListItem
								primaryText="Ben baanf"
								secondaryText={<p>bannf@gmail.com</p>}
								secondaryTextLines={2}
							/>
						</List>
					</Tab>
					<Tab
						icon={<FontIcon className="material-icons">phone</FontIcon>}
						label="RECENTS"
					>
						<List>
							<ListItem
								primaryText="Project A"
								secondaryText={<p>jmort@gmail.com</p>}
							/>
							<ListItem
								primaryText="Project B"
								secondaryText={<p>bannf@gmail.com</p>}
							/>
						</List>
					</Tab>
				</Tabs>
			</AuthRequiredContainer>
		)
	}
}

const mapStateToProps = (state) => {
	return state.manage
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadPlayerList: () =>
            dispatch(fetchPlayerListRequest()),
		createNewPlayer: name =>
            dispatch(createPlayerRequest(name))
	}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManagePageContainer)