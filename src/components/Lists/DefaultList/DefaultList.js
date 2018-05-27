import React, { Component } from 'react'
import PropType from 'prop-types'
import CSSModules from 'react-css-modules'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import FolderIcon from '@material-ui/icons/Folder'
import CircularProgress from '@material-ui/core/CircularProgress'
import styles from './style.module.css'
import { Link } from 'react-router-dom'

class DefaultList extends Component {

    render() {

        const {
            source,
            loading,
        } = this.props

        return (
            <div styleName='root'>
                <Paper>
                    {loading &&
                        <div className={styles.progressContainer}>
                            <CircularProgress className={styles.progress} />
                        </div>
                    }
                    {source &&
                        <List>
                            <ListItem >
                                <ListItemText 
                                    primary={<p className={styles.title}>Repositórios</p>}
                                />
                            </ListItem>
                            {source.length === 0 &&
                                <ListItemText 
                                    primary={<p className={styles.notFound}>Nenhum repositório encontrado.</p>}
                                />
                            }
                            {source.length > 0 && source.map((data) => {
                                return (
                                    <div key={data.id}>
                                        <Divider />
                                        <Link
                                            className={styles.link}
                                            to={`/commits/${data.id}`}
                                            >
                                            <ListItem button>
                                                <Avatar
                                                    alt={data.owner.login}
                                                    src={data.owner.avatar_url}
                                                />
                                                <ListItemText 
                                                    primary={data.name}
                                                    secondary={`${data.stargazers_count} stars`}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton aria-label="Comments">
                                                        <FolderIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </Link>
                                    </div>
                                )
                            })}
                        </List>
                    }    
                </Paper>
            </div>
        )
    }

}

DefaultList.propTypes = {
    repos: PropType.array,
    loading: PropType.bool,
}

export default CSSModules(DefaultList, styles)