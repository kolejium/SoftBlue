import { useRef } from 'react';

import QueryType from '../types/queryType';

function useSendQuery (query : QueryType) {
	const lastAbortController = useRef<AbortController>();

	const sendQueryFunction = (query : QueryType) => {
		if (lastAbortController.current) {
			lastAbortController.current.abort();
		}

		const currentAbortController = new AbortController();
		lastAbortController.current = currentAbortController;

		// const currentPromise =
	};

	return sendQueryFunction;
}
