import './index.css';
import App from './App';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import ThemeMUI from './lib/themes/ThemeMUI';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { persistor, store } from './lib/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import NotificationContextProvider from './contexts/NotificationContextProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={ThemeMUI}>
          <NotificationContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </NotificationContextProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
