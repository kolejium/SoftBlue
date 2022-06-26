import CloseIcon from '@mui/icons-material/Close';
import { Container, IconButton, Toolbar } from '@mui/material';

import SearchResults from './search-results/search-results.component';
import SearchControl from './search-control/search-control.component';
import { useAppDispatch } from '../../hooks/use-app-dispatch.hook';
import { hide } from '../../redux/slicers/search-bar.slice';
import { useEffect } from 'react';
import { search } from '../../redux/thunks/books.thunk';
import useSearchBooksSelector from '../../hooks/use-selector/use-search-books-selector.hook';
import useViewSelector from '../../hooks/use-selector/use-view-selector.hook';

function SearchBar () {
	const dispatch = useAppDispatch();
	const viewMode = useViewSelector();
	const { query } = useSearchBooksSelector();

	useEffect(() => {
		dispatch(search(query));
	}, [query]);

	return <div>
		<Toolbar className={viewMode === 'smart' ? 'flex-row justify-content-between' : 'd-none'}>
			<span>Search</span>
			<IconButton onClick={() => dispatch(hide())}>
				<CloseIcon />
			</IconButton>
		</Toolbar>
		<Container className="py-2">
			<SearchControl />
			<SearchResults />
		</Container>
	</div>;
}

export default SearchBar;
