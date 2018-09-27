type STSAction =
  "*"
  | "oss:Get*"
  | "oss:List*"
  | "oss:Put*"
  | "oss:GetObject"
  | "oss:PutObject"
  | "oss:DeleteObject"
  | "oss:ListParts"
  | "oss:AbortMultipartUpload"
  | "oss:MultipartUpload"
  | "oss:ListObjects"
declare class OSS {
  constructor(opts: OSS.ClientOpts)
  head(id: string): Promise<{ meta: any, res: OSS.Res, status: number }>
  get(id: string, buffer?: NodeJS.WriteStream, options?: OSS.GetOptions): Promise<{ content: Buffer, res: OSS.Res }>
  get(id: string, filename: string, options?: OSS.GetOptions): Promise<{ res: OSS.Res }>
  getStream(id: string, options?: OSS.GetStreamOpts): Promise<{ res: OSS.Res, stream: NodeJS.ReadStream }>
  delete(id: string, options?: { timeout?: number }): Promise<{ res: OSS.Res }>
  generateObjectUrl(name: string, baseUrl?: string): string
  /**
   * Copy an object from sourceName to name.
   * @param id 
   * @param source source object name If sourceName start with /,
   * meaning it's a full name contains the bucket name.
   * e.g.: /otherbucket/logo.png meaning copy otherbucket logn.png object to
   */
  copy(id: string, source: string, opts?: OSS.CopyOpts): Promise<OSS.MetaResult>
  /**
   * Set an exists object meta.
   * @param name 
   * @param meta user meta, will send with x-oss-meta- prefix string e.g.: { uid: 123, pid: 110 } If meta: null, will clean up the exists meta
   * @param opts 
   */
  putMeta(name: string, meta: any, opts?: { timeout?: number }): Promise<OSS.MetaResult>
  /**
   * Delete multi objects in one request.
   */
  deleteMulti(names: string[], opts?: { quiet?: boolean, timeout?: number }): Promise<{ deleted: string[], res: OSS.Res }>
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
    progress?: (percentage: number, checkpoint: any, res: OSS.Res) => void | Promise<void>
    meta?: any
    headers?: {
      "cache-control"?: string,
      "content-disposition"?: string,
      "content-encoding"?: string
      "expires"?: number
    }
  }): Promise<{
    res: OSS.Res,
    bucket: string,
    name: string,
    etag: string,
    data: any
  }>
  abortMultipartUpload(name: string, uploadId: string, opts?: { timeout?: number }): Promise<void>
  put(
    name: string,
    filename: string | Buffer | NodeJS.ReadableStream | File | Blob,
    opts?: {
      timeout?: string
      mine?: string
      meta?: any
      callback?: {
        url: string
        host?: string
        body: string
        contentType: string
        customValue: any
      }
      headers?: {
        "cache-control"?: string
        "content-disposition"?: string
        "content-encoding"?: string
        "expires"?: number
      }
    },
  ): Promise<{ name: string, data: any, res: OSS.Res }>
  cancel(): void
}
declare namespace OSS {
  class STS {
    public constructor(props: { accessKeyId: string, accessKeySecret: string })
    /**
     * 
     * @param arn acs:ram::<acc_id>:role/<role_name> 如 acs:ram::1231715407065582:role/consumer
     * @param policy
     *    @see https://www.alibabacloud.com/help/zh/doc-detail/31921.html?spm=a2c5t.11065259.1996646101.searchclickresult.57ad12b8QwHcDq
     *    @see https://help.aliyun.com/document_detail/28664.html?spm=a2c4g.11186623.6.571.2bfe7df6XLJp0M
     * @param expireSeconds 有效时间
     * @param sessionName session名称, 用于ram后台审计
     */
    assumeRole(
      arn: string,
      policy: {
        Statement: Array<{ Action: STSAction[] | STSAction } | { NotAction: STSAction[] | STSAction } & {
          Effect: "Allow" | "Deny",
          /**
           * acs:oss:<region>:<account-id>:<bucket>/<id>
           * like:
           *  ["acs:ecs:*:*:instance/inst-001", "acs:ecs:*:*:instance/inst-002", "acs:oss:*:*:mybucket", "acs:oss:*:*:mybucket/*"]
           */
          Resource: string[] | string,
          Condition?: {
            // 发送请求时的客户端 IP 地址
            IpAddress?: {
              "acs:SourceIp": string
            }
            OSS?: {
              "oss:Delimiter"?: string
              "oss:Prefix"?: string
            }
          }
        }>
        Version: string
      },
      expireSeconds?: number,
      sessionName?: string,
      options?: { timeout?: number, ctx?: any },
    ): Promise<{ credentials: { AccessKeyId: string, AccessKeySecret: string, SecurityToken: string } }>
  }
  interface Res {
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
    res: Res
  }
  interface ClientOpts {
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
export = OSS
