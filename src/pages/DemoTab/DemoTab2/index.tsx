import React, { Component } from "react";
import { observer } from "mobx-react";
import { Text, ScrollView, Button, Image, View, Dimensions } from "react-native";
import styles from "./styles";
import PageContainer from "components/PageContainer";
import { NavigationScreenProp } from "react-navigation";
import BottomTab from "../components/BottomTab";
import RNFetchBlob from "rn-fetch-blob";
import LinearGradient from "react-native-linear-gradient";
import DeviceInfo from "react-native-device-info";
import navigationUtils from "utils/navigationUtils";
import ScanCameraModal from "components/ScanCameraModal";
import { Modal } from "@ant-design/react-native";
import ImagePicker, { Image as PickerImage } from "react-native-image-crop-picker";
import MapWebview from "components/MapWebview";
import NavBar from "components/NavBar";
import AutoHeightImage from "react-native-auto-height-image";

type Props = {
  navigation: NavigationScreenProp<any, {}>;
};
type State = {
  num: number;
  pic: string;
};
@observer
export default class DemoTab2 extends Component<Props, State> {
  readonly state: State = {
    num: 0,
    pic: ""
  };
  scanCameraModal: ScanCameraModal;
  constructor(props: Props) {
    super(props);
  }

  rnblob = async () => {
    const dirs = RNFetchBlob.fs.dirs;
    console.log(dirs.DocumentDir);
    const files = await RNFetchBlob.fs.ls(dirs.DocumentDir);
    console.log("files", files);
  };

  device = () => {
    let brand = DeviceInfo.getBrand();
    console.log(brand);
  };

  openScanCameraModal = () => {
    this.scanCameraModal.open();
  };

  handleScanSuccess = (barCode: string) => {
    console.log("扫码成功", barCode);
    this.scanCameraModal.close();
  };

  render() {
    return (
      <PageContainer
        navBarProps={{
          title: "DemoTab2-渐变底色",
          barStyle: "light-content",
          color: "blue",
          linearGradientColors: ["#4c669f", "#3b5998", "#192f6a"],
          showPopBtn: false,
          renderRight: (
            <NavBar.Button>
              <Image style={{ width: 20, height: 20 }} source={require("./assets/dog.jpg")} resizeMode="contain" />
            </NavBar.Button>
          ),
          renderLeft: <NavBar.TextButton onPress={() => navigationUtils.goBack()}>返回</NavBar.TextButton>
        }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text>{this.state.num}</Text>

          <Button onPress={() => this.setState({ num: this.state.num + 1 })} title={"+1"}></Button>

          <Button onPress={this.rnblob} title="rnblob"></Button>

          <Button onPress={this.device} title="DeviceInfo"></Button>

          <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]}>
            <Text style={styles.buttonText}>渐变色</Text>
          </LinearGradient>

          <Button onPress={() => navigationUtils.push("Camera")} title="相机拍照"></Button>

          <Button onPress={this.openScanCameraModal} title="扫码"></Button>

          <ScanCameraModal ref={ref => (this.scanCameraModal = ref)} fnScanSuccess={this.handleScanSuccess} />

          <Button
            onPress={() =>
              Modal.operation([
                { text: "标为未读", onPress: () => console.log("标为未读被点击了") },
                { text: "置顶聊天", onPress: () => console.log("置顶聊天被点击了") }
              ])
            }
            title="ant modal"
          ></Button>

          <Button
            onPress={() =>
              ImagePicker.openPicker({
                width: 400,
                height: 400,
                cropping: true,
                compressImageQuality: 0.8
              }).then((image: PickerImage) => {
                console.log(image);
                this.setState({ pic: image.path });
              })
            }
            title="选择裁剪图片"
          ></Button>
          {!!this.state.pic && <Image source={{ uri: this.state.pic }} style={{ width: 100, height: 100 }} />}

          <Button
            onPress={() =>
              navigationUtils.push("PreviewImage", {
                images: [require("./assets/dog.jpg"), "https://img0.pclady.com.cn/pclady/pet/choice/dog/1701/1_2.jpg"]
              })
            }
            title="多图预览"
          ></Button>

          <Text>地图</Text>
          <MapWebview />

          <Text>自适应高度图片</Text>
          <AutoHeightImage width={100} source={{ uri: "http://placehold.it/350x150" }} />
        </ScrollView>
        <BottomTab routeName="DemoTab2" />
      </PageContainer>
    );
  }
}
