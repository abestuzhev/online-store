import ReactDOM from 'react-dom'
import OkvedApp from './okvedApp'

const root = document.querySelector('#rootOkwed')
const path = root.dataset.path
const step = root.dataset.step
const orderId = root.dataset.orderId

ReactDOM.render(
  <React.StrictMode>
    <OkvedApp path={path} step={step} orderId={orderId}/>
  </React.StrictMode>,
  document.getElementById('rootOkwed')
)
