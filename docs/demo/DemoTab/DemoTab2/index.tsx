import React, { Component } from "react";
import { observer } from "mobx-react";
import { Text, ScrollView, Button, View, Dimensions } from "react-native";
import styles from "./styles";
import PageContainer from "components/PageContainer";
import { NavigationScreenProp } from "react-navigation";
import BottomTab from "../components/BottomTab";

type State = {
  num: number;
};
type Props = {
  navigation: NavigationScreenProp<any, {}>;
};
@observer
export default class DemoTab2 extends Component<Props, State> {
  readonly state: State = {
    num: 0
  };
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <PageContainer navBarProps={{ title: "DemoTab2" }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text>{this.state.num}</Text>
          <Button onPress={() => this.setState({ num: this.state.num + 1 })} title={"+1"}></Button>
        </ScrollView>
        <BottomTab routeName="DemoTab2" />
      </PageContainer>
    );
  }
}
