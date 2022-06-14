import { combineReducers } from '@reduxjs/toolkit';

import searchBarSlice from '../slicers/search-bar.slice';
import searchBooksSlice from '../slicers/search-books.slice';
import modalSlice from '../slicers/modal.slice';
import booksSlice from '../slicers/books.slice';
import notificationSlice from '../slicers/notification.slice';
import viewSlice from '../slicers/view.slice';

const reducer = combineReducers({
	modal: modalSlice,
	view: viewSlice,
	notification: notificationSlice,
	books: booksSlice,
	searchBar: searchBarSlice,
	searchBooks: searchBooksSlice
});

export default reducer;
