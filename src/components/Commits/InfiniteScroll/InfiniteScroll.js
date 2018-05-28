import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './style.module.css'

class InfiniteScroll extends Component {

    state = {
        prevY: 0,
    }

    componentDidMount() {
        const options = {
            threshold: 0.5,
        }

        this.observer = new IntersectionObserver(
            this._handleObserver,
            options,
        )

        this.observer.observe(this.refLoadingIndicator)
    }

    componentDidUpdate() {
        if (this.props.stop) {
            this.observer.unobserve(this.refLoadingIndicator)
        } else {
            this.observer.observe(this.refLoadingIndicator)
        }
    }

    render() {
        const {
            loadingIndicator,
            content,
            loading,
        } = this.props

        let loadingIndicatorStyle = loading ? `${styles['loading-indicator']}` : `${styles['loading-indicator-hidden']}`

        return (
            <div className={styles.root}>
                <Paper>
                    <div className={styles.root}>
                        {content()}
                        <div
                            className={loadingIndicatorStyle}
                            ref={(node => (this.refLoadingIndicator = node))}>
                            {loadingIndicator}
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }

    _handleObserver = (entities) => {
        const y = entities[0].boundingClientRect.y

        if (this.state.prevY > y) {
            this.props.scrollLoadRequested()
        }

        this.setState({
            prevY: y,
        })
    }
}

InfiniteScroll.propTypes = {
    loadingIndicator: PropTypes.node,
    content: PropTypes.func,
    scrollLoadRequested: PropTypes.func,
    loading: PropTypes.bool,
    stop: PropTypes.bool,
}

InfiniteScroll.defaultProps = {
    loadingIndicator: <CircularProgress />,
}

// eslint-disable-next-line
export default CSSModules(
    InfiniteScroll,
    styles
)