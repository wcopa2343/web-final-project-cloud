import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Header from '../components/Header'
import HeaderRegular from '../components/HeaderRegular'
import HeaderResponsive from '../components/HeaderResponsive'
import LoginMenu from '../components/LoginMenu'
import LoginMenuResponsive from '../components/LoginMenuResponsive'
import ManageMenu from '../components/ManageMenu'
import store from '../redux/store'

describe('Displaying Header ', () => {
  test('Rendering Header ', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    )
  })
})

describe('Displaying Header in regular size', () => {
  test('Rendering Header in regular size', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HeaderRegular />
        </BrowserRouter>
      </Provider>,
    )
  })
})

describe('Displaying Header in responsive size', () => {
  test('Rendering Header in responsive size', () => {
    window.innerWidth = 500
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HeaderResponsive />
        </BrowserRouter>
      </Provider>,
    )
  })
})

describe('Displaying LoginResponsive ', () => {
  test('Rendering LoginResponsive', () => {
    window.innerWidth = 500
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginMenuResponsive />
        </BrowserRouter>
      </Provider>,
    )
  })
})

describe('Displaying LoginMenu ', () => {
  test('Rendering LoginMenu', () => {
    const userData = {
      email: 'luchopesi10@hotmail.com',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Imx1aXMuY2hvcXVlIiwiaWQiOiIxIiwibmJmIjoxNjA5MzYzOTk0LCJleHAiOjE2MDkzNjc1OTQsImlhdCI6MTYwOTM2Mzk5NCwiaXNzIjoiaHR0cDovL2Jvb3RjYW1wLWphbGFzb2Z0LmNvbSIsImF1ZCI6IkdhdGV3YXkifQ.bU-osAj_vWmH6r0iQ6i6InasA09zbpoi7QpL_jrv_ZE',
      userId: 1,
      username: 'luis.choque',
    }
    window.innerWidth = 500
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginMenu userInfo={userData} />
        </BrowserRouter>
      </Provider>,
    )
  })
})

describe('Displaying ManageMenu ', () => {
  test('Rendering ManageMenu', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ManageMenu />
        </BrowserRouter>
      </Provider>,
    )
  })
})
