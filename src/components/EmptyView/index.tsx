import React from "react";
import { Text, View } from "react-native";

type Props = {
  text?: string;
};
const EmptyView: React.FC<Props> = props => {
  return (
    <View>
      <Text style={{ textAlign: "center" }}>{props.text || "暂无数据"}</Text>
    </View>
  );
};
export default EmptyView;
