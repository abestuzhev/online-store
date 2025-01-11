import AppProvider from './store';

import Home from './components/Home';

import './scss/main.scss';

function OkvedApp({
  path,
  name,
  step,
  orderId,
  setIsOkved,
  setIsMainOkved,
  value,
  onChangeForm,
}) {
  return (
    <AppProvider>
      <Home
        path={path}
        name={name}
        value={value}
        onChangeForm={onChangeForm}
        step={step}
        orderId={orderId}
        setIsOkved={setIsOkved}
        setIsMainOkved={setIsMainOkved}
      />
    </AppProvider>
  );
}

export default OkvedApp;
