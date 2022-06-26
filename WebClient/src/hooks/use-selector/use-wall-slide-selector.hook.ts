import useTypedSelector from './use-typed-selector.hook';

const useWallSliderSelector = () => useTypedSelector(state => state.walls);

export default useWallSliderSelector;
