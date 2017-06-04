import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
    fetchPlayerListRequest, 
    createPlayerRequest
 } from './actions'

 import PlayerList from './components/PlayerList'

class PlayersPageContainer extends Component {
    
    componentDidMount(){
        this.props.loadPlayerList()
    }

    render () {
        return <PlayerList players={this.props.players} />
    }
}

const mapStateToProps = (state) => {
    return { players: state.players.playerList }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadPlayerList: () =>
            dispatch(fetchPlayerListRequest()),
        createNewPlayer: (name) =>
            dispatch(createPlayerRequest(name))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayersPageContainer)