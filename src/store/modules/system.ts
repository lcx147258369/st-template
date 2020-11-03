import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/store'
const baseUrl = 'http://stapi.qmrqw.com';

export interface ISystemState {
    networkType: boolean,
    showLoading: boolean
}

@Module({ dynamic: true, store, name: 'system' })
class System extends VuexModule implements ISystemState {

  public networkType = true;//网络连接状态
  public showLoading = false;//显示加载动画

  @Mutation
  SET_NETWORKTYPE(payload){
      this.networkType = payload;
  }

  @Mutation
  SET_SHOWLOADING(payload){
      this.showLoading = payload
  }

  
}

export const SystemModule = getModule(System)
