import useTypedSelector from './use-typed-selector.hook';

const useViewSelector = () => useTypedSelector(state => state.viewMode);

export default useViewSelector;
