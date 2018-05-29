import React from 'react'
import ReactDOM from 'react-dom'
import PublicRepositories from './PublicRepositories'

it('component render without error', () => {
  const div = document.createElement('div')
  ReactDOM.render(<PublicRepositories />, div)
  ReactDOM.unmountComponentAtNode(div)
})
