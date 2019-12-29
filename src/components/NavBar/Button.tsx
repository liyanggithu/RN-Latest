import React, { PureComponent } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ViewStyle, TextStyle } from "react-native";

interface ButtonProps {
  onPress: () => any;
  style: ViewStyle;
  children: JSX.Element;
}
export class Button extends PureComponent<ButtonProps> {
  static defaultProps = {
    onPress: () => {},
    style: {}
  };
  render() {
    const { onPress, children, style } = this.props;
    return (
      <TouchableOpacity style={[styles.container, style]} activeOpacity={0.8} onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
}

interface TextButtonProps extends ButtonProps {
  onPress: () => any;
  /** 外层样式 */
  style: ViewStyle;
  /** 文本样式 */
  textStyle: TextStyle | Array<TextStyle>;
  children: any;
}

export class TextButton extends PureComponent<TextButtonProps> {
  static defaultProps = {
    onPress: () => {},
    style: {},
    textStyle: {} // 可以是数组或者
  };
  render() {
    const { children, textStyle } = this.props;
    if (typeof children != "string") {
      console.warn("TextButton只能填充string");
      return null;
    }
    let textStyles = [];
    if (Array.isArray(textStyle)) {
      textStyles = textStyle;
    } else {
      textStyles.push(textStyle);
    }
    return (
      <Button {...(this.props as any)}>
        <Text style={[styles.text, ...textStyles]}>{children}</Text>
      </Button>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5
  },
  text: {
    fontSize: 16
  }
});
