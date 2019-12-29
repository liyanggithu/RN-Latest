import React, { Component } from "react";
import { observer } from "mobx-react";
import { Text, ScrollView, Button, View, Dimensions, Image } from "react-native";
import styles from "./styles";
import PageContainer from "components/PageContainer";
import { NavigationScreenProp } from "react-navigation";
import BottomTab from "../components/BottomTab";
import NavBar from "components/NavBar";

type State = {};
type Props = {
  navigation: NavigationScreenProp<any, {}>;
};
@observer
export default class DemoTab1 extends Component<Props, State> {
  readonly state: State = {};
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <PageContainer isHiddenNavBar={true}>
        <View style={styles.container}>
          <Image
            source={require("./assets/bg.jpg")}
            style={{
              height: 300,
              width: "100%",
              position: "absolute",
              top: 0,
              left: 0
            }}
          />
          <NavBar title="DemoTab1" backgroundColor="transparent" />
          <ScrollView contentContainerStyle={styles.container}>
            <Text>content</Text>
          </ScrollView>
          <BottomTab routeName="DemoTab1" />
        </View>
      </PageContainer>
    );
  }
}
