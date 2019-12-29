import React, { Component } from "react";
import { observer } from "mobx-react";
import { Text, ScrollView, Button } from "react-native";
import styles from "./styles";
import { Actions } from "react-native-router-flux";
import userStore from "stores/userStore";
import PageContainer from "components/PageContainer";
import navigationUtils from "utils/navigationUtils";
import { NavigationScreenProp } from "react-navigation";

type Props = {
  navigation: NavigationScreenProp<any, {}>;
};
type State = {};

@observer
export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {}
  render() {
    return (
      <PageContainer navBarProps={{ title: "登录" }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Button onPress={Actions.pop} title="back"></Button>
          <Button onPress={() => navigationUtils.push("Home", { title: "首页" })} title="home"></Button>
          <Button onPress={() => userStore.login("hahah", "123456")} title="登录"></Button>
        </ScrollView>
      </PageContainer>
    );
  }
}
