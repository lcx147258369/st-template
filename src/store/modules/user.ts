import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { mpWeixinLogin, openidLogin, getUserInfo, logout, login, register, smsLogin, unreadMessage } from '@/serve/api';
import { getToken, setToken, removeToken, setItem, getItem, clearAll } from '@/utils/util'
import store from '@/store';

export interface IUserState {
  token: string,
  avatar: string,
  userId: string,
  userName: string,
  userInfo: any,
  nickName: string,
  qq: string,
  isBaseInfo: any,
  isBindWx: any,
  isBindPhone: any,
  userType: any,
  vlogAuth: any,
  douyinAuth: any,
  orderTab: any,
  orderType: any,
  isVip: number,
  vipModal: boolean,
  showAuth: any
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken('token') || '';
  public userId = '';
  public userName = '';
  public avatar = '';
  public userInfo = {};
  public nickName = '';
  public qq = '';
  public isBaseInfo = getItem('isBaseInfo') || '';
  public isBindWx = getItem('isBindWx') || '';
  public userType = '';
  public vlogAuth = '';
  public douyinAuth = '';
  public isBindPhone = getItem('isBindPhone') || '';
  public orderTab = 0;
  public orderType = 'skill';
  public isVip = 0;
  public vipModal = false;
  public tikModal = false;
  public timer = null;
  public viptime = 0;
  public visitor = false;
  public showAuth = '';
  
  @Mutation
  SET_ORDER_TAB(payload: {id: any, type: string}) {
      this.orderTab = payload.id;
      this.orderType = payload.type;
  }

  @Mutation
  SET_SHOW_AUTH (payload: any) {
      this.showAuth = payload;
  }

  @Mutation
  SET_IS_VIP(vip: number) {
    this.isVip = vip;
  }

  @Mutation
  SET_VISITOR(state:boolean){
    this.visitor = state;
  }

  @Mutation
  SET_VIP_MODAL(state: boolean) {
    this.vipModal = state;
  }

  @Mutation
  SET_TIK_MODAL(state:boolean){
    this.tikModal = state;
  }

  @Mutation
  SET_VIP_TIME(time:any){
    this.viptime=time;
  }

  @Mutation
  SET_TOKEN(token: string) {
    this.token = token;
    setToken('token', token);
  }
  @Mutation
  SET_AVATAR(avatar: string) {
     this.avatar = avatar;
  }
  @Mutation
  SET_USER_ID(userId: string) {
  this.userId = userId
  }
  @Mutation
  SET_USER_NAME(userName: string) {
  this.userName = userName
  }

  @Mutation
  SET_NICK_NAME(nickName: string) {
      this.nickName = nickName;
  }

  @Mutation
  SET_USER_INFO(userInfo: object) {
   this.userInfo = userInfo
  }

  @Mutation
  SET_USER_QQ(qq: string) {
     this.qq = qq;
  }

  @Mutation
  SET_IS_BASE_INFO(info: any) {
     this.isBaseInfo = info;
     setItem('isBaseInfo', info);
  }

  @Mutation
  SET_IS_BIND_WX(wx: any) {
     this.isBindWx = wx;
     setItem('isBindWx', wx);
  }

  @Mutation
  SET_IS_BIND_PHONE(payload: any) {
      this.isBindPhone = payload;
      setItem('isBindPhone', payload);
  }

  @Mutation
  CLEAR_TIMER(payload:any){
    this.timer=null;
  }


  @Mutation
  SET_CLIENT_TYPE(type: any) {
     this.userType = type;
  }


  @Action 
  public async mpWeixinLogin (data: {code: string, user_info: any}) {
    try {
        const res: any = await mpWeixinLogin(data);
        if( res.id == 1000) {
            const { is_bind_wx, is_bind_phone, is_base_info } = res.data;
            this.SET_TOKEN(res.data.token);
            this.SET_IS_BIND_WX(is_bind_wx);
            this.SET_IS_BIND_PHONE(is_bind_phone);
            this.SET_IS_BASE_INFO(is_base_info);
            this.GET_MSG_NUM();
            // #ifdef APP-PLUS
            this.unSetVisitor();
            // #endif
            
        }
        return res;
    }
    catch (err) {
        console.log(err)
    }
  }

  @Action
  public async unSetVisitor(){
    this.SET_VISITOR(false);
    var view:any = plus.nativeObj.View.getViewById('hidetab');
    view.addEventListener('click',(e)=>{},false);
    view.close();
  }


  @Action
  public async openidLogin(loginInfo: {openid: any}) {
      try {
            const res: any = await openidLogin(loginInfo);
            if( res.id == 1000) {
                const { is_bind_wx, is_bind_phone, is_base_info } = res.data;
                this.SET_TOKEN(res.data.token);
                this.SET_IS_BIND_WX(is_bind_wx);
                this.SET_IS_BIND_PHONE(is_bind_phone);
                this.SET_IS_BASE_INFO(is_base_info);
                this.GET_MSG_NUM();
                // #ifdef APP-PLUS
                this.unSetVisitor();
                // #endif
                
            }
            return res;
      }
      catch(err) {
          console.log(err);
      }
  }

  @Action
  public async Login(userInfo: { nick: string, pwd: string, code: string }) {
    try {
        const res: any = await login(userInfo);
        if( res.id == 1000) {
            const { is_bind_wx, is_bind_phone, is_base_info } = res.data;
            this.SET_TOKEN(res.data.token);
            this.SET_IS_BIND_WX(is_bind_wx);
            this.SET_IS_BIND_PHONE(is_bind_phone);
            this.SET_IS_BASE_INFO(is_base_info);
            this.GET_MSG_NUM();
            // #ifdef APP-PLUS
            this.unSetVisitor();
            // #endif
            
        }
        return res;
    }
    catch (err) {
        console.log(err)
    }
  }

  @Action
  public async Register (userInfo: { type: number, nick: any, pwd: string, code: string, sms_code: string }) {
        try {
            const res: any = await register(userInfo);
            if( res.id == 1000) {
                const { is_bind_wx, is_bind_phone, is_base_info } = res.data;
                this.SET_TOKEN(res.data.token);
                this.SET_IS_BIND_WX(is_bind_wx);
                this.SET_IS_BIND_PHONE(is_bind_phone);
                this.SET_IS_BASE_INFO(is_base_info);
                //游客身份置否
                // #ifdef APP-PLUS
                this.unSetVisitor();
                // #endif
            }
            return res;
        }
        catch (err) {
            console.log(err + 'vuex register')
        }
  }

  @Action
  public async mobileLogin (userInfo: {nick: string, code: string, code_key: string, sms_code: string}) {
        try {
            const res: any = await smsLogin(userInfo);
            if( res.id == 1000) {
                const { is_bind_wx, is_bind_phone, is_base_info } = res.data;
                this.SET_TOKEN(res.data.token);
                this.SET_IS_BIND_WX(is_bind_wx);
                this.SET_IS_BIND_PHONE(is_bind_phone);
                this.SET_IS_BASE_INFO(is_base_info);
                this.GET_MSG_NUM();
                // #ifdef APP-PLUS
                this.unSetVisitor();
                // #endif
                
            }
            return res;
        }
        catch (err) {
            console.log(err)
        }
  }

  

  @Action
  public ResetToken() {
    removeToken('token');
    this.SET_TOKEN('')
  }

  @Action
  public async GET_MSG_NUM(){
    setInterval(()=>{
        setTimeout(async() => {
            try{
                const {data,id} = await unreadMessage();
                if(id == 1000){
                    uni.$emit('getMsgNum',{num:data.msg_count})
                }
            }catch(err){
                console.log(err)
            }
        }, 0);
    },200000)
  }

  @Action
  public async GetUserInfo(params?: object) {
      try {
            const res: any = await getUserInfo(params);
            if(res.id == 1000) {
                const { uid, name, avatar, type, nickname, qq, is_bind_wx, is_bind_phone, is_base_info, vip_type,vip_end_time, show_auth } = res.data;
                this.SET_AVATAR(avatar);
                this.SET_USER_ID(uid);
                this.SET_USER_NAME(name);
                this.SET_USER_INFO(res.data);
                this.SET_NICK_NAME(nickname);
                this.SET_USER_QQ(qq);
                this.SET_IS_BIND_WX(is_bind_wx);
                this.SET_IS_BIND_PHONE(is_bind_phone);
                this.SET_IS_BASE_INFO(is_base_info);
                this.SET_IS_VIP(vip_type);
                this.SET_VIP_TIME(vip_end_time);
                this.SET_SHOW_AUTH(show_auth);
            }
            return res;
      }
      catch(err) {
            console.log(err);
      }
  }

  @Action
  public async ChangeRoles(role: string) {
    // Dynamically modify permissions
    const token = role + '-token'
    this.SET_TOKEN(token)
    setToken('token', token);
    await this.GetUserInfo()
  }

  @Action
  public async LogOut() {
    try {
        const res:any = await logout();
        if(res.id == 1000) {
            clearAll();
            this.SET_TOKEN('');
            this.SET_AVATAR('');
            this.SET_USER_ID('');
            this.SET_USER_NAME('');
            this.SET_USER_INFO({});
            this.SET_NICK_NAME('');
            this.SET_USER_QQ('');
            this.SET_IS_BIND_WX('');
            this.SET_IS_BIND_PHONE('');
            this.SET_IS_BASE_INFO('');
            this.SET_IS_VIP(0);
            this.CLEAR_TIMER('');
            this.SET_VIP_TIME('');
        }
        return res;
    }
    catch(err) {
        console.log(err);
    }
   
  }
}

export const UserModule = getModule(User)