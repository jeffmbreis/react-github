import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import App from './containers/App/App'

class Root extends Component {

    render() {
        return (
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        )
    }

}

export default Root