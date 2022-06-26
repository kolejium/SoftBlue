import { combineReducers } from '@reduxjs/toolkit';

import searchBarSlice from '../slicers/search-bar.slice';
import searchBooksSlice from '../slicers/search-books.slice';
import modalSlice from '../slicers/modal.slice';
import booksSlice from '../slicers/books.slice';
import notificationSlice from '../slicers/notification.slice';
import viewModeSlice from '../slicers/viewMode.slice';
import viewSlice from '../slicers/view.slice';
import wallsSlice from '../slicers/walls.slice';
import bookcasesSlice from '../slicers/bookcases.slice';

const reducer = combineReducers({
	modal: modalSlice,
	view: viewSlice,
	viewMode: viewModeSlice,
	notification: notificationSlice,
	books: booksSlice,
	bookcases: bookcasesSlice,
	searchBar: searchBarSlice,
	searchBooks: searchBooksSlice,
	walls: wallsSlice
});

export default reducer;
