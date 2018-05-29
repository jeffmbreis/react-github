import React from 'react'
import ReactDOM from 'react-dom'
import DefaultList from './DefaultList'

it('component render without error', () => {
  const div = document.createElement('div')
  ReactDOM.render(<DefaultList />, div)
  ReactDOM.unmountComponentAtNode(div)
})
