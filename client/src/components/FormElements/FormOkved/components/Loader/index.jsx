import style from './style.module.scss'

import loadingImg from '../../images/svg/loading.svg?url'

const Loader = () => {
  return (
    <div className={style.loader}>
      <img
        className={style.loaderImg}
        src={loadingImg}
        alt='loader'
      />
    </div>
  )
}

export default Loader
