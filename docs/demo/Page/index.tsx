import React, { Component } from "react";
import { observer } from "mobx-react";
import { Text, ScrollView, Button, View, Dimensions } from "react-native";
import styles from "./styles";
import PageContainer from "components/PageContainer";
import { NavigationScreenProp } from "react-navigation";

type State = {};
type Props = {
  navigation: NavigationScreenProp<any, {}>;
};
@observer
export default class Page1 extends Component<Props, State> {
  readonly state: State = {};
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <PageContainer navBarProps={{ title: "Page1" }}>
        <ScrollView contentContainerStyle={styles.container}></ScrollView>
      </PageContainer>
    );
  }
}
