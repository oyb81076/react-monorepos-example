import { options } from '@module/etc/oss'
import { file_md5_base64 } from '@module/oss-util/md5'
import OssClient, { OssError } from "ali-oss"
export const client = new OssClient(options)
export const exists = (ossId: string): Promise<boolean> => {
  return client.head(ossId).then(() => true)
    .catch((e: OssError) => {
      if (e.status === 404) { return false }
      throw e
    })
}
/**
 * 判断文件尚未上传或者发生了改变
 * 判断文件改变的条件是 filesize 或者 md5发生了变化
 */
export const isNotExistsOrDiff = async (ossId: string, maxAge: number, filename: string, filesize: number): Promise<boolean> => {
  const res = await client.head(ossId).catch((e: OssError) => {
    if (e.status === 404) return false
    throw e
  })
  if (typeof res === "boolean") return true // not exists
  if (res.status < 200 || res.status >= 400) return true // not exists
  if (maxAge && !res.res.headers['cache-control']) return true // not exists
  if (filesize + "" !== res.res.headers["content-length"]) return true // 文件大小发生了改变
  const md5 = await file_md5_base64(filename)
  return md5 !== res.res.headers["content-md5"]
}
