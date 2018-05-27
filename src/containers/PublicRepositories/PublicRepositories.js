import React, { Component } from 'react'
import FormSearchRepositories from '../../components/Forms/FormSearchRepositories/FormSearchRepositories'
import DefaultList from '../../components/Lists/DefaultList/DefaultList'
import { AppProvider, AppConsumer } from '../../contexts/AppContext'
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
      <AppProvider>
        <AppConsumer>
          {({repos, updateRepos}) => (
            <div>
              <FormSearchRepositories
                onSearchRepos={(query) => this._searchRepos(query, updateRepos)}
                showMessage={error}
              />
              <DefaultList
                source={repos}
                loading={loading}
              />    
            </div>
          )}
        </AppConsumer>
      </AppProvider>
    )
  }

  _searchRepos = (query, updateRepos) => {
    this.setState({
      loading: true,
      error: false,
    })
    updateRepos(null)
    axios.get(`https://api.github.com/users/${query}/repos`)
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

  _updateRepos = (repos) => {
    return null
  }

}

export default PublicRepositories
