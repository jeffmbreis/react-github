import React from 'react'
import ReactDOM from 'react-dom'
import Commits from './Commits'
import { BrowserRouter } from 'react-router-dom'

it('component render without error', () => {
  const div = document.createElement('div')
  ReactDOM.render(<BrowserRouter><Commits match={{params: {owner: 'reactjs', repo: 'core-notes'}}} /></BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})
