# scss 样式

> 使用前需要开启 `yarn start`， 如果已开启端口就开 `yarn sassToStyles`

## [scss 教程](https://github.com/kszitt/react-native-sass-to-stylesheet)

### px 适配，已设定为 750px 设计图宽度，代码里自动伸缩 1px

```scss
.box {
  width: 750px; // 这样等同 width:100%，但不建议用，请改成100%, 因为手机横屏后就不等同100%;
  width: 200; // 假如屏幕实际渲染宽度 400px; 就等于占了一半
}
```

### jsx 内和 scss 差异写法

```jsx
import styles from "./styles"
<View style={styles.parent}>
  <View style={styles.parent_child}><View>
<View>
```

```scss
.parent {
  .child {
  }
}
```

### import

- import 合并其他文件样式，不能引用其他变量

```scss
@import "../header.scss"; // 必须写后缀名
```

- import 变量

```scss
$size: 12px !global; // 别的页面也可以使用，尽量只在`src/styles/`里面定义
$color: red;
.header {
  font: $size/24px;
  .left {
    color: $color;
  }
}
```

### 媒体查询@media
```scss
@media only screen and (min-width: 500px) and (max-width: 1000px) {
  .main {
    width: 100%;
    height: 1000px;
  }
}
```