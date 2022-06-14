import useTypedSelector from './use-typed-selector.hook';

const useBooksSelector = () => useTypedSelector(state => state.books);

export default useBooksSelector;
