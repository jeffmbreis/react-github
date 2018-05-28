import React, { Component } from 'react'
import FormSearchRepositories from '../../components/PublicRepositories/FormSearchRepositories/FormSearchRepositories'
import DefaultList from '../../components/PublicRepositories/DefaultList/DefaultList'
import { AppConsumer } from '../../contexts/AppContext'
import axios from 'axios'

class PublicRepositories extends Component {

  state = {
    loading: false,
  }
    
  render() {

    const {
      loading,
      error,
    } = this.state

    return (
      <AppConsumer>
        {(context) => (
          <div>
            <FormSearchRepositories
              onSearchRepos={(user) => this._searchRepos(context.user, context.updateRepos)}
              showMessage={error}
              username={context.user}
              updateUser={(username) => context.updateUser(username)}
            />
            <DefaultList
              source={context.repos}
              loading={loading}
              onOrder={(order) => this._order(context.user, context.updateRepos, order)}
            />    
          </div>
        )}
      </AppConsumer>
    )
  }

  _searchRepos = (user, updateRepos, query) => {
    this.setState({
      loading: true,
      error: false,
    })
    updateRepos(null)
    axios.get(`https://api.github.com/users/${user}/repos${query ? query : ''}`)
    .then((response) => {
      this.setState({loading: false})
      updateRepos(response.data)
    })
    .catch((err) => {
      this.setState({
        loading: false,
        error: 'Usuário não encontrado no Github.',
      })
      console.log('err', err)
    })
  }

  _order = (user, updateRepos, order) => {
    let query = `?sort=${order.sort}&direction=${order.direction}`
    this._searchRepos(user, updateRepos, query)
  }

}

export default PublicRepositories
