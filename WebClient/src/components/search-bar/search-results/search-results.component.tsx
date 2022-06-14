import { Button } from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';
import PaginatedList from '../../shared/paginated-list/paginated-list.component';
import { updateQueryPagination } from '../../../redux/slicers/search-books.slice';
import useSearchBooksSelector from '../../../hooks/use-selector/use-search-books-selector.hook';
import EStatus from '../../../enums/estatus';
import { get, remove, search } from '../../../redux/thunks/books.thunk';
import { useAppDispatch } from '../../../hooks/use-app-dispatch.hook';
import BookList from '../../book/book-list/book-list.component';
import { Container } from '@mui/system';
import useBooksSelector from '../../../hooks/use-selector/use-books-selector.hook';
import { useEffect } from 'react';
import { pdfBook, prepareForEditBook, prepareForRemoveBook } from '../../../redux/thunks/modal.thunk';
import { pdf } from '../../../redux/slicers/modal.slice';

const SearchResults = () => {
	const dispatch = useAppDispatch();
	const { status, result, query } = useSearchBooksSelector();
	const { book } = useBooksSelector();

	useEffect(() => {
		if (result?.items.find(x => x.id === book?.id) !== undefined) {
			dispatch(search(query));
		}
	}, [book]);

	switch (status) {
	case EStatus.Loading:
		return <CircularProgress />;
	case EStatus.Rejected:
		return <div>
			<span>Something Wrong</span>
			<Button title="Retry" onClick={() => dispatch(search(query))}/>
		</div>;
	default:
		if (result === undefined || result === null || result.total === 0) {
			return <span>No results</span>
		} else {
			return <Container className={status === EStatus.Default ? 'd-none' : 'd-block'}>
				<PaginatedList size={10}
					countPages={result ? (result.total % 10 === 0 ? result.total / 10 : Math.floor(result.total / 10) + 1) : 0}
					onPageChanged={page => dispatch(updateQueryPagination({ page, size: 10 }))}>
					<BookList books={result ? result.items : []}
						onBookDelete={id => {
							dispatch(prepareForRemoveBook(id));
						}}
						onBookEdit={id => dispatch(prepareForEditBook(id))}
						onBookOpen={id => dispatch(pdfBook(id))}/>
				</PaginatedList>
			</Container>;
		}
	}
};

export default SearchResults;
