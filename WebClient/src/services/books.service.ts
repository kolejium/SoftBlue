import IGetBooksQuery from '../interfaces/queries/books/IGetBooksQuery';
import IPagedResponse from '../interfaces/responses/IPagedResponse';
import IResponse from '../interfaces/responses/IResponse';
import Book from '../types/book';
import { handle } from './query.service';
import ICreateBookQuery from '../interfaces/queries/books/ICreateBookQuery';
import { bookUrl, bookUrlWithFile } from '../consts/api';
import IGetPagedBookQuery from '../interfaces/queries/books/IGetPagedBooksQuery';
import qs from 'qs';
import IWithFileQuery from '../interfaces/queries/books/IWithFileQuery';
import { serialize } from 'object-to-formdata';
import { nameof } from 'ts-simple-nameof';


function getBooks (query: IGetPagedBookQuery) : Promise<IResponse<IPagedResponse<Book>>> {
	const value = `${bookUrl}?${qs.stringify(query)}`;
	const response = fetch(value)
		.then(result => handle(result))
		.then(async data => ({ result: data as IPagedResponse<Book> } as IResponse<IPagedResponse<Book>>))
		.catch(error => ({ error: { text: error } } as IResponse<IPagedResponse<Book>>));

	return response;
}

function getBook (id: string) : Promise<IResponse<Book>> {
	const response = fetch(`${bookUrl}/${id}`)
		.then(result => handle(result))
		.then(async data => ({ result: data as Book } as IResponse<Book>))
		.catch(error => ({ error: { text: error } } as IResponse<Book>));

	return response;
}

function createBook (query: ICreateBookQuery) : Promise<IResponse<Book>> {
	const response = fetch(bookUrl, {
		body: JSON.stringify(query),
		method: 'POST',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(result => handle(result))
		.then(async data => ({ result: data as Book } as IResponse<Book>))
		.catch(error => ({ error: { text: error } } as IResponse<Book>));

	return response;
}

function getPdf (id: string) : Promise<IResponse<string>> {
	const response = fetch(`${bookUrl}/${id}/pdf`)
		.then(result => handle(result))
		.then(async data => ({ result: data as string } as IResponse<string>))
		.catch(error => ({ error: { text: error } } as IResponse<string>));

	return response;
}

function createBookWithFile (query: IWithFileQuery<ICreateBookQuery>) : Promise<IResponse<Book>> {
	const formData = serialize(query, { nullsAsUndefineds: true });

	const response = fetch(bookUrlWithFile, {
		body: formData,
		method: 'POST',
		mode: 'cors',
		credentials: 'same-origin'
	})
		.then(result => handle(result))
		.then(async data => ({ result: data as Book } as IResponse<Book>))
		.catch(error => ({ error: { text: error } } as IResponse<Book>));

	return response;
}

function updateBook (query: ICreateBookQuery) : Promise<IResponse<Book>> {
	const response = fetch(bookUrl, {
		body: JSON.stringify(query),
		method: 'PATCH',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(result => handle(result))
		.then(async data => ({ result: data as Book } as IResponse<Book>))
		.catch(error => ({ error: { text: error } } as IResponse<Book>));

	return response;
}

function deleteBook (id: string) : Promise<IResponse<Book>> {
	const response = fetch(`${bookUrl}/${id}`, { method: 'DELETE' })
		.then(result => handle(result))
		.then(async data => ({ result: data as Book } as IResponse<Book>))
		.catch(error => ({ error: { text: error } } as IResponse<Book>));

	return response;
}

export { createBook, createBookWithFile, getBooks, getBook, getPdf, deleteBook, updateBook };
