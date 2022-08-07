import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import LayoutTemplate from './components/common/LayoutTemplate'
import Router from './components/Router'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <LayoutTemplate>
        <Router />
      </LayoutTemplate>
    </BrowserRouter>
  )
}

export default App
