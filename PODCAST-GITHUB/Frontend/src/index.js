import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";

import { Provider } from 'react-redux';
import store from './store';

import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
// import IntlProviderWrapper from "../src/hoc/IntlProviderWrapper"
// import reduxStore, { persistor } from './redux';

import './index.css';
import './output.css';

const options = {
	timeout: 3000,
	position: positions.BOTTOM_CENTER,
	transition: transitions.SCALE,
};

ReactDOM.render(
	<Provider store={store}>
		<AlertProvider template={AlertTemplate} {...options}>
			<App />
		</AlertProvider>
	</Provider>,
	document.getElementById('root'),
);
