# reactnative starter

## 项目语法 
typscript

## 首次运行项目
### 开发环境
[RN安装教程](https://reactnative.cn/docs/0.62/getting-started.html)
```bash 
yarn install
# 苹果端还要执行这个 cd ios/ && pod install
react-native run-android
```
* 安装apk到真机手机，摇晃手机，出现调试弹窗，点击dev setting，点击debug server host，输入 本机ip+":8081"，在reload
* 如果服务器窗口没打开，就 yarn start

* `docsify serve docs --port 8001 --open true` 运行本地docs服务器，需要全局安装一次`npm i docsify-cli -g`


### 打包项目
[打包教程](http://www.reactnative.vip/thread-12-1-1.html)

#### android打包：
* 签名
```bash 
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

* 更换签名文件地址 
```bash 
'/android/app/build/gradle'
```

* 打包bundle文件
```bash 
curl -k "http://localhost:8081/index.android.bundle" > android/app/src/main/assets/index.android.bundle
```

* 进去/android目录 打包apk
```bash 
gradlew assembleRelease
```

* 获取签名验证 md5 sha1
```bash 
keytool -list -v -keystore my-release-key.keystore
```

## 设计图 

## ui库
https://antd-mobile.gitee.io/docs/react/introduce-cn

## 后台接口

## 运营后台


## 店铺后台

## 蒲公英


## rn中文网热更新
https://github.com/reactnativecn/react-native-pushy/blob/master/docs/guide3.md
http://update.reactnative.cn/login


## 百度移动统计
https://mtj.baidu.com/web/sdk/index

## xcode真机sdk
https://www.jianshu.com/p/1a33e36c4b67


## [寻找插件](https://js.coach/?collection=React+Native)

* 屏幕旋转 react-native-orientation
https://www.npmjs.com/package/react-native-orientation

* 初始屏幕 react-native-splash-screen
https://www.npmjs.com/package/react-native-splash-screen

* 文件管理系统 react-native-fetch-blob
https://github.com/joltup/rn-fetch-blob

* 安卓主动要求权限
import { PermissionsAndroid } from 'react-native';
https://facebook.github.io/react-native/docs/permissionsandroid.html

* ajax接口请求 axios
services/commonFn.js

* 摄像头+二维码扫描 react-native-camera
https://github.com/react-native-community/react-native-camera

* 选择图片 react-native-image-picker
https://github.com/react-community/react-native-image-picker
可裁剪 https://github.com/syanbo/react-native-syan-image-picker

* 推送 
极光
https://github.com/jpush/jpush-react-native
腾讯
https://github.com/kitt1987/ReactNativeTencentXG

* 图标 react-native-vector-icons
https://github.com/oblador/react-native-vector-icons
https://oblador.github.io/react-native-vector-icons/

* 渐变色、模糊效果 
渐变色 react-native-linear-gradient
https://github.com/react-native-community/react-native-linear-gradient
模糊效果 react-native-blur
https://github.com/react-native-community/react-native-blur

* 图片放大缩小 
react-native-image-viewer
https://github.com/ascoders/react-native-image-viewer
react-native-photo-view
https://github.com/alwx/react-native-photo-view
单图放大
https://github.com/oblador/react-native-lightbox

* 蓝牙

* 第三方登录

* 第三方支付
react-native-yunpeng-alipay
react-native-wechat

* 地图
百度地图（复杂功能，有圆圈，画线，自定义标注之类，但应用包接近8m大小）
https://github.com/qiuxiang/react-native-baidumap-sdk
百度地图（普通百度图，功能简陋）
https://github.com/lovebing/react-native-baidu-map

* 图表

* 视频，音频
视频 react-native-video
https://github.com/react-native-community/react-native-video
https://github.com/abbasfreestyle/react-native-af-video-player
音频
https://github.com/zmxv/react-native-sound
文字转语音
http://developer.baidu.com/vcast

* 弹窗，toast，popover
popover
https://github.com/jeanregisser/react-native-popover

* 解锁， 密码、指纹、手势
手势解锁
https://github.com/spikef/react-native-gesture-password

* 手机设备信息 react-native-device-info
https://github.com/rebeccahughes/react-native-device-info

* 热更新
中文网
https://github.com/reactnativecn/react-native-pushy/blob/master/docs/guide.md
微软
https://github.com/Microsoft/react-native-code-push

* style样式 react-native-sass-to-stylesheet
https://github.com/kszitt/react-native-sass-to-stylesheet

* 新版路由
路由+url打开app
https://reactnavigation.org/docs/en/getting-started.html
头部按钮
https://github.com/vonovak/react-navigation-header-buttons
https://github.com/aksonov/react-native-router-flux#readme

* 自定义 上刷下拉 滚动条刷新
下拉刷新
https://github.com/razor1895/react-native-refreshable-flatlist
左滑右滑更多
https://github.com/jemise111/react-native-swipe-list-view

* 动画

* 分享  react-native-share
https://github.com/react-native-community/react-native-share

* 多图预览 放大缩小 react-native-image-viewer
https://github.com/ascoders/react-native-image-viewer

* 轮播图
https://github.com/leecade/react-native-swiper

* openGL
https://github.com/gre/gl-react-native-v2

* 悬浮按钮
https://github.com/mastermoo/react-native-action-button

* 截屏工具
https://github.com/gre/react-native-view-shot

* 文档阅读器
https://github.com/philipphecht/react-native-doc-viewer

* 屏幕常亮
https://github.com/corbt/react-native-keep-awake

* 打包安卓和苹果
安卓
http://www.reactnative.vip/thread-12-1-1.html
苹果
https://www.jianshu.com/p/6d1ee919ded3

* 自定义弹窗
https://github.com/maxs15/react-native-modalbox

* 圆形进度条
https://github.com/andy9775/React-Native-CircularProgress

* 重启app
https://github.com/avishayil/react-native-restart

* 获取bundle文件路径
import resolveAssetSource from "resolveAssetSource";
resolveAssetSource(require("./assets/icon_wanc.png")).uri

* 自适应高度图片
https://github.com/vivaxy/react-native-auto-height-image