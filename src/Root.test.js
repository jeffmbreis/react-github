import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'

it('component render without error', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Root />, div)
  ReactDOM.unmountComponentAtNode(div)
})
