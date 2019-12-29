declare var global: any;

import { StackProps } from "react-native-router-flux";

declare module "react-native-router-flux" {
  export interface StackProps extends React.Props<Stack> {
    transitionConfig: any;
  }
}
