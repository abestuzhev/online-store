import {createContext, useReducer} from 'react'
import {initialState, okwedReducer} from './reducer'

export const AppContext = createContext()

const AppProvider = ({children, ...props}) => {
  const providerInitialState = {...initialState, ...props}

  const [state, dispatch] = useReducer(okwedReducer, providerInitialState)

  const data = {state, dispatch}
  window.ss = state

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>
}

export default AppProvider
