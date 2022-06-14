import useTypedSelector from './use-typed-selector.hook';

const useViewSelector = () => useTypedSelector(state => state.view);

export default useViewSelector;
