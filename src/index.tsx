import ReactDOM from 'react-dom/client';
import './services/styles/global.scss';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { persistor, store } from './services/redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);

reportWebVitals();
