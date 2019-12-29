import React, { PureComponent } from "react";
import { View, Text, Image, TouchableOpacity, StatusBar, ViewStyle, TextStyle, StatusBarStyle, LayoutChangeEvent } from "react-native";
import styles from "./styles";
import { TextButton, Button } from "./Button";
import navigationUtils from "utils/navigationUtils";
import LinearGradient from "react-native-linear-gradient";
import { observer } from "mobx-react";
import configStore from "stores/configStore";

export interface NavBarProps {
  showBorder?: boolean;
  color?: string;
  backgroundColor?: string;
  /** 底部渐变色s */
  linearGradientColors?: string[];
  style?: ViewStyle;
  barStyle?: StatusBarStyle;
  /** 左边内容 */
  renderLeft?: JSX.Element;
  leftStyle?: ViewStyle;
  renderCenter?: JSX.Element;
  centerStyle?: ViewStyle;
  renderRight?: JSX.Element | Array<JSX.Element>;
  rightStyle?: ViewStyle;
  title?: string;
  titleStyle?: ViewStyle;
  /** 是否显示返回按钮 */
  showPopBtn?: boolean;
  /** 返回按钮函数 */
  onPopBtnPress?: () => any;
}
interface State {
  /** 两边的按钮容器宽度 */
  aroundWidth: number;
}

@observer
export default class NavBar extends PureComponent<NavBarProps, State> {
  static TextButton = TextButton;
  static Button = Button;
  static defaultProps = {
    showBorder: false,
    style: {},
    color: "#000",
    backgroundColor: "#fff",
    linearGradientColors: [],
    barStyle: "dark-content",
    renderLeft: <View />,
    leftStyle: {},
    renderCenter: <View />,
    centerStyle: {},
    renderRight: <View />,
    rightStyle: {},
    title: "",
    titleStyle: {},
    showPopBtn: true,
    onPopBtnPress: () => {
      navigationUtils.goBack();
    }
  };
  state: State = {
    aroundWidth: 0
  };
  leftWidth = 0;
  rightWidth = 0;

  onLayout = (e: LayoutChangeEvent, type: "left" | "right") => {
    let width = e.nativeEvent.layout.width;
    if (type == "left") {
      this.leftWidth = width;
    } else if (type == "right") {
      this.rightWidth = width;
    }
    if (this.leftWidth && this.rightWidth) {
      let aroundWidth = this.leftWidth > this.rightWidth ? this.leftWidth : this.rightWidth;
      if (aroundWidth != this.state.aroundWidth) {
        this.setState({
          aroundWidth
        });
      }
    }
  };

  translateTextButton = (dom, color: string) => {
    if (React.isValidElement(dom)) {
      // console.log('typeof dom', dom.contructor, dom.type === TextButton);
      if (dom.type === TextButton) {
        // console.log('切换颜色', color, dom.props.textStyle);
        return React.cloneElement(dom, {
          textStyle: [{ color: color }, (dom.props as any).textStyle]
        } as any);
      }
    }
    return dom;
  };

  render() {
    let {
      showBorder,
      style,
      barStyle,
      renderLeft,
      leftStyle,
      renderCenter,
      centerStyle,
      renderRight,
      rightStyle,
      title,
      titleStyle,
      showPopBtn,
      onPopBtnPress,
      backgroundColor,
      color,
      linearGradientColors
    } = this.props;
    const { aroundWidth } = this.state;

    let leftDom;
    if (Array.isArray(renderLeft)) {
      leftDom = renderLeft.map((v, i) => {
        return this.translateTextButton(v, color);
      });
    } else {
      leftDom = this.translateTextButton(renderLeft, color);
    }

    let rightDom;
    if (Array.isArray(renderRight)) {
      rightDom = renderRight.map((v, i) => {
        return this.translateTextButton(v, color);
      });
    } else {
      rightDom = this.translateTextButton(renderRight, color);
    }

    return (
      <View
        style={[
          styles.container,
          { paddingTop: configStore.statusBarHeight, backgroundColor: backgroundColor },
          showBorder && styles.border,
          style
        ]}
      >
        <StatusBar barStyle={barStyle} translucent={true} backgroundColor="transparent" />
        {!!linearGradientColors.length && <LinearGradient colors={linearGradientColors} style={styles.linearGradient}></LinearGradient>}
        <View style={[styles.leftWrap, aroundWidth && { width: aroundWidth }, leftStyle]} onLayout={e => this.onLayout(e, "left")}>
          {showPopBtn && (
            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={onPopBtnPress}>
              <Image
                style={[{ tintColor: color, width: 15, height: 20 }]}
                source={require("./images/icon_arrow_left.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
          {leftDom}
        </View>
        <View style={[styles.centerWrap, centerStyle]}>
          {!!title && (
            <Text style={[styles.title, { color: color }, titleStyle]} numberOfLines={1}>
              {title}
            </Text>
          )}
          {renderCenter}
        </View>
        <View style={[styles.rightWrap, aroundWidth && { width: aroundWidth }, rightStyle]} onLayout={e => this.onLayout(e, "right")}>
          {rightDom}
        </View>
      </View>
    );
  }
}
