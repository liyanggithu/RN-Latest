import React, { Component } from "react";
import { observer } from "mobx-react";
import { Text, ScrollView, Button, View, Dimensions } from "react-native";
import styles from "./styles";
import userStore from "stores/userStore";
import AsyncStorage from "@react-native-community/async-storage";
import Orientation from "react-native-orientation";
import PageContainer from "components/PageContainer";
import navigationUtils from "utils/navigationUtils";
import { NavigationScreenProp } from "react-navigation";

type Props = {
  navigation: NavigationScreenProp<any, { title: string }>;
};
type State = {};

@observer
export default class Home extends Component<Props, State> {
  readonly state: State = {};
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {}

  changePageParams = () => {
    this.props.navigation.setParams({ title: "hehe" });
  };

  render() {
    const title = this.props.navigation.getParam("title", "");
    return (
      <PageContainer navBarProps={{ title }} onDidFocus={() => console.log("focus")}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text>{userStore.data.alias}</Text>
          <View style={styles.box}></View>
          <Button onPress={() => navigationUtils.goBack()} title="back"></Button>
          <Button onPress={this.changePageParams} title="修改参数"></Button>
          <Button onPress={() => navigationUtils.push("DemoTab2")} title="tab"></Button>
          <Button onPress={() => userStore.logout()} title="注销"></Button>
          <Button onPress={() => Orientation.lockToPortrait()} title="竖屏"></Button>
          <Button onPress={() => Orientation.lockToLandscape()} title="横屏"></Button>
          <Button onPress={() => AsyncStorage.clear()} title="清空本地数据缓存"></Button>
          <Button
            onPress={() => navigationUtils.push("Webview", { title: "自定义", url: "https://www.baidu.com" })}
            title="webview"
          ></Button>
          <Button onPress={() => navigationUtils.push("List")} title="下拉列表"></Button>
        </ScrollView>
      </PageContainer>
    );
  }
}
