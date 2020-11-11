# stlm_uni

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


st-ui 基于uview的优化组件




StDialog

Props
————————————————————————————————————————————————————————————————————————
title           弹窗的标题           String          无              无
show            显示状态             Boolean       false            true
isCancel        显示取消按钮          Boolean       false            true
isConfirm       显示确定按钮          Boolean       true             false
cancelTitle     取消按钮文本          String        取消              文本
confirmTitle    确定按钮文本          String        确定              文本
titleStyle      标题样式              Object        null             {}
contentStyle    内容样式              Object        null             {}
cancelStyle     取消按钮样式          Object        null              {}

Event
————————————————————————————————————————————————————————————————————————
confirm         点击确认按钮时触发
cancel          点击取消按钮时触发

Slots
————————————————————————————————————————————————————————————————————————
title           自定义头部内容





StCollect

Props
________________________________________________________________________
isCollect       收藏的状态          Boolean        false            true
titleStyle      收藏文本的样式      Object          null             -
icon            未收藏的图标        String          -            -
collectIcon     收藏状态的图标      String          -            -
title           未收藏的文本        String          取消             -
collectTitle    已收藏的文本        String          收藏             -
size            图片的大小          Object          {width: '44rpx', heigth: '44rpx'}            -


Event
________________________________________________________________________
collect         点击收藏按钮后的回调    






StLoading

Props
________________________________________________________________________
iconUri         加载动画图片        String          uri              -
loadText        加载的文本          String          加载中...        -
imgStyle        图片的样式          Object          null             -
textStyle       文本的样式          Object          null             -
show            组件的隐藏显示       Boolean        false            -





StPreviewImage  

Props
__________________________________________________________________________
styles          缩略图的样式        Object          -                -





StReviewState

Props
___________________________________________________________________________
stateText       订单状态文本        String           -                -
hintText        提示信息            String           -                -
type            图标类型            String           -         success/error/finish/cancel/




StScrollList

Props
_____________________________________________________________________________
tabList         菜单数据列表         Array           null              -            [{title: '数据示例', id: 0, num: 1}]
num             是否需要后面的数字   Boolean          fasle            true
index           当前选中的下标       number           0                -    
rightIcon       右侧的展开菜单       string           -                -        

Event
_____________________________________________________________________________
iconClick       点击折叠按钮的回调   



StPopupList

Props
______________________________________________________________________________
show            是否显示下拉菜单      Boolean        false              true
tabInd          选中的下标            Number           0                 -
dataList        下拉菜单列表          Array            null              -          [{title: '数据示例', icon: '', id: 0}]
boxStyle        外层样式              Object          null               -          
itemStyle       选项样式              Object          null               -
activeStyle     选中的样式            Object          null               -

Event
______________________________________________________________________________
change          点击选项的回调函数




StUpload

Props
_______________________________________________________________________________
loadLeng        需要上传的数量           Number             1               -
loadType        上传类型                 String            img              video/zip
maximum         上传选择最大数量          Number            1                -
dataList        展示的数据               Array              null             -        [{id: 0, cover: ''}]
params          额外的参数               Object             null             -
disabled        禁用上传                 Boolean            false            true
isErrorText     是否需要显示失败的原因    Boolean             false            true
postUrl         上传的URL                String              -                -  



components中的组件，不需要使用到的可以先去掉