import React, { Component } from "react";
import { Dimensions, ActivityIndicator, View, Platform, Image } from "react-native";
import PageContainer from "components/PageContainer";
import { NavigationScreenProp } from "react-navigation";
import ImageViewer from "react-native-image-zoom-viewer";
import navigationUtils from "utils/navigationUtils";
import CameraRoll from "@react-native-community/cameraroll";
import RNFetchBlob from "rn-fetch-blob";
import { Toast } from "@ant-design/react-native";
const screenHeight = Dimensions.get("window").height;

type State = {};
type Props = {
  navigation: NavigationScreenProp<
    any,
    {
      images: (string | number)[];
      index: number;
    }
  >;
};
/** @name 图片预览页 */
export default class PreviewImage extends Component<Props, State> {
  index = 0;
   savePhoto=async() =>{
    try {
      const urls = this.props.navigation.getParam("images", []);
      let url = urls[this.index];
      if (typeof url === "number") {
        Toast.fail("保存失败:只支持网络图片保存");
        return;
      }
      console.log("url",url)
      let localUrl: any;
      const res = await RNFetchBlob.config({
        fileCache: true,
        session: "temDownloadImg",
        appendExt: "png"
      }).fetch("GET", url, {});
      console.log("The file saved to ", res.path());
      localUrl = Platform.OS === "android" ? "file://" + res.path() : "" + res.path();
      console.log("localUrl", localUrl);
      const result = await CameraRoll.saveToCameraRoll(localUrl, "photo");
      console.log(result);
      Toast.success("保存成功");
    } catch (error) {
      console.log(error);
      Toast.fail("保存失败");
    }
  }

  componentDidMount() {
    this.index = this.props.navigation.getParam("index", 0);
  }

  render() {
    const images = this.props.navigation.getParam("images", []).map(v => {
      if (typeof v === "string") {
        return {
          url: v
        };
      } else {
        return {
          url: "",
          props: {
            source: v
          }
        };
      }
    });
    const index = this.props.navigation.getParam("index", 0);
    return (
      <PageContainer navBarProps={{ title: "图片" }}>
        <ImageViewer
          imageUrls={images} // 照片路径
          enableImageZoom={true} // 是否开启手势缩放
          saveToLocalByLongPress={true} //是否开启长按保存
          index={index} // 初始显示第几张
          // failImageSource={} // 加载失败图片
          loadingRender={() => {
            return (
              <View style={{ marginTop: screenHeight / 2 - 20 }}>
                <ActivityIndicator animating={true} size={"large"} />
              </View>
            );
          }}
          enableSwipeDown={false}
          menuContext={{ saveToLocal: "保存图片", cancel: "取消" }}
          onChange={index => {
            this.index = index;
          }} // 图片切换时触发
          onClick={() => {
            // 图片单击事件
            navigationUtils.goBack();
          }}
          onSave={this.savePhoto}
        />
      </PageContainer>
    );
  }
}
