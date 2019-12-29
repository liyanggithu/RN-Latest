import React from "react";
import { ListView } from "@ant-design/react-native";
import { ListViewProps } from "@ant-design/react-native/lib/list-view";
import EmptyView from "components/EmptyView";

const PullListView: React.FC<ListViewProps<any>> = props => {
  return <ListView emptyView={() => <EmptyView />} spinnerColor="#333" refreshableColors={["#333"]} allLoadedText="已无更多" {...props} />;
};
export default PullListView;
