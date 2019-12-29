// 格式化 过滤

/** 转换为标准tree格式，{id,name,children}->{label,value,children} */
export function transTreeAttrs(list: any[], options = { value: "id", label: "name", children: "children" }, level: number = 0) {
  type Tree = {
    [key: string]: any;
    key: string;
    label: string;
    value: string;
    level: number;
    children?: Tree[];
  };
  const tree: Tree[] = [];
  list.forEach((v: any) => {
    const obj: any = {};
    obj.label = v[options.label];
    obj.title = v[options.label];
    obj.value = v[options.value];
    obj.key = v[options.value];
    obj.level = level; // 第几层子节点
    if (v[options.children] && v[options.children].length) {
      obj.children = transTreeAttrs(v[options.children], options, level + 1);
    }
    tree.push(obj);
  });
  return tree;
}
