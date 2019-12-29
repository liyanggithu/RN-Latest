import React from "react";
import { View, Image, TouchableWithoutFeedback, StatusBar, ViewStyle } from "react-native";
import { WebView } from "react-native-webview";
import { chartHtmlStr } from "./assets/map";

interface Props {
  style?: ViewStyle;
}
interface State {}
export default class MapWebview extends React.Component<Props, State> {
  webview: any;

  onLoad = () => {
    const sendData: Object = {
      type: "initData",
      data: {}
    };
    this.webview.postMessage(JSON.stringify(sendData));
    // console.log(sendData);
  };

  onMessage = e => {
    // { type:'', data:{} }
    // console.log(e.nativeEvent.data);
    let response = JSON.parse(e.nativeEvent.data);
    let data = response.data;
    this.setState({
      message: e.nativeEvent.data
    });
    switch (response.type) {
      case "loaded":
        this.onLoad();
        break;
      default:
        break;
    }
  };

  render() {
    const { style } = this.props;
    const patchPostMessageFunction = function() {
      let originalPostMessage = window.postMessage;
      let patchedPostMessage = function(message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer);
      };
      patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace("hasOwnProperty", "postMessage");
      };
      window.postMessage = patchedPostMessage;
    };
    const patchPostMessageJsCode = "(" + String(patchPostMessageFunction) + ")();";

    return (
      <WebView
        style={[{ height: 300 }, style]}
        // originWhitelist={["*"]}
        // injectedJavaScript={patchPostMessageJsCode}
        // ref={ref => {
        //   this.webview = ref;
        // }}
        // automaticallyAdjustContentInsets={false}
        // contentInset={{ top: 0, right: 0, bottom: 0, left: 0 }}
        source={{ html: chartHtmlStr }}
        // javaScriptEnabled={true}
        // domStorageEnabled={true}
        // mixedContentMode="always"
        // onMessage={this.onMessage}
      />
    );
  }
}
