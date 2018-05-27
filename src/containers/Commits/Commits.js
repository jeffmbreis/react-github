import React, { Component } from 'react'
import PropType from 'prop-types'
import CSSModules from 'react-css-modules'
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Link } from 'react-router-dom'
import DefaultList from '../../components/Lists/DefaultList/DefaultList'
import axios from 'axios'
import styles from './style.module.css'

class Commits extends Component {

  state = {
    loading: false,
  }
    
  componentDidMount() {

  }

  render() {

    const {
      loading,
      commits,
    } = this.state

    return (
      <div>
        <Link to='/'>
          <Button
            variant="fab"
            color="primary"
            aria-label="back"
            className={styles.back}>
            <ArrowBackIcon />
          </Button>
        </Link>
        <DefaultList
          source={commits}
          loading={loading}
        />
      </div>
    )
  }

  _searchCommits = (owner, repo) => {
    this.setState({
      loading: true,
      source: null,
      error: false,
    })
    axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`)
    .then((response) => {
      this.setState({
        source: response.data,
        loading: false,
      })
    })
    .catch((err) => {
      this.setState({
        loading: false,
        error: 'Usuário não encontrado no Github.',
      })
      console.log('err', err)
    })
  }

}

Commits.contextTypes = {
  router: PropType.object
}

export default CSSModules(Commits, styles)
