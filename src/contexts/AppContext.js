import React, { Component } from 'react'
import createReactContext from 'create-react-context'

const AppContext = createReactContext({
    repos: null,
    updateRepos: () => null,
})

export const AppConsumer = () => AppContext.Consume

export class AppProvider extends Component {

    state = {
        repos: null,
    }

    _updateRepos = (repos) => {
        this.setState({repos})
    }

    render(){
        return (
            <AppContext.Provider value={{
                repos: this.state.repos,
                updateRepos: this._updateRepos
            }} >
                {this.props.children}
            </AppContext.Provider>
        )
    }

}


