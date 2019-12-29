// 自定义字体

import { cloneElement } from 'react';
import { Text, TextInput } from 'react-native';

Text.prototype.render = _.wrap(Text.prototype.render, function(func, ...args) {
  let originText = func.apply(this, args);
  return cloneElement(originText, {
    allowFontScaling: false,
    style: [
      {
        fontSize: 16,
        color: 'rgb(105,105,105)',
        backgroundColor: 'transparent',
      },
      originText.props.style,
    ],
  });
});
TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, {
  defaultProps: false,
});
Text.defaultProps = Object.assign({}, Text.defaultProps, {
  allowFontScaling: false,
});
