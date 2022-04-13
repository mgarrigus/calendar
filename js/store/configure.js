import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createRequestMiddleware } from 'redux-requests';
import rootReducer from '../reducers';

const logger = store => next => (action) => {
	/* eslint-disable no-console */
	console.group(action.type);
	console.log('The action: ', action);
	const result = next(action);
	console.log('The new state: ', store.getState());
	console.groupEnd();
	/* eslint-enable no-console */
	return result;
};

export default function configureStore (initialState) {
	const middleware = [thunkMiddleware, createRequestMiddleware()];
	if (process.env.NODE_ENV !== 'production') {
		middleware.push(logger);
	}

	let store;
	if (process.env.NODE_ENV !== 'production') {
		store = createStore(
			rootReducer,
			initialState,
			compose(
				applyMiddleware(...middleware),
				window.devToolsExtension ? window.devToolsExtension() : forward => forward // eslint-disable-line no-undef
			)
		);
	} else {
		store = createStore(
			rootReducer,
			initialState,
			applyMiddleware(...middleware)
		);
	}

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextReducer = require('../reducers'); // eslint-disable-line global-require
			store.replaceReducer(nextReducer);
		});
	}

	return store;
}
