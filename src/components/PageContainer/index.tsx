import React, { PureComponent } from "react";
import { View, ViewStyle } from "react-native";
import styles from "./styles";
import NavBar, { NavBarProps } from "components/NavBar";
import configStore from "stores/configStore";
import { NavigationEvents, withNavigation } from "react-navigation";
import { observer } from "mobx-react";

export interface PageContainerProps {
  navBarProps?: NavBarProps;
  isHiddenNavBar?: boolean;
  style?: ViewStyle;
  contentViewStyle?: ViewStyle;
  backgroundColor?: string;
  /** iphoneX底部占位颜色 */
  bottomBackgroundColor?: string;
  bottomStyle?: ViewStyle;
  onWillFocus?: () => any;
  onDidFocus?: () => any;
  onWillBlur?: () => any;
  onDidBlur?: () => any;
}
interface State {}

@observer
export default class PageContainer extends PureComponent<PageContainerProps, State> {
  static defaultProps = {
    navBarProps: {},
    isHiddenNavBar: false,
    style: {},
    contentViewStyle: {},
    backgroundColor: "#fff",
    bottomBackgroundColor: "",
    bottomStyle: {}
  };

  render() {
    const {
      isHiddenNavBar,
      navBarProps,
      style,
      contentViewStyle,
      backgroundColor,
      bottomBackgroundColor,
      children,
      bottomStyle,
      onWillFocus,
      onDidFocus,
      onWillBlur,
      onDidBlur
    } = this.props;
    const {
      screenInset: { bottom },
      isIPhoneX
    } = configStore;
    return (
      <View style={[styles.container, style, { backgroundColor }]}>
        {!isHiddenNavBar && <NavBar {...navBarProps} />}
        <View style={[styles.contentView, contentViewStyle]}>{children}</View>
        <View
          style={[{ height: configStore.screenInset.bottom, backgroundColor: bottomBackgroundColor || backgroundColor }, bottomStyle]}
        />
        <NavigationEvents onWillFocus={onWillFocus} onDidFocus={onDidFocus} onWillBlur={onWillBlur} onDidBlur={onDidBlur} />
      </View>
    );
  }
}
