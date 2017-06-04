import React, { Component } from 'react'
import PlayerItem from './PlayerItem'

class PlayerList extends Component{
    
    render(){
        return (
            <div>
                {
                    this.props.players.map(
                        player => (
                            <PlayerItem 
                                key={player.id}
                                id={player.id} 
                                title={player.title}
                            />
                        )
                    )
                }
            </div>
        )
    }
}

export default PlayerList