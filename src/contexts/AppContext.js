import React, { Component } from 'react'
import createReactContext from 'create-react-context'

const AppContext = createReactContext({
    repos: null,
    user: '',
    updateRepos: () => null,
    updateUser: () => null,
})

export const AppConsumer = AppContext.Consumer

export class AppProvider extends Component {

    state = {
        repos: null,
        user: '',
    }

    _updateRepos = (repos) => {
        this.setState({repos})
    }

    _updateUser = (user) => {
        this.setState({user})
    }

    render(){
        return (
            <AppContext.Provider value={{
                repos: this.state.repos,
                user: this.state.user,
                updateRepos: this._updateRepos,
                updateUser: this._updateUser,
            }} >
                {this.props.children}
            </AppContext.Provider>
        )
    }

}


