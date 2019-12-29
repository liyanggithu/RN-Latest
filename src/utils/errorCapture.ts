//

/**
 * promise错误处理
 *
 * **示例代码**
 *  ```typescript
 *  const [err, res] = await errorCaptured(asyncFunc)
 *  if (err) {
 *     //... 错误捕获
 *  }
 *  ```
 */
export default async function errorCapture<T>(asyncFunc: Promise<T>) {
  /** [error, resp] */
  let result: [any, T];
  try {
    const res = await asyncFunc;
    result = [null, res] as any;
  } catch (error) {
    result = [error, null] as any;
  }
  return result;
}
