import Vue from 'vue'
import Vuex from 'vuex'
// import { IAppState } from './modules/app'
import { IUserState } from './modules/user'
import { ISystemState } from './modules/system'
Vue.use(Vuex)

export interface IRootState {
  user: IUserState,
  system: ISystemState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
