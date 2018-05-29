import React from 'react'
import ReactDOM from 'react-dom'
import InfiniteScroll from './InfiniteScroll'

it('component render without error', () => {
  const div = document.createElement('div')
  ReactDOM.render(<InfiniteScroll content={() => null} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
