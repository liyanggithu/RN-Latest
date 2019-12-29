import React, { Component } from "react";
import { observer } from "mobx-react";
import { Text, ScrollView, Button, View, Dimensions, TouchableOpacity } from "react-native";
import styles from "./styles";
import PageContainer from "components/PageContainer";
import { NavigationScreenProp } from "react-navigation";
import { RNCamera } from "react-native-camera";

type State = {};
type Props = {
  navigation: NavigationScreenProp<any, {}>;
};
@observer
export default class MyCamera extends Component<Props, State> {
  readonly state: State = {};
  camera: RNCamera;
  constructor(props: Props) {
    super(props);
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  render() {
    return (
      <PageContainer navBarProps={{ title: "MyCamera" }}>
        <ScrollView contentContainerStyle={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: "Permission to use camera",
              message: "We need your permission to use your camera",
              buttonPositive: "Ok",
              buttonNegative: "Cancel"
            }}
            androidRecordAudioPermissionOptions={{
              title: "Permission to use audio recording",
              message: "We need your permission to use your audio",
              buttonPositive: "Ok",
              buttonNegative: "Cancel"
            }}
            onBarCodeRead={result => {
              console.log("onBarCodeRead", result);
            }}
          />
          <View style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </PageContainer>
    );
  }
}
