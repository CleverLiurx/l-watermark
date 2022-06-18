// 错误
export interface ErrorType {
  code: number
  message: string
  reason: string
}

// 给页面加水印
export namespace PageConfig {
  // 文字水印
  export interface Text {
    text: string // 水印文字
    containerEl: HTMLElement // 添加水印的目标元素
    color: string // 水印字体颜色rgba
    fontSize: number // 水印字体大小
    zIndex: string // 层级
    cSpace: number // 水印横向间距
    vSpace: number // 水印纵向间距
    angle: number // 水印旋转角度
    onchange?(mr: MutationRecord): void
    onerror?(err: ErrorType): void
    success?(): void
  }

  // 图片水印
  export interface Image {
    image: string // 水印图片
    containerEl: HTMLElement // 添加水印的目标元素
    zIndex: string // 层级
    cSpace: number // 水印横向间距
    vSpace: number // 水印纵向间距
    onchange?(mr: MutationRecord): void
    onerror?(err: ErrorType): void
    success?(): void
  }

  // 用户配置
  export interface User {
    text?: string
    image?: string
    containerEl?: HTMLElement
    color?: string
    fontSize?: number
    zIndex?: string
    cSpace?: number
    vSpace?: number
    angle?: number
    onchange?(mr: MutationRecord): void
    onerror?(err: ErrorType): void
    success?(): void
  }
}

// 给图片加水印
export namespace ImageConfig {
  // 文字水印
  export interface Text {
    target: HTMLImageElement // img标签
    text: string // 水印文字
    secret: boolean // 开启暗水印
    position: Position
    color: string // 水印字体颜色rgba
    fontSize: number // 水印字体大小
    cSpace: number // 水印横向间距
    vSpace: number // 水印纵向间距
    angle: number // 水印旋转角度
    success?(base64: string): void // 回调用
    onerror?(err: ErrorType): void
  }

  // 图片水印
  export interface Image {
    target: HTMLImageElement // img标签
    image: string // 水印图片url/base64
    imageWidth?: number
    imageHeight?: number
    secret: boolean // 开启暗水印
    position: Position
    cSpace: number // 水印横向间距
    vSpace: number // 水印纵向间距
    success?(base64: string): void // 回调用
    onerror?(err: ErrorType): void
  }

  // 用户配置
  export interface User {
    target: HTMLImageElement | string
    text?: string
    image?: string
    imageWidth?: number
    imageHeight?: number
    secret?: boolean
    position?: Position
    color?: string
    fontSize?: number
    cSpace?: number
    vSpace?: number
    angle?: number
    success?(base64: string): void
    onerror?(err: ErrorType): void
  }
}

type Position = 'repeat' | 'center' | 'bottomRight' | 'bottomLeft' | 'topLeft' | 'topRight'
