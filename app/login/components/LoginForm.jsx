import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import TextField from 'material-ui/TextField'

class LoginForm extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''    
        }
    }

    handleOnChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleOnLoginPressed = () => {
        const { username, password } = this.state
        this.props.onLogin({ username, password })
    }

    render = () => (
        <form onSubmit={this.handleOnSubmit}>
            <TextField value={this.state.username} onChange={this.handleOnChange} name="username" type="text" floatingLabelFixed floatingLabelText="Username" />
            <TextField value={this.state.password} onChange={this.handleOnChange} name="password" type="password" floatingLabelFixed floatingLabelText="Password" />
            <RaisedButton 
                onTouchTap={this.handleOnLoginPressed}
                label="Login" 
                primary={true} 
            />
        </form>
    )
}

export default LoginForm