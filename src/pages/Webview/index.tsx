import React, { Component } from "react";
import { observer } from "mobx-react";
import { Text, ScrollView, Button, View, Dimensions } from "react-native";
import styles from "./styles";
import PageContainer from "components/PageContainer";
import { NavigationScreenProp } from "react-navigation";
import { WebView } from "react-native-webview";

type State = {};
type Props = {
  navigation: NavigationScreenProp<
    any,
    {
      title: string;
      url: string;
    }
  >;
};
@observer
export default class MyWebview extends Component<Props, State> {
  readonly state: State = {};
  constructor(props: Props) {
    super(props);
  }

  render() {
    const title = this.props.navigation.getParam("title", "");
    const url = this.props.navigation.getParam("url", "");
    return (
      <PageContainer navBarProps={{ title }}>
        <ScrollView contentContainerStyle={styles.container}>
          <WebView
            style={styles.container}
            originWhitelist={["*"]}
            // source={{ html: '<h1>Hello world</h1>' }}
            source={{ uri: url }}
          />
        </ScrollView>
      </PageContainer>
    );
  }
}
