import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { getItem, setItem } from '@/utils/util';
const baseUrl = 'http://stapi.qmrqw.com';

export interface ISystemState {
    networkType: boolean,
    showLoading: boolean,
    invite: string,
    from: string
}

@Module({ dynamic: true, store, name: 'system' })
class System extends VuexModule implements ISystemState {
  public invite = getItem('invite') || '';
  public networkType = true;//网络连接状态
  public showLoading = false;//显示加载动画
  public from = ''; // 分享重定向地址

  @Mutation
  SET_NETWORKTYPE(payload){
      this.networkType = payload;
  }

  @Mutation
  SET_SHOWLOADING(payload){
      this.showLoading = payload
  }

  @Mutation
  SET_INVITE(invite: string) {
    this.invite = invite;
    setItem('invite', invite);
  }
  
  @Mutation
  SET_FROM(from: string) {
    this.from = from;
    setItem('from', from);
  }
  
}

export const SystemModule = getModule(System)
