import React from 'react'
import ReactDOM from 'react-dom'
import FormSearchRepositories from './FormSearchRepositories'

it('component render without error', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FormSearchRepositories />, div)
  ReactDOM.unmountComponentAtNode(div)
})
