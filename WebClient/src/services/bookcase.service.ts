import ICreateBookcaseQuery from '../interfaces/queries/bookcases/ICreateBookcaseQuery';
import IResponse from '../interfaces/responses/IResponse';
import BookcaseType from '../types/bookcase';
import { bookcaseUrl } from '../consts/api';
import { handle } from './query.service';
import IGetPagedBookcasesQuery from '../interfaces/queries/bookcases/IGetPagedBookcasesQuery';
import IPagedResponse from '../interfaces/responses/IPagedResponse';
import qs from 'qs';

function createBookcase (query: ICreateBookcaseQuery) : Promise<IResponse<BookcaseType>> {
	const response = fetch(bookcaseUrl, {
		body: JSON.stringify(query),
		method: 'POST',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(result => handle(result))
		.then(async data => ({ result: data as BookcaseType } as IResponse<BookcaseType>))
		.catch(error => ({ error: { text: error } } as IResponse<BookcaseType>));

	return response;
}

function getBookcases (query: IGetPagedBookcasesQuery) : Promise<IResponse<IPagedResponse<BookcaseType>>> {
	const value = `${bookcaseUrl}?${qs.stringify(query)}`;
	const response = fetch(value)
		.then(result => handle(result))
		.then(async data => ({ result: data as IPagedResponse<BookcaseType> } as IResponse<IPagedResponse<BookcaseType>>))
		.catch(error => ({ error: { text: error } } as IResponse<IPagedResponse<BookcaseType>>));

	return response;
}

function getBookcase (id: string) : Promise<IResponse<BookcaseType>> {
	const response = fetch(`${bookcaseUrl}/${id}`)
		.then(result => handle(result))
		.then(async data => ({ result: data as BookcaseType } as IResponse<BookcaseType>))
		.catch(error => ({ error: { text: error } } as IResponse<BookcaseType>));

	return response;
}

function deleteBookcase (id: string) : Promise<IResponse<BookcaseType>> {
	const response = fetch(`${bookcaseUrl}/${id}`, { method: 'DELETE' })
		.then(result => handle(result))
		.then(async data => ({ result: data as BookcaseType } as IResponse<BookcaseType>))
		.catch(error => ({ error: { text: error } } as IResponse<BookcaseType>));

	return response;
}


export { createBookcase, deleteBookcase, getBookcase, getBookcases };
