import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import dayjs from 'dayjs';
import store from './store';
import App from './App';

import 'dayjs/locale/ru';
// import './providers/Locale/locale';
import { SkeletonTheme } from 'react-loading-skeleton';

dayjs.locale('ru');
const container = document.getElementById('store');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <SkeletonTheme>
        <App />
    </SkeletonTheme>
  </Provider>
);

