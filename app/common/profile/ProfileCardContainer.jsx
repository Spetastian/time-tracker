import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import SocialPerson from 'material-ui/svg-icons/social/person'
import styles from './profileCardContainer.scss'

class ProfileCardContainer extends Component {

	render() {
		return (
			<Card>
				<CardHeader
  title="URL Avatar"
  subtitle="Subtitle"
  avatar={<Avatar icon={<SocialPerson />} />}
				/>
				<CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
				<CardActions>
					<FlatButton label="Settings" />
					<FlatButton label="Sign out" />
				</CardActions>
			</Card>
		)
	}
}

const mapStateToProps = (state) => {
	return state.authentication
}

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () =>
            dispatch(fetchPlayerListRequest())
	}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileCardContainer)