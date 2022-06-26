import useTypedSelector from './use-typed-selector.hook';

const useBookcasesSelector = () => useTypedSelector(state => state.bookcases);

export default useBookcasesSelector;
