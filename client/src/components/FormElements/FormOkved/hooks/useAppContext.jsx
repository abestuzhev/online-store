import {useContext} from 'react'
import {AppContext} from '../store'

const UseAppContext = () => {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error(
      'useAppContext может быть использован только внутри AppProvider'
    )
  }

  return context
}

export default UseAppContext
