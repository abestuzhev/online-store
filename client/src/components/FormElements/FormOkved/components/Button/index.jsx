import classNames from 'classnames'

import style from './style.module.scss'
import useAppContext from '../../hooks/useAppContext'

const Button = ({children, onClick, outline, icon, modal}) => {
  const {state} = useAppContext()
  const {stepName} = state

  return (
    <button
      className={classNames(style.btn, {
        [style.btnOutline]: outline,
        [style.btnWithIcon]: icon,
        [style.btnNotInLicense]: stepName !== 'CompanyLicense' && !modal
      })}
      type='button'
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
