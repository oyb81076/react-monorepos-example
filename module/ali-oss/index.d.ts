declare class STS {
  constructor(props: { accessKeyId: string, accessKeySecret: string })
  /**
   * 
   * @param role 
   * @param policy @see https://www.alibabacloud.com/help/zh/doc-detail/31921.html?spm=a2c5t.11065259.1996646101.searchclickresult.57ad12b8QwHcDq
   * @param expireSeconds 
   * @param sessionName 
   */
  assumeRole(role: string, policy: {
    Statement: Array<{
      /**
       * like:
       *  [ "oss:GetObject",
       *  "oss:PutObject",
       *  "oss:DeleteObject",
       *  "oss:ListParts",
       *  "oss:AbortMultipartUpload",
       *  "oss:MultipartUpload",
       *  "oss:ListObjects" ]
       */
      Action: string[],
      Effect: "Allow",
      /**
       * acs:oss:*:*:<bucket>/<path>
       * like:
       *  ["acs:oss:*:*:app-base-oss/*", "acs:oss:*:*:app-base-oss"]
       */
      Resource: string[],
    }>
    Version: string
  }, expireSeconds: number, sessionName: string): Promise<{
    credentials: { AccessKeyId: string, AccessKeySecret: string, SecurityToken: string }
  }>
}
declare class OssClient {
  STS: STS
  constructor(opts: OssClient.OssClientOpts)
  head(id: string): Promise<{ meta: any, res: OssClient.OssRes, status: number }>
  get(id: string, buffer: NodeJS.WriteStream, options?: OssClient.GetOptions): Promise<{ content: Buffer, res: OssClient.OssRes }>
  get(id: string, filename: string, options?: OssClient.GetOptions): Promise<{ res: OssClient.OssRes }>
  getStream(id: string, options?: OssClient.GetStreamOpts): Promise<{ res: OssClient.OssRes, stream: NodeJS.ReadStream }>
  delete(id: string, options?: { timeout?: number }): Promise<{ res: OssClient.OssRes }>
  /**
   * Copy an object from sourceName to name.
   * @param id 
   * @param source source object name If sourceName start with /,
   * meaning it's a full name contains the bucket name.
   * e.g.: /otherbucket/logo.png meaning copy otherbucket logn.png object to
   */
  copy(id: string, source: string, opts?: OssClient.CopyOpts): Promise<OssClient.MetaResult>
  /**
   * Set an exists object meta.
   * @param name 
   * @param meta user meta, will send with x-oss-meta- prefix string e.g.: { uid: 123, pid: 110 } If meta: null, will clean up the exists meta
   * @param opts 
   */
  putMeta(name: string, meta: any, opts?: { timeout?: number }): Promise<OssClient.MetaResult>
  /**
   * Delete multi objects in one request.
   */
  deleteMulti(names: string[], opts?: { quiet?: boolean, timeout?: number }): Promise<{ deleted: string[], res: OssClient.OssRes }>
  signatureUrl(name: string, opts: {
    expires: number,
    method?: "GET" | "POST" | "PUT" | "DELETE",
    process?: string,
    response: {
      "content-type"?: string
      "content-disposition"?: string
      "cache-control"?: string
    }
  }): string
  multipartUpload(name: string, filename: string, opts?: {
    parallel?: number,
    partSize?: number,
    checkpoint?: any,
    progress?: (percentage: number, checkpoint: any, res: OssClient.OssRes) => void | Promise<void>
    meta?: any
    headers?: {
      "cache-control"?: string,
      "content-disposition"?: string,
      "content-encoding"?: string
      "expires"?: number
    }
  }): Promise<{
    res: OssClient.OssRes,
    bucket: string,
    name: string,
    etag: string,
    data: any
  }>
  abortMultipartUpload(name: string, uploadId: string, opts?: { timeout?: number }): Promise<void>
  cancel(): void
}
declare namespace OssClient {
  interface OssRes {
    status: number,
    statusCode: number,
    headers: { [key: string]: string }
    size: number,
    aborted: boolean,
    rt: number,
    keepAliveSocket: number,
    data: Buffer,
    requestUrls: [string],
    timing: null,
    remoteAddress: string,
    remotePort: number
  }
  interface OssError extends Error {
    status: number,
    code: string,
    requestId: string,
    host: string,
    params: {
      object: string,
      bucket: string,
      subres: any,
      timeout: any,
      ctx: any,
      successStatuses: number[]
    }
  }
  interface GetOptions {
    timeout?: number
    process?: string
    headers?: {
      //'Range' get specifying range bytes content, e.g.: Range: bytes=0-9
      "range"?: string
      // 'If-Modified-Since' object modified after this time will return 200 and object meta, otherwise return 304 not modified
      "if-modified-since"?: string
      // 'If-Unmodified-Since' object modified before this time will return 200 and object meta, otherwise throw PreconditionFailedError
      "if-unmodified-since"?: string
      //'if-match' object etag equal this will return 200 and object meta, otherwise throw PreconditionFailedError
      "if-match"?: string
      // 'if-none-match' object etag not equal this will return 200 and object meta, otherwise return 304 not modified
      'if-none-match'?: string
    }
  }
  interface GetStreamOpts {
    timeout?: number
    process?: string
    headers?: {
      "if-modified-since"?: string
      "if-unmodified-since"?: string
      "if-match"?: string
      'if-none-match'?: string
    }
  }
  interface CopyOpts {
    timeout?: number
    meta: any
    headers: {
      "if-modified-since"?: string
      "if-unmodified-since"?: string
      "if-match"?: string
      'if-none-match'?: string
    }
  }
  interface MetaResult {
    data: { lastModified: string, etag: string }
    res: OssRes
  }
  interface OssClientOpts {
    accessKeyId: string // access key you create on aliyun console website
    accessKeySecret: string // access secret you create
    stsToken?: string // used by temporary authorization, detail see
    bucket?: string // the default bucket you want to access If you don't have any bucket, please use putBucket() create one first.
    endpoint?: string // oss region domain.It takes priority over region.
    region?: string // the bucket data region location, please see Data Regions, default is oss - cn - hangzhou.
    internal?: boolean // access OSS with aliyun internal network or not, default is false.If your servers are running on aliyun too, you can set true to save lot of money.
    secure?: boolean // instruct OSS client to use HTTPS(secure: true) or HTTP(secure: false) protocol.
    timeout?: string | number // instance level timeout for all operations, default is 60s
  }
}
export = OssClient
