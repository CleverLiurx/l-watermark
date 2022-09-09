type Position = 'repeat' | 'center' | 'bottomRight' | 'bottomLeft' | 'topLeft' | 'topRight'

export interface UserWaterMarkConfig {
  target: HTMLElement | HTMLImageElement | undefined
  text?: string
  image?: string
  imageWidth?: number | string
  imageHeight?: number | string
  color?: string
  fontSize?: string | number
  zIndex?: string | number
  cSpace?: string | number
  vSpace?: string | number
  angle?: string | number
  secret?: boolean
  position?: Position
  onchange?(mr?: MutationRecord): void
  onerror?(err: string): void
  success?(base64?: string): void
}
export interface WaterMarkConfig {
  target: HTMLElement | HTMLImageElement
  text: string
  image: string
  imageWidth?: number
  imageHeight?: number
  color: string
  fontSize: number
  zIndex: string
  cSpace: number
  vSpace: number
  angle: number
  secret: boolean
  position: Position
  onchange(mr?: MutationRecord): void
  onerror(err: string): void
  success(base64?: string): void
}

// 页面水印配置
export namespace PageConfig {
  export interface System {
    target: HTMLElement // 添加水印的目标元素
    text: string // 水印文字
    image: string // 水印图片
    imageWidth?: number // 水印图片的宽度
    imageHeight?: number // 水印图片的高度
    color: string // 水印字体颜色rgba
    fontSize: number // 水印字体大小
    zIndex: string // 层级
    cSpace: number // 水印横向间距
    vSpace: number // 水印纵向间距
    angle: number // 水印旋转角度
    onchange?(mr: MutationRecord): void // 水印被改变时候的回调
    onerror?(err: string): void // 添加水印发生错误的回调
    success?(): void // 添加水印成功的回调
  }

  // 用户配置
  export interface User {
    target?: HTMLElement
    text?: string
    image?: string
    imageWidth?: number | string
    imageHeight?: number | string
    color?: string
    fontSize?: string | number
    zIndex?: string | number
    cSpace?: string | number
    vSpace?: string | number
    angle?: string | number
    onchange?(mr: MutationRecord): void
    onerror?(err: string): void
    success?(): void
  }
}

// 图片水印配置
export namespace ImageConfig {
  export interface System {
    target: HTMLImageElement // img标签
    text: string // 水印文字
    image: string // 水印图片 url/base64
    imageWidth?: number // 水印图片的宽度
    imageHeight?: number // 水印图片的高度
    secret: boolean // 开启暗水印
    position: Position // 水印位置
    color: string // 水印字体颜色rgba
    fontSize: number // 水印字体大小
    cSpace: number // 水印横向间距
    vSpace: number // 水印纵向间距
    angle: number // 水印旋转角度
    success?(base64: string): void // 添加成功回调
    onerror?(err: string): void // 发生错误回调
  }

  // 用户配置
  export interface User {
    target: HTMLImageElement | string
    text?: string
    image?: string
    imageWidth?: number | string
    imageHeight?: number | string
    secret?: boolean
    position?: Position
    color?: string
    fontSize?: number | string
    cSpace?: number | string
    vSpace?: number | string
    angle?: number | string
    success?(base64: string): void
    onerror?(err: string): void
  }
}
