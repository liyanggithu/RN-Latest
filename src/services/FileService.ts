/**
 * FileService
 */
import { interceptorAjax, ContentType } from "services/commonFn";

/** 上传文件 */
export async function uploadFile(params: { file: File; name?: string; businessType?: string }): Promise<{ url: string }> {
  return await interceptorAjax<any>("post", "/api/system/file/upload", params, { contentType: ContentType.formData });
}
