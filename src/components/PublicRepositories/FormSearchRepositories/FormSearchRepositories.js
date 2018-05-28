import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'

class FormSearchRepositories extends Component {

    state = {
        username: '',
        snackOpen: false,
        snackMessage: null,
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showMessage && this.props.showMessage !== nextProps.showMessage) {
            this._showMessage(nextProps.showMessage)
        }
    }

    render() {

        const {
            snackOpen,
            snackMessage,
        } = this.state

        return (
            <form
                noValidate
                autoComplete="off"
                onSubmit={(e) => {
                    e.preventDefault()
                    this._onSearchClick()
                }}
                >
                <TextField
                    id="username"
                    label="Usuário do github"
                    value={this.props.username}
                    onChange={(e) => this.props.updateUser(e.target.value)}
                />
                <Button
                    style={{marginLeft: '10px'}}
                    variant="raised"
                    size="small"
                    color="primary"
                    onClick={this._onSearchClick}
                    >
                    Buscar repositórios
                </Button>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={snackOpen}
                    autoHideDuration={3000}
                    onClose={this._handleSnackClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{snackMessage}</span>}
                    />
            </form>
        )
    }

    _showMessage = (msg) => {
        this.setState({
            snackOpen: true,
            snackMessage: msg,
        })
    }

    _handleSnackClose = () => {
        this.setState({
            snackOpen: false,
            snackMessage: null,
        })
    }

    _onSearchClick = () => {
        let query = this.props.username
        if (!query) {
            this._showMessage('Infome o usuário do Github')
            return
        }
        this.props.onSearchRepos(query)
    }
}

export default FormSearchRepositories