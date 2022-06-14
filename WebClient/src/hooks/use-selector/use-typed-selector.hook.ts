import ReducerState from '../../redux/types/states/reducerState';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const useTypedSelector : TypedUseSelectorHook<ReducerState> = useSelector;

export default useTypedSelector;
