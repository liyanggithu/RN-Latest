import React, { Component } from "react";
import { observer } from "mobx-react";
import { Text, ScrollView, Button, View, Dimensions } from "react-native";
import styles from "./styles";
import PageContainer from "components/PageContainer";
import { NavigationScreenProp } from "react-navigation";
import PullListView from "components/PullListView";

type State = {
  layout: string;
};
type Props = {
  navigation: NavigationScreenProp<any, {}>;
};
@observer
export default class ListPage extends Component<Props, State> {
  readonly state = {
    layout: "list"
  };

  sleep = (time: any) => new Promise(resolve => setTimeout(() => resolve(), time));

  onFetch = async (page = 1, startFetch, abortFetch) => {
    try {
      let pageLimit = 10;
      if (this.state.layout === "grid") pageLimit = 60;
      const skip = (page - 1) * pageLimit;

      let rowData = Array.from({ length: pageLimit }, (_, index) => `item -> ${index + skip}`);

      if (page === 3) {
        rowData = [];
      }

      await this.sleep(1000);
      startFetch(rowData, pageLimit);
    } catch (err) {
      abortFetch(); //manually stop the refresh or pagination if it encounters network error
    }
  };

  renderItem = item => {
    return (
      <View style={{ padding: 10, flex: 1 }}>
        <Text>{item}</Text>
      </View>
    );
  };

  render() {
    return (
      <PageContainer navBarProps={{ title: "下拉" }}>
        <Button title="切换列数" onPress={() => this.setState({ layout: this.state.layout === "list" ? "grid" : "list" })}></Button>
        <PullListView
          onFetch={this.onFetch}
          keyExtractor={(item, index) => `${this.state.layout} - ${item} - ${index}`}
          renderItem={this.renderItem}
          numColumns={this.state.layout === "list" ? 1 : 3}
        />
      </PageContainer>
    );
  }
}
