import useTypedSelector from './use-typed-selector.hook';

const useSearchSelector = () => useTypedSelector(state => state.searchBooks);

export default useSearchSelector;
