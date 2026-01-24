import React from 'react'
import { StateProvider } from '../Context/StateContext'
import { Outlet } from 'react-router-dom'
import { Provider } from "react-redux"
import { store } from '../Store/store'

const ContextWrapper = () => {
  return (
    <StateProvider>
      <Provider store={store}>
        <Outlet />
      </Provider>
    </StateProvider>
  )
}

export default ContextWrapper