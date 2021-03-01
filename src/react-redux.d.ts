import { PersistState } from 'redux-persist'
import State from './redux/state'

declare type DefaultRootState = State & { _persist: PersistState }
