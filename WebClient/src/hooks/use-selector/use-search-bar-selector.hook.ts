import useTypedSelector from './use-typed-selector.hook';

const useSearchBarSelector = () => useTypedSelector(state => state.searchBar);

export default useSearchBarSelector;
