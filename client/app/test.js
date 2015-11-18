import store from './store'
import { loadUser } from './actions/user'

store.dispatch(loadUser('current'));
