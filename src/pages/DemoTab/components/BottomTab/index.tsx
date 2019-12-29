import React, { Component } from "react";
import { observer } from "mobx-react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import styles from "./styles";
import navigationUtils from "utils/navigationUtils";

type State = {};
type Props = {
  routeName: string;
};
@observer
export default class BottomTab extends Component<Props, State> {
  readonly state: State = {};
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { routeName } = this.props;
    const list = [
      {
        routeName: "DemoTab1",
        name: "DemoTab1"
      },
      {
        routeName: "DemoTab2",
        name: "DemoTab2"
      }
    ];
    return (
      <View style={styles.container}>
        {list.map(v => {
          const isFoused = routeName === v.routeName;
          return (
            <TouchableWithoutFeedback key={v.routeName} style={styles.item} onPress={() => navigationUtils.push(v.routeName)}>
              <Text style={{ color: isFoused ? "red" : "#000" }}>{v.name}</Text>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  }
}
