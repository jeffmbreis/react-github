import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import PublicRepositories from '../PublicRepositories/PublicRepositories'
import Commits from '../Commits/Commits'
import styles from './style.module.css'

class App extends Component {
    
  render() {
    return (
      <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit">React GitHub</Typography>
            </Toolbar>
          </AppBar>
          <div styleName='pages'>
            <Route path="/" exact component={PublicRepositories}/>
            <Route path="/commits/:repoId" component={Commits}/>
          </div>
      </div>
    )
  }

}

export default CSSModules(App, styles)
