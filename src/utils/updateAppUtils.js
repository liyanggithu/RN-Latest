import { Platform, Alert, Linking } from 'react-native';

import {
  isFirstTime,
  isRolledBack,
  packageVersion,
  currentVersion,
  checkUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
  markSuccess,
} from 'react-native-update';

import _updateConfig from '../../update.json';
const { appKey } = _updateConfig[Platform.OS];

// metaInfo
// loadapp 原生强制下载新版
// 1 js 提示更新,并且提示下载完毕
// 2 js 提示更新,自动重启
// 不填就 强制更新 自动重启
export function checkAppIsFirstTime() {
  if (isFirstTime) {
    markSuccess();
    return;
    Alert.alert(
      '提示',
      '这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本',
      [
        {
          text: '是',
          onPress: () => {
            throw new Error('模拟启动失败,请重启应用');
          },
        },
        {
          text: '否',
          onPress: () => {
            markSuccess();
          },
        },
      ]
    );
  } else if (isRolledBack) {
    Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
  }
}
export function doAppUpdate(info) {
  return downloadUpdate(info)
    .then((hash) => {
      if (info.metaInfo == '1') {
        Alert.alert('提示', '下载完毕,是否重启应用?', [
          {
            text: '是',
            onPress: () => {
              switchVersion(hash);
            },
          },
          { text: '否' },
          {
            text: '下次启动时',
            onPress: () => {
              switchVersionLater(hash);
            },
          },
        ]);
      } else {
        switchVersion(hash);
      }
    })
    .catch((error) => {
      console.log(error);
      Alert.alert('提示', '更新失败.');
    });
}
export function checkAppUpdate(upToDate = false) {
  return checkUpdate(appKey)
    .then((info) => {
      if (info.expired) {
        Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
          {
            text: '确定',
            onPress: () => {
              info.downloadUrl && Linking.openURL(info.downloadUrl);
            },
          },
        ]);
      } else if (info.upToDate) {
        if (upToDate) {
          Alert.alert('提示', '您的应用版本已是最新.');
        }
      } else {
        if (info.metaInfo == 'loadapp') {
          //原生强制更新
          Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
            {
              text: '确定',
              onPress: () => {
                info.downloadUrl && Linking.openURL(info.downloadUrl);
              },
            },
          ]);
        } else if (info.metaInfo == '1' || info.metaInfo == '2') {
          //js 提示更新
          Alert.alert(
            '提示',
            '检查到新的版本' + info.name + ',是否下载?\n' + info.description,
            [
              {
                text: '是',
                onPress: () => {
                  doAppUpdate(info);
                },
              },
              { text: '否' },
            ]
          );
        } else {
          //js 强制更新 自动重启
          doAppUpdate(info);
        }
      }
      return info;
    })
    .catch((error) => {
      console.log(error);
      Alert.alert('提示', '更新失败.');
    });
}
