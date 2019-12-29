import React, { Component } from "react";

/**
 * @name 获取子节点ref实例
 * @description 用了高阶装饰器`withRouter` 或者`hot(module)`，就需要用这个了
 *
 * ```tsx
 * // 子组件
 * import withRef, { withRefProps } from "utils/withRef";
 * interface Props extends WithRefProps {}
 * @hot(module)
 * @withRouter
 * @withRef
 * export default class EditModal extends Component<Props, State> {}
 *
 * // 父组件
 * render(){
 *  <EditModal wrapRef={(ref: any) => (this.editModal = ref)}
 * }
 * ```
 */
export default function withRef<T extends any>(WrappedComponent: T): T {
  return class WithRef extends Component<any, any> {
    static displayName = `withRef(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    render() {
      const props = {
        ...this.props
      };
      props.ref = el => {
        this.props.wrapRef && this.props.wrapRef(el);
        this.props.ref && this.props.ref(el);
      };
      return <WrappedComponent {...props} />;
    }
  } as any;
}

export interface withRefProps {
  wrapRef?: (ref: any) => void;
}
