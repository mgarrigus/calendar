import { attemptRequest } from 'redux-requests';
import output from '../utilities/output';

// Helpers
function checkStatus (response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}

	const error = new Error(response.statusText);
	error.response = response;
	throw error;
}

export function createFetchAction (actionName, url, options = {}) {
	const { payload = {}, ...rest } = options;

	return function (dispatch) {
		attemptRequest(
			url,
			{
				begin: () => ({
					type: `${actionName}/BEGIN`,
					payload
				}),
				success: response => ({
					type: `${actionName}/SUCCESS`,
					payload: {
						...payload,
						response
					}
				}),
				failure: (error) => {
					output.error(error);

					return {
						type: `${actionName}/ERROR`,
						error,
						payload
					};
				}
			},
			() => fetch(url, { credentials: 'same-origin', ...rest })
				.then(checkStatus)
				.then(response => response.json()),
			dispatch
		);
	};
}
