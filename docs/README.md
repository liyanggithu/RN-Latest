# react-native-demo

> typescript + reactnative + mobx

## 安装、运行

[RN 安装教程](https://reactnative.cn/docs/0.62/getting-started.html)

### 安卓

- `yarn install` 安装
- `yarn android` 

- 安装 apk 到真机手机，摇晃手机，出现调试弹窗，点击 dev setting，点击 debug server host，输入 本机 ip+":8081"，在 reload
- 如果服务器窗口没打开，就 yarn start

### 苹果

- `yarn install` 安装
-  电脑只安装一次 
```bash
gem sources --remove https://rubygems.org/
gem sources -a http://gems.ruby-china.com/ 
sudo gem install cocoapods
# https://mirror.tuna.tsinghua.edu.cn/help/CocoaPods/  CocoaPods 镜像使用帮助
cd ~/.cocoapods/repos 
pod repo remove master
git clone https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git master
```
- `cd ios/ && pod install && cd ..`, 
- `yarn ios` 运行



### 其他相关命令

- `yarn install` 安装
- `yarn android` 运行安卓
- `yarn ios` 运行 ios， 指定机型`react-native run-ios --simulator "iPhone 8”`
- `yarn start` 运行 dev server
- `yarn sassToStyles` 运行 sass 样式编译
- `docsify serve docs --port 8001 --open true` 运行本地 docs 服务器，需要全局安装一次`npm i docsify-cli -g`


## 打包

[打包教程 1](https://reactnative.cn/docs/signed-apk-android/)
[打包教程 2](https://www.jianshu.com/p/6d1ee919ded3)

### android
> 生成测试应用的发行版本 `react-native run-android --variant=release`
在 debug 和 release 版本间来回切换安装时可能会报错签名不匹配，此时需要先卸载前一个版本再尝试安装

- `yarn run build-android`
- 修改版本号 /android/app/build.gradle
- `cd android && gradlew assembleRelease` 或者 `gradlew app:assembleRelease`
- apk 文件夹路径： /android/app/build/outputs/apk, 
一般`app-armeabi-v7a-release.apk` 适用真机
`app-x86-release.apk` 适用模拟器


### ios

- yarn run build-ios
- 打包源为 generic ios device
- product -> scheme -> edit scheme -> archieve
- product -> archieve

## [插件](https://js.coach/?collection=React+Native)

- [mobx](https://cn.mobx.js.org)
- 路由
- - [源路由](https://reactnavigation.org/docs/en/getting-started.html)
- - [用这个路由 react-native-router-flux](https://github.com/aksonov/react-native-router-flux#readme)
- [屏幕旋转 react-native-orientation](https://www.npmjs.com/package/react-native-orientation)
- [初始屏幕 react-native-splash-screen](https://www.npmjs.com/package/react-native-splash-screen)
- [安卓主动要求权限](https://facebook.github.io/react-native/docs/permissionsandroid.html) `import { PermissionsAndroid } from 'react-native'`
- [屏幕常亮 react-native-keep-awake](https://github.com/corbt/react-native-keep-awake)
- [文件管理系统 rn-fetch-blob](https://github.com/joltup/rn-fetch-blob)
- [摄像头+二维码扫描 react-native-camera](https://github.com/react-native-community/react-native-camera)
- 选择图片
- - 选择裁剪图片 1 https://github.com/ivpusic/react-native-image-crop-picker
- [渐变色 react-native-linear-gradient](https://github.com/react-native-community/react-native-linear-gradient)
- 图片放大缩小
- - [react-native-image-viewer](https://github.com/ascoders/react-native-image-viewer)
- [自定义弹窗 react-native-modalbox](https://github.com/maxs15/react-native-modalbox)
- [设备信息 react-native-device-info](https://github.com/rebeccahughes/react-native-device-info)

未安装
- 选择图片
- - 选择普通图片 https://github.com/react-community/react-native-image-picker
- - 选择裁剪图片 1 https://github.com/ivpusic/react-native-image-crop-picker
- - 选择裁剪图片 2 https://github.com/syanbo/react-native-syan-image-picker
- 推送
- - [极光推送](https://github.com/jpush/jpush-react-native)
- - [腾讯推送](https://github.com/kitt1987/ReactNativeTencentXG)
- [模糊效果 react-native-blur](https://github.com/react-native-community/react-native-blur)
- 图片放大缩小
- - [react-native-image-viewer](https://github.com/ascoders/react-native-image-viewer)
- - [react-native-photo-view](https://github.com/alwx/react-native-photo-view)
- - [单图放大](https://github.com/oblador/react-native-lightbox)
- 支付
- - 微信支付 react-native-wechat
- - 支付宝支付 react-native-yunpeng-alipay
- [分享 react-native-share](https://github.com/react-native-community/react-native-share)
- [多图预览 放大缩小 react-native-image-viewer](https://github.com/ascoders/react-native-image-viewer)
- [截屏](https://github.com/gre/react-native-view-shot)
- 热更新: 苹果开始封热更新，假如要用，要手动改插件的包名和函数名
- - [中文网](https://github.com/reactnativecn/react-native-pushy/blob/master/docs/guide.md)
- - [微软](https://github.com/Microsoft/react-native-code-push)

## 目录结构

```
react-project
├── package.json
├── android                               // 安卓源文件
├── ios                                   // 苹果源文件
├── docs                                  // 文档
└── src
    ├── index.tsx                         // 启动文件
    ├── components                        // 公共组件
    ├── pages                            // 路由
    ├── services                          // api服务
    |   └── commonFn                      // api公共函数
    ├── stores                            // 全局数据管理
    |   ├── configStore                 // 常量
    |   └── userStore                     // 用户数据
    └── styles                            // 公共样式
```
