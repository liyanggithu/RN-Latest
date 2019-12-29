/**
 * @format
 */

import { AppRegistry, YellowBox } from "react-native";
import App from "./src";
import { name as appName } from "./app.json";

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {}
  };
}
YellowBox.ignoreWarnings([
  "Warning: componentWill",
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader",
  "Method `jumpToIndex` is deprecated",
  "Remote debugger is in a background",
  "Use `shouldComponentUpdate`",
  "Could not find image file"
]);
// global.XMLHttpRequest = global.originalXMLHttpRequest
//   ? global.originalXMLHttpRequest
//   : global.XMLHttpRequest;
// global.FormData = global.originalFormData
//   ? global.originalFormData
//   : global.FormData;
// global.Blob = global.originalBlob ? global.originalBlob : global.Blob;
// global.FileReader = global.originalFileReader
//   ? global.originalFileReader
//   : global.FileReader;

AppRegistry.registerComponent(appName, () => App);
