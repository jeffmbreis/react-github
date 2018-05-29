import React, { Component } from 'react'
import PropType from 'prop-types'
import CSSModules from 'react-css-modules'
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import styles from './style.module.css'
import TextField from '@material-ui/core/TextField'
import moment from 'moment'
import InfiniteScroll from '../../components/Commits/InfiniteScroll/InfiniteScroll'
import uniqid from 'uniqid'

class Commits extends Component {

  state = {
    page: 0,
    loading: false,
    commits: [],
    stop: false,
  }
    
  componentDidMount() {
    this._getCommits(this.state.page)
  }

  render() {

    const {
      loading,
      stop,
      filter,
    } = this.state

    return (
      <div>
        <div className={styles.header}>
          <Link to='/'>
            <Button
              variant="fab"
              color="primary"
              aria-label="back"
              className={styles.back}>
              <ArrowBackIcon />
            </Button>
          </Link>
          <div className={styles.filter}>
            <TextField 
            id="filter"
            label="Filtrar"
            value={filter}
            onChange={(e) => {
              this.setState({
                filter: e.target.value,
                stop: e.target.value ? true : false,
              })}
            }
            />
          </div>
        </div>
        <InfiniteScroll
          content={this.renderContent()}
          loading={loading}
          scrollLoadRequested={this._onLoadMoreCommits}
          stop={stop}
        />
      </div>
    )
  }

  renderContent = () => {
    return () => (
      <div>
        <List>
          <ListItem>
            <ListItemText primary={<p className={styles.title}>Commits</p>} />
          </ListItem>
          {this.state.commits.filter(this._filter).map(commit => (
            <div key={uniqid()}>
              <Divider />
              <ListItem>
                <Avatar
                  alt={commit.commit.author.name}
                  src={commit.author ? commit.author.avatar_url : 'http://www.gogecko.com.au/images/avatar.png'}
                />
                <ListItemText 
                    primary={commit.commit.message}
                    secondary={moment(commit.commit.author.date).format('DD/MM/YYYY')}
                />
              </ListItem>
            </div>
          ))}
        </List>
      </div>
    )
  }

  _onLoadMoreCommits = () => {
    this.setState({
        page: this.state.page + 1,
    })
    this._getCommits(this.state.page)
  }

  _getCommits = () => {
    this.setState({
      loading: true,
    })

    const {
      owner,
      repo,
    } = this.props.match.params

    axios.get(`https://api.github.com/repos/${owner}/${repo}/commits?page=${this.state.page}`)
    .then((response) => {
      if (response.data.length < 1) {
        this.setState({
          stop: true,
          loading: false,
        })
      } else {
        var current = this.state.commits
        current.push.apply(current, response.data)
        this.setState({
          commits: current,
          loading: false,
        })
      }
    })
    .catch((err) => {
      this.setState({
        loading: false,
      })
      console.log('err', err)
    })
  }

  _filter = (value) => {
    if (!this.state.filter) {
      return true
    }
    if(value.commit.message.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0) {
      return true
    }
    return false
  }

}

Commits.contextTypes = {
  router: PropType.object
}

export default withRouter(CSSModules(Commits, styles))
