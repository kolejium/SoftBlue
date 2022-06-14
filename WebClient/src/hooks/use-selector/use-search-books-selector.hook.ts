import useTypedSelector from './use-typed-selector.hook';

const useSearchBooksSelector = () => useTypedSelector(state => state.searchBooks);

export default useSearchBooksSelector;
