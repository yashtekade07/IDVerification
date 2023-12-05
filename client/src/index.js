import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import {Provider as ReduxProvide} from 'react-redux'
import store from './redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReduxProvide store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ReduxProvide>
  </React.StrictMode>
);
